import { useEffect } from 'react';
import {
  RefreshCcwIcon,
  SmileIcon,
  ThumbsUpIcon,
  ZapIcon,
  type LucideIcon,
} from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Kbd, KbdGroup } from '@/shared/ui/kbd';

import type { Grade } from '../model/types';
import { GRADES } from '../lib/scheduler';

type GradeButtonGroupProps = {
  className?: string;
  onGrade: (grade: Grade) => void;
};

const GRADES_UI = {
  again: {
    label: 'Again',
    icon: RefreshCcwIcon,
    color: 'text-red-600 dark:text-red-400',
    interval: '< 1 min',
  },
  hard: {
    label: 'Hard',
    icon: ZapIcon,
    color: 'text-orange-600 dark:text-orange-400',
    interval: '8 min',
  },
  good: {
    label: 'Good',
    icon: SmileIcon,
    color: 'text-green-600 dark:text-green-400',
    interval: '4 days',
  },
  easy: {
    label: 'Easy',
    icon: ThumbsUpIcon,
    color: 'text-blue-600 dark:text-blue-400',
    interval: '9 days',
  },
} satisfies Record<
  Grade,
  {
    label: string;
    icon: LucideIcon;
    color: string;
    interval: string;
  }
>;

const GradeButtonGroup = ({ className, onGrade }: GradeButtonGroupProps) => {
  useEffect(() => {
    const handleGrade = (event: KeyboardEvent) => {
      switch (event.key) {
        case '1':
          onGrade('again');
          break;
        case '2':
          onGrade('hard');
          break;
        case '3':
          onGrade('good');
          break;
        case '4':
          onGrade('easy');
          break;
      }
    };

    window.addEventListener('keydown', handleGrade);

    return () => window.removeEventListener('keydown', handleGrade);
  });

  return (
    <div className={className}>
      <div className="flex items-center justify-center gap-x-6">
        {GRADES.map((grade) => {
          const { label, color, interval, icon: Icon } = GRADES_UI[grade];

          return (
            <Button
              key={grade}
              size="lg"
              variant="outline"
              className={color}
              data-icon="inline-start"
              onClick={() => onGrade(grade)}
            >
              <Icon className="size-4" /> {label} ({interval})
            </Button>
          );
        })}
      </div>

      <div className="text-muted-foreground mt-6 text-center text-sm font-medium">
        Shortcuts:{' '}
        <KbdGroup className="gap-x-2">
          <Kbd className="p-3 text-sm">1 - Again</Kbd>
          <Kbd className="p-3 text-sm">2 - Hard</Kbd>
          <Kbd className="p-3 text-sm">3 - Good</Kbd>
          <Kbd className="p-3 text-sm">4 - Easy</Kbd>
        </KbdGroup>
      </div>
    </div>
  );
};

export default GradeButtonGroup;
