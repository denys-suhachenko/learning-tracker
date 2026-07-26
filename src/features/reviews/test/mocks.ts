import type { Card } from '../model/types';

export const CARDS: Card[] = [
  {
    id: 'card-1',
    deckId: 'deck-1',
    question: 'First card Q',
    answer: 'First card A',
    schedule: {
      intervalMinutes: 0,
      repetitions: 0,
      easeFactor: 2.5,
      dueDate: '2026-07-26T00:00:00.000Z',
      lapses: 0,
    },
  },
  {
    id: 'card-2',
    deckId: 'deck-1',
    question: 'Second card Q',
    answer: 'Second card A',
    schedule: {
      intervalMinutes: 0,
      repetitions: 0,
      easeFactor: 2.5,
      dueDate: '2026-07-26T00:00:00.000Z',
      lapses: 0,
    },
  },
];
