import type { Exercise } from './exercise.model';

export type LessonSectionType = 'explanation' | 'example' | 'tip' | 'warning' | 'table' | 'list';

export interface LessonSection {
  type: LessonSectionType;
  title?: string;
  content: string;
  items?: string[];    // for 'list' type
  rows?: string[][];  // for 'table' type
  headers?: string[]; // for 'table' type
}

export interface Lesson {
  id: string;
  topicId: string;
  categoryId: string;
  levelId: string;
  title: string;
  shortDescription: string;
  order: number;
  estimatedMinutes: number;
  sections: LessonSection[];
  exercises: Exercise[];
  vocabulary?: VocabularyItem[];
}

export interface VocabularyItem {
  german: string;
  english: string;
  article?: string;   // der/die/das
  plural?: string;
  example?: string;
}
