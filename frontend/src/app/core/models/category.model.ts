import type { Topic } from './topic.model';

export interface Category {
  id: string;
  levelId: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  topics: Topic[];
}
