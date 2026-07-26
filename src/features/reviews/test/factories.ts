import type { Card, CardSchedule } from '../model/types';

export const NOW = '2026-07-24T00:00:00.000Z';

export const at = (iso: string = NOW) => new Date(iso);

export const makeSchedule = (
  options: Partial<CardSchedule> = {},
): CardSchedule => ({
  intervalMinutes: 0,
  repetitions: 0,
  easeFactor: 2.5,
  dueDate: '2026-07-24T00:00:00.000Z',
  lapses: 0,
  ...options,
});

export const makeCard = (options: Partial<Card> = {}): Card => ({
  id: '6a6542cf',
  deckId: '19c8',
  question: 'What is ATP?',
  answer: 'Energy currency of the cell',
  hint: 'Think about energy',
  schedule: makeSchedule(),
  ...options,
});
