import { describe, expect, it } from 'vitest';

import { CardSchedule } from '../model/types';

import { GRADES, previewIntervals, scheduleCard } from './scheduler';

const NOW = '2026-07-24T00:00:00.000Z';

const at = (iso: string = NOW) => new Date(iso);

const makeSchedule = (options: Partial<CardSchedule> = {}): CardSchedule => ({
  intervalMinutes: 0,
  repetitions: 0,
  easeFactor: 2.5,
  dueDate: '2026-07-24T00:00:00.000Z',
  lapses: 0,
  ...options,
});

describe('scheduleCard', () => {
  it('schedules a new card 10 minutes ahead when graded good', () => {
    const card = makeSchedule();

    const result = scheduleCard(card, 'good', at());

    expect(result.intervalMinutes).toBe(10);
    expect(result.dueDate).toBe('2026-07-24T00:10:00.000Z');
    expect(result.repetitions).toBe(1);
  });

  it('resets a reviewing card back to learning when graded again', () => {
    const card = makeSchedule({
      intervalMinutes: 8640,
      repetitions: 3,
    });

    const result = scheduleCard(card, 'again', at());

    expect(result.intervalMinutes).toBe(10);
    expect(result.repetitions).toBe(0);
    expect(result.lapses).toBe(1);
    expect(result.easeFactor).toBeCloseTo(2.3);
    expect(result.dueDate).toBe('2026-07-24T00:10:00.000Z');
  });

  it.each(['again', 'hard'] as const)(
    'never lets easeFactor drop below 1.3 when graded %s',
    (grade) => {
      let card = makeSchedule({
        intervalMinutes: 8640,
        repetitions: 5,
        easeFactor: 1.4,
      });

      for (let i = 0; i < 5; i++) {
        card = scheduleCard(card, grade, at());
      }

      expect(card.easeFactor).toBe(1.3);
    },
  );

  it('never lets interval increase more than 1 year', () => {
    const card = makeSchedule({
      intervalMinutes: 400_000,
      repetitions: 5,
      easeFactor: 2.5,
    });

    const res = scheduleCard(card, 'easy', at());

    expect(res.intervalMinutes).toBe(525_600);
    expect(res.repetitions).toBe(6);
  });

  it('schedules the first review one day ahead', () => {
    const card = makeSchedule({
      repetitions: 1,
    });

    const res = scheduleCard(card, 'good', at());

    expect(res.intervalMinutes).toBe(1440);
    expect(res.repetitions).toBe(2);
  });

  it('schedules the second review six days ahead', () => {
    const card = makeSchedule({
      repetitions: 2,
    });

    const res = scheduleCard(card, 'good', at());

    expect(res.intervalMinutes).toBe(8640);
    expect(res.repetitions).toBe(3);
  });

  it('schedules the third review 15 days ahead', () => {
    const card = makeSchedule({
      repetitions: 3,
      intervalMinutes: 8640,
    });

    const res = scheduleCard(card, 'good', at());

    expect(res.intervalMinutes).toBe(21600);
    expect(res.repetitions).toBe(4);
  });

  it('decreases interval and ease factor when graded hard', () => {
    const card = makeSchedule({
      repetitions: 3,
      intervalMinutes: 8640,
      easeFactor: 2.5,
    });

    const res = scheduleCard(card, 'hard', at());

    expect(res.intervalMinutes).toBe(10_368);
    expect(res.easeFactor).toBeCloseTo(2.35);
    expect(res.repetitions).toBe(4);
  });

  it('increases interval and ease factor when graded easy', () => {
    const card = makeSchedule({
      repetitions: 3,
      intervalMinutes: 8640,
      easeFactor: 2.5,
    });

    const res = scheduleCard(card, 'easy', at());

    expect(res.intervalMinutes).toBe(28_080);
    expect(res.easeFactor).toBeCloseTo(2.65);
    expect(res.repetitions).toBe(4);
  });

  it('preview matches what scheduleCard actually does', () => {
    const card = makeSchedule({
      repetitions: 3,
      intervalMinutes: 8640,
    });

    const preview = previewIntervals(card, at());

    GRADES.forEach((grade) => {
      expect(preview[grade]).toBe(
        scheduleCard(card, grade, at()).intervalMinutes,
      );
    });
  });

  it('preview matches for schedules graded again and good', () => {
    const card = makeSchedule({
      repetitions: 0,
      intervalMinutes: 8640,
    });

    const preview = previewIntervals(card, at());

    GRADES.forEach((grade) => {
      expect(preview[grade]).toBe(10);
    });
  });
});
