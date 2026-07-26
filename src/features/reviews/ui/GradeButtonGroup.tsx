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
  },
  hard: {
    label: 'Hard',
    icon: ZapIcon,
  },
  good: {
    label: 'Good',
    icon: SmileIcon,
  },
  easy: {
    label: 'Easy',
    icon: ThumbsUpIcon,
  },
} satisfies Record<
  Grade,
  {
    label: string;
    icon: LucideIcon;
  }
>;

const GradeButtonGroup = ({ className, onGrade }: GradeButtonGroupProps) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-center gap-x-6">
        {GRADES.map((grade) => {
          const { label, icon: Icon } = GRADES_UI[grade];

          return (
            <Button
              key={grade}
              size="lg"
              variant="outline"
              data-icon="inline-start"
              onClick={() => onGrade(grade)}
            >
              <Icon className="size-4" /> {label}
            </Button>
          );
        })}
      </div>

      {/* TODO: add shortcuts handler */}
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
