export type CompletionStatus = 'not-started' | 'in-progress' | 'completed';

export interface LessonProgress {
  lessonId: string;
  status: CompletionStatus;
  score?: number;          // 0–100
  completedAt?: string;    // ISO date string
  attempts: number;
}

export interface TopicProgress {
  topicId: string;
  status: CompletionStatus;
  lessonsCompleted: number;
  totalLessons: number;
  lastAccessedAt?: string;
}

export interface CategoryProgress {
  categoryId: string;
  topicsCompleted: number;
  totalTopics: number;
}

export interface LevelProgress {
  levelId: string;
  categoriesCompleted: number;
  totalCategories: number;
  topicsCompleted: number;
  totalTopics: number;
  lessonsCompleted: number;
  totalLessons: number;
  percentComplete: number;
}

export interface UserProgress {
  userId: string;
  lastAccessedAt: string;
  currentLessonId?: string;
  currentTopicId?: string;
  currentLevelId?: string;
  lessons: Record<string, LessonProgress>;   // keyed by lessonId
  topics: Record<string, TopicProgress>;     // keyed by topicId
  totalXp: number;
  streakDays: number;
  lastStreakDate?: string;
}
