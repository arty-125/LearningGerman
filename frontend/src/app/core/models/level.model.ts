export type LevelCode = 'A1' | 'A2' | 'B1' | 'B2';

export interface Level {
  id: string;
  code: LevelCode;
  title: string;
  description: string;
  color: string;
  lightColor: string;
  order: number;
  categories: Category[];
}

// Circular reference resolved via forward declaration in category.model
import type { Category } from './category.model';
