import { Injectable, inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';
import type { Curriculum, Level, Category, Topic, Lesson } from '../models';

interface CurriculumIndex {
  version: string;
  levelFiles: string[];
}

@Injectable({ providedIn: 'root' })
export class CurriculumService {
  private readonly http = inject(HttpClient);

  private loadCurriculum() {
    return this.http.get<CurriculumIndex>('/data/curriculum/index.json').pipe(
      switchMap((index) => {
        if (!index.levelFiles || index.levelFiles.length === 0) {
          return of<Curriculum>({ version: index.version ?? '1.0', levels: [] });
        }

        const requests = index.levelFiles.map((file) =>
          this.http.get<Level>(`/data/curriculum/${file}`)
        );

        return forkJoin(requests).pipe(
          map((levels) => ({
            version: index.version ?? '1.0',
            levels,
          }))
        );
      }),
      catchError(() => {
        console.error('Failed to load split curriculum data.');
        return of<Curriculum>({ version: '1.0', levels: [] });
      })
    );
  }

  // Load curriculum JSON from the public folder once on startup.
  private readonly curriculum = toSignal(
    this.loadCurriculum(),
    { initialValue: null }
  );

  readonly isLoaded = computed(() => this.curriculum() !== null);

  readonly levels = computed(() => this.curriculum()?.levels ?? []);

  // ─── Lookup helpers ──────────────────────────────────────────────────

  getLevelById(levelId: string): Level | undefined {
    return this.levels().find((l) => l.id === levelId);
  }

  getCategoryById(levelId: string, categoryId: string): Category | undefined {
    return this.getLevelById(levelId)?.categories.find(
      (c) => c.id === categoryId
    );
  }

  getTopicById(
    levelId: string,
    categoryId: string,
    topicId: string
  ): Topic | undefined {
    return this.getCategoryById(levelId, categoryId)?.topics.find(
      (t) => t.id === topicId
    );
  }

  getLessonById(lessonId: string): Lesson | undefined {
    for (const level of this.levels()) {
      for (const category of level.categories) {
        for (const topic of category.topics) {
          const lesson = topic.lessons.find((l) => l.id === lessonId);
          if (lesson) return lesson;
        }
      }
    }
    return undefined;
  }

  getTopicsForCategory(levelId: string, categoryId: string): Topic[] {
    return this.getCategoryById(levelId, categoryId)?.topics ?? [];
  }

  topicHasContent(topic: Topic): boolean {
    return topic.lessons.length > 0;
  }

  categoryHasContent(category: Category): boolean {
    return category.topics.some((t) => this.topicHasContent(t));
  }

  getTopicsWithContent(levelId: string, categoryId: string): Topic[] {
    return this.getTopicsForCategory(levelId, categoryId).filter((t) =>
      this.topicHasContent(t)
    );
  }

  getCategoriesWithContent(levelId: string): Category[] {
    return (this.getLevelById(levelId)?.categories ?? []).filter((c) =>
      this.categoryHasContent(c)
    );
  }

  // ─── Statistics helpers ──────────────────────────────────────────────

  getTotalTopicsForLevel(levelId: string): number {
    return this.getCategoriesWithContent(levelId).reduce(
      (sum, c) => sum + c.topics.filter((t) => this.topicHasContent(t)).length,
      0
    );
  }

  getTotalLessonsForLevel(levelId: string): number {
    const level = this.getLevelById(levelId);
    if (!level) return 0;
    return level.categories.reduce(
      (sum, c) =>
        sum + c.topics.reduce((ts, t) => ts + t.lessons.length, 0),
      0
    );
  }
}
