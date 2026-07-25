import type { CardSchedule, Grade } from '../model/types';

const EASE_DELTA: Record<Grade, number> = {
  again: -0.2,
  hard: -0.15,
  good: 0,
  easy: 0.15,
};

export const GRADES: Grade[] = ['again', 'hard', 'good', 'easy'];

const FIRST_REVIEW_MINUTES = 1440; //  1 day
const SECOND_REVIEW_MINUTES = 8640; // 6 days
const MAX_INTERVAL_MINUTES = 365 * 24 * 60; // 1 year

function getIntervalFactor(interval: number, easeFactor: number, grade: Grade) {
  if (grade === 'hard') {
    return interval * 1.2; // hard multiplier = 1.2
  }

  if (grade === 'easy') {
    return interval * easeFactor * 1.3; // easy bonus = 1.3
  }

  return interval * easeFactor;
}

function nextEaseFactor(current: number, grade: Grade) {
  return Math.max(1.3, current + EASE_DELTA[grade]);
}

function nextInterval(
  repetitions: number, // schedule repetition before increment
  intervalMinutes: number,
  easeFactor: number,
  grade: Grade,
) {
  if (repetitions > 2) {
    const interval = Math.round(
      getIntervalFactor(intervalMinutes, easeFactor, grade),
    );
    return Math.min(MAX_INTERVAL_MINUTES, interval);
  } else if (repetitions > 1) {
    return SECOND_REVIEW_MINUTES;
  } else {
    return FIRST_REVIEW_MINUTES;
  }
}

export function scheduleCard(
  schedule: CardSchedule,
  grade: Grade,
  now: Date,
): CardSchedule {
  let next: CardSchedule = {
    ...schedule,
  };

  if (grade === 'again') {
    next = {
      ...next,
      intervalMinutes: 10,
      repetitions: 0,
      lapses: next.lapses + 1,
      easeFactor: nextEaseFactor(next.easeFactor, grade),
    };
  } else if (schedule.repetitions === 0) {
    next = {
      ...next,
      intervalMinutes: 10,
      repetitions: 1,
    };
  } else if (schedule.repetitions > 0) {
    next = {
      ...next,
      intervalMinutes: nextInterval(
        next.repetitions,
        next.intervalMinutes,
        next.easeFactor,
        grade,
      ),
      easeFactor: nextEaseFactor(next.easeFactor, grade),
      repetitions: next.repetitions + 1,
    };
  }

  return {
    ...next,
    dueDate: new Date(
      now.getTime() + next.intervalMinutes * 60_000,
    ).toISOString(),
  };
}

export function sessionProgress(completed: number, total: number) {
  return Math.floor((completed / total) * 100);
}

export function previewIntervals(
  schedule: CardSchedule,
  now: Date,
): Record<Grade, number> {
  return Object.fromEntries(
    GRADES.map((grade) => [
      grade,
      scheduleCard(schedule, grade, now).intervalMinutes,
    ]),
  ) as Record<Grade, number>;
}
