import type { Card } from '../model/types';

export const CARDS: Card[] = [
  {
    id: 'card-1',
    deckId: 'deck-1',
    metadata: 'last seen 4 days ago',
    question: {
      title: 'Which artery supplies the medial surface of the frontal lobe?',
    },
    answer: {
      title: 'The anterior cerebral artery (ACA)',
      description:
        'Runs in the interhemispheric fissure over the corpus callosum. Occlusion spares the face and arm but weakens the contralateral leg — the classic ACA stroke pattern.',
    },
    schedule: {
      intervalMinutes: 0,
      repetitions: 0,
      easeFactor: 2.5,
      dueAt: '2026-07-26T00:00:00.000Z',
      lastReviewedAt: '2026-07-26T00:00:00.000Z',
      lapses: 0,
    },
  },
  {
    id: 'card-2',
    deckId: 'deck-1',
    metadata: 'last seen 4 days ago',
    question: {
      title:
        'What is the worst-case time complexity of quicksort, and when does it occur?',
    },
    answer: {
      title: 'O(n²) — when every pivot is the smallest or largest element',
      description:
        'Randomised or median-of-three pivots make the worst case vanishingly unlikely; expected cost stays O(n log n).',
    },
    schedule: {
      intervalMinutes: 0,
      repetitions: 0,
      easeFactor: 2.5,
      dueAt: '2026-07-26T00:00:00.000Z',
      lastReviewedAt: '2026-07-26T00:00:00.000Z',
      lapses: 0,
    },
  },
];
