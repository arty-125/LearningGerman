export type ExerciseType =
  | 'multiple-choice'
  | 'fill-in-blank'
  | 'translation'
  | 'word-order'
  | 'matching'
  | 'true-false';

export interface ExerciseOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface Exercise {
  id: string;
  lessonId: string;
  type: ExerciseType;
  question: string;
  instruction: string;
  options?: ExerciseOption[];    // for multiple-choice, true-false, matching
  correctAnswer?: string;        // for fill-in-blank, translation, word-order
  blanks?: string[];             // for fill-in-blank
  hint?: string;
  explanation: string;           // shown after answering
  order: number;
}
