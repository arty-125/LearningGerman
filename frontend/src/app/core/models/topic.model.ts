import type { Lesson } from './lesson.model';

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export interface Topic {
  id: string;
  categoryId: string;
  levelId: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  order: number;
  tags: string[];
  prerequisites: string[]; // topic IDs
  lessons: Lesson[];
}
