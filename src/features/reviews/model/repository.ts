import type { CardSchedule, Grade, Review } from './types';

const STORAGE_KEY = 'reviewCardsStorage';

export type ReviewRepository = {
  saveReview: (cardId: string, grade: Grade, reviewedAt: Date) => Promise<void>;
  saveSchedule: (cardId: string, schedule: CardSchedule) => Promise<void>;
  loadSchedules: () => Promise<void>;
};

const readReviews = (): Review[] => {
  try {
    const reviews = localStorage.getItem(STORAGE_KEY) || '[]';
    const parsed = JSON.parse(reviews);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const createLocalStorageRepository = (): ReviewRepository => {
  const saveReview = async (cardId: string, grade: Grade, reviewedAt: Date) => {
    try {
      const reviews = readReviews();
      const res: Review[] = [
        ...reviews,
        {
          id: crypto.randomUUID(),
          cardId,
          grade,
          reviewedAt: reviewedAt.toISOString(),
        },
      ];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(res));
    } catch (error) {
      console.error('Review storage error: ', error);
    }
  };

  return { saveReview };
};
