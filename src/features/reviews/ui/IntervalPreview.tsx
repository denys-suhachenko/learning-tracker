import { useTranslation } from 'react-i18next';

import { formatInterval, GRADES, previewIntervals } from '../lib/scheduler';
import type { CardSchedule, Grade } from '../model/types';

type IntervalPreviewProps = {
  schedule: CardSchedule;
  now?: Date;
};

const GRADE_COLORS: Record<Grade, string> = {
  again: 'text-red-600',
  hard: 'text-orange-600',
  good: 'text-green-600',
  easy: 'text-blue-600',
};

const IntervalPreview = ({
  schedule,
  now = new Date(),
}: IntervalPreviewProps) => {
  const { t } = useTranslation('reviews', {
    keyPrefix: 'grades',
  });

  const intervals = previewIntervals(schedule, now);

  return (
    <div className="flex items-center justify-center gap-6">
      {GRADES.map((grade) => (
        <div key={grade} className="font-medium">
          <span className={GRADE_COLORS[grade]}>{t(grade)}:</span>{' '}
          {formatInterval(intervals[grade])}
        </div>
      ))}
    </div>
  );
};

export default IntervalPreview;
