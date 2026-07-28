import { EyeIcon, MoveDownIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import type { Card, Grade } from '../../model/types';

import ReviewCard from '../ReviewCard/ReviewCard';
import IntervalPreview from '../IntervalPreview';
import GradeButtonGroup from '../GradeButtonGroup';

export type ReviewStepProps = {
  card: Card;
  isRevealed: boolean;
  onReveal: () => void;
  onGrade: (grade: Grade) => void;
};

const ReviewStep = ({
  card,
  isRevealed,
  onReveal,
  onGrade,
}: ReviewStepProps) => {
  return (
    <>
      <ReviewCard side="front">
        <div className="flex min-h-50 items-center justify-center text-center text-2xl font-medium">
          {card.question}
        </div>
      </ReviewCard>

      {!isRevealed && (
        <div className="text-center">
          <Button role="button" size="lg" onClick={onReveal}>
            <EyeIcon /> Show answer
          </Button>
        </div>
      )}

      {isRevealed && (
        <div>
          <MoveDownIcon className="mx-auto my-6 text-gray-400" />

          <ReviewCard side="back">
            <div className="flex min-h-50 items-center justify-center text-center text-2xl font-medium">
              {card.answer}
            </div>

            <div className="mt-4">
              <IntervalPreview schedule={card.schedule} />
            </div>
          </ReviewCard>

          <GradeButtonGroup className="mt-8" onGrade={onGrade} />
        </div>
      )}
    </>
  );
};

export default ReviewStep;
