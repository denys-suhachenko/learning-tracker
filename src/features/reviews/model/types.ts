export type Grade = 'again' | 'hard' | 'good' | 'easy';

export type CardStatus = 'new' | 'learning' | 'review' | 'mastered';

export type ReviewCardType = 'basic' | 'cloze' | 'image_occlusion' | 'qa';

export type ReviewCardDifficulty = 'easy' | 'medium' | 'hard';

export type WeekActivityDay = {
  date: string;
  is_active: boolean;
  is_future: boolean;
};

export type Card = {
  id: string;
  deckId: string;
  metadata?: string;
  question: {
    title: string;
    description?: string;
  };
  answer: {
    title: string;
    description?: string;
  };
  hint?: string;
  schedule: CardSchedule;
};

export type CardSchedule = {
  intervalMinutes: number;
  repetitions: number;
  easeFactor: number;
  dueAt?: string;
  dueDate: string;
  lastReviewedAt?: string;
  lapses: number;
};

export type Review = {
  id: string;
  cardId: string;
  grade: Grade;
  reviewedAt: string;
};

export type ReviewCardApi = {
  id: string;

  deck_id: string;
  deck_name: string;

  topic_id: string;
  topic_name: string;

  card_type: ReviewCardType;

  question: string;
  question_description: string;

  answer: string;
  answer_description: string;

  hint: string;

  difficulty: ReviewCardDifficulty;

  status: CardStatus;
  is_due: boolean;

  interval_minutes: number;
  repetitions: number;
  ease_factor: number;
  lapses: number;

  due_at: string | null;

  created_at: string;
  updated_at: string;
};

export type ReviewTopic = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type ReviewDeck = {
  id: string;
  topic_id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type ReviewSummary = {
  due_now: number;
  due_today: number;
  reviewed_today: number;
  new_cards: number;
  learning: number;
  mastered_cards: number;
  current_streak: number;
  week_activity: WeekActivityDay[];
};

export type CreateReviewCardRequest = {
  deck_id: string;
  card_type: 'basic';

  question: string;
  question_description?: string;

  answer: string;
  answer_description?: string;

  hint: string;

  difficulty: 'easy' | 'medium' | 'hard';
  review_next_session: boolean;
};
