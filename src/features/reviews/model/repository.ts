import type { CardSchedule, Grade, Review } from './types';

const REVIEWS_KEY = 'reviewCardsStorage';
const SCHEDULES_KEY = 'reviewSchedulesStorage';

export type ReviewRepository = {
  saveReview: (cardId: string, grade: Grade, reviewedAt: Date) => Promise<void>;
  saveSchedule: (cardId: string, schedule: CardSchedule) => Promise<void>;
  loadSchedules: () => Promise<Record<string, CardSchedule>>;
};

const readReviews = (): Review[] => {
  try {
    const reviews = localStorage.getItem(REVIEWS_KEY) || '[]';
    const parsed = JSON.parse(reviews);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const readSchedules = (): Record<string, CardSchedule> => {
  try {
    const parsed = JSON.parse(localStorage.getItem(SCHEDULES_KEY) || '{}');
    const isPlainObject =
      parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed);
    return isPlainObject ? parsed : {};
  } catch {
    return {};
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

      localStorage.setItem(REVIEWS_KEY, JSON.stringify(res));
    } catch (error) {
      console.error('Review storage error: ', error);
    }
  };

  const saveSchedule = async (cardId: string, schedule: CardSchedule) => {
    try {
      const next: Record<string, CardSchedule> = {
        ...readSchedules(),
        [cardId]: schedule,
      };
      localStorage.setItem(SCHEDULES_KEY, JSON.stringify(next));
    } catch (error) {
      console.error('Failed to save schedule:', error);
    }
  };

  const loadSchedules = async () => readSchedules();

  return { saveReview, saveSchedule, loadSchedules };
};
