import { Injectable, signal, computed, effect } from '@angular/core';
import type {
  UserProgress,
  LessonProgress,
  TopicProgress,
  CompletionStatus,
} from '../models';

const STORAGE_KEY = 'lg_progress';
const GUEST_USER_ID = 'guest';

function createDefaultProgress(): UserProgress {
  return {
    userId: GUEST_USER_ID,
    lastAccessedAt: new Date().toISOString(),
    lessons: {},
    topics: {},
    totalXp: 0,
    streakDays: 0,
  };
}

@Injectable({ providedIn: 'root' })
export class ProgressService {
  // Hydrate from localStorage on startup.
  private readonly _progress = signal<UserProgress>(this.load());

  readonly progress = this._progress.asReadonly();

  readonly totalXp = computed(() => this._progress().totalXp);
  readonly streakDays = computed(() => this._progress().streakDays);
  readonly currentLevelId = computed(() => this._progress().currentLevelId);
  readonly currentTopicId = computed(() => this._progress().currentTopicId);

  constructor() {
    // Persist to localStorage whenever state changes.
    effect(() => {
      const p = this._progress();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
      } catch {
        // Storage might be full or unavailable; silently ignore.
      }
    });
  }

  // ─── Lesson progress ─────────────────────────────────────────────────

  getLessonStatus(lessonId: string): CompletionStatus {
    return this._progress().lessons[lessonId]?.status ?? 'not-started';
  }

  markLessonComplete(lessonId: string, score = 100): void {
    this._progress.update((p) => ({
      ...p,
      lastAccessedAt: new Date().toISOString(),
      currentLessonId: lessonId,
      totalXp: p.totalXp + this.calculateXp(score),
      lessons: {
        ...p.lessons,
        [lessonId]: {
          lessonId,
          status: 'completed',
          score,
          completedAt: new Date().toISOString(),
          attempts: (p.lessons[lessonId]?.attempts ?? 0) + 1,
        } satisfies LessonProgress,
      },
    }));
  }

  markLessonInProgress(lessonId: string): void {
    const current = this._progress().lessons[lessonId];
    if (current?.status === 'completed') return; // don't downgrade

    this._progress.update((p) => ({
      ...p,
      lastAccessedAt: new Date().toISOString(),
      currentLessonId: lessonId,
      lessons: {
        ...p.lessons,
        [lessonId]: {
          lessonId,
          status: 'in-progress',
          attempts: current?.attempts ?? 0,
        } satisfies LessonProgress,
      },
    }));
  }

  // ─── Topic progress ──────────────────────────────────────────────────

  getTopicStatus(topicId: string): CompletionStatus {
    return this._progress().topics[topicId]?.status ?? 'not-started';
  }

  updateTopicProgress(
    topicId: string,
    lessonsCompleted: number,
    totalLessons: number
  ): void {
    const status: CompletionStatus =
      lessonsCompleted === 0
        ? 'not-started'
        : lessonsCompleted >= totalLessons
          ? 'completed'
          : 'in-progress';

    this._progress.update((p) => ({
      ...p,
      currentTopicId: topicId,
      topics: {
        ...p.topics,
        [topicId]: {
          topicId,
          status,
          lessonsCompleted,
          totalLessons,
          lastAccessedAt: new Date().toISOString(),
        } satisfies TopicProgress,
      },
    }));
  }

  // ─── Level stats ─────────────────────────────────────────────────────

  getCompletedLessonCountForLevel(levelId: string, lessonIds: string[]): number {
    const lessons = this._progress().lessons;
    return lessonIds.filter((id) => lessons[id]?.status === 'completed').length;
  }

  // ─── Navigation context ──────────────────────────────────────────────

  setCurrentLevel(levelId: string): void {
    this._progress.update((p) => ({
      ...p,
      currentLevelId: levelId,
      lastAccessedAt: new Date().toISOString(),
    }));
  }

  // ─── Reset ───────────────────────────────────────────────────────────

  resetAllProgress(): void {
    this._progress.set(createDefaultProgress());
  }

  // ─── Private ─────────────────────────────────────────────────────────

  private load(): UserProgress {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw) as UserProgress;
      }
    } catch {
      // Corrupted data; start fresh.
    }
    return createDefaultProgress();
  }

  private calculateXp(score: number): number {
    if (score >= 90) return 30;
    if (score >= 70) return 20;
    if (score >= 50) return 10;
    return 5;
  }
}
