import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';
import type { Curriculum, Level, Category, Topic, Lesson } from '../models';

@Injectable({ providedIn: 'root' })
export class CurriculumService {
  private readonly http = inject(HttpClient);

  // Load curriculum JSON from the public folder once on startup.
  private readonly curriculum = toSignal(
    this.http.get<Curriculum>('/data/curriculum.json').pipe(
      catchError(() => {
        console.error('Failed to load curriculum.json');
        return of<Curriculum>({ version: '1.0', levels: [] });
      })
    ),
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

  // ─── Statistics helpers ──────────────────────────────────────────────

  getTotalTopicsForLevel(levelId: string): number {
    const level = this.getLevelById(levelId);
    if (!level) return 0;
    return level.categories.reduce((sum, c) => sum + c.topics.length, 0);
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
