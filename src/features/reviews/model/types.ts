export type Grade = 'again' | 'hard' | 'good' | 'easy';

export type CardStatus = 'new' | 'learning' | 'review' | 'mastered';

export type Card = {
  id: string;
  deckId: string;
  question: string;
  answer: string;
  hint?: string;
  schedule: CardSchedule;
};

export type CardSchedule = {
  intervalMinutes: number;
  repetitions: number;
  easeFactor: number;
  dueDate: string;
  lapses: number;
};

export type Review = {
  id: string;
  cardId: string;
  grade: Grade;
  reviewedAt: string;
};
