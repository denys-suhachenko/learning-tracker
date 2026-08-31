import { FlameIcon, ThumbsUpIcon, CheckIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

import type { WeekActivityDay } from '../model/types';

type StudyStreakCardProps = {
  currentStreak: number;
  weekActivity: WeekActivityDay[];
};

const WEEK_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const StudyStreakCard = ({
  currentStreak,
  weekActivity,
}: StudyStreakCardProps) => {
  return (
    <div className="bg-card overflow-hidden rounded-md px-6 py-4 shadow-sm">
      <h3 className="mb-4 text-lg font-medium">Study Streak</h3>

      <div className="mb-6 flex items-center gap-x-2">
        <FlameIcon className="size-8 text-orange-500" />
        <span className="text-lg font-semibold">
          {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
        </span>
      </div>

      <div className="mb-4 flex items-center gap-x-2">
        <span className="font-medium">Keep it up!</span>
        <ThumbsUpIcon className="size-5" />
      </div>

      <div className="flex justify-between">
        {weekActivity.map((day, index) => (
          <div key={day.date} className="flex flex-col items-center gap-2">
            <span className="text-xs">{WEEK_LABELS[index]}</span>

            <div
              className={cn(
                'flex size-6 items-center justify-center rounded-full',
                day.is_active &&
                  'bg-green-300 dark:bg-green-500 dark:text-gray-900',
                !day.is_active &&
                  !day.is_future &&
                  'bg-gray-300 dark:bg-gray-600',
                day.is_future && 'bg-gray-200 dark:bg-gray-700',
              )}
            >
              {day.is_active && <CheckIcon className="size-4" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyStreakCard;
