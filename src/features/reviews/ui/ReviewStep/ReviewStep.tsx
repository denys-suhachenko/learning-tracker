import { useEffect } from 'react';
import { EyeIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import type { Card, Grade } from '../../model/types';

import ReviewCard from '../ReviewCard/ReviewCard';
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
  useEffect(() => {
    const handleSpace = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        onReveal();
      }
    };

    window.addEventListener('keydown', handleSpace);

    return () => window.removeEventListener('keydown', handleSpace);
  }, []);

  return (
    <div className="overflow-hidden rounded-md border shadow-xs">
      <ReviewCard
        side="front"
        metadata={card.metadata}
        className="min-h-60 bg-white"
      >
        <div className="max-w-2/3">
          <div className="mb-4 text-3xl font-semibold">
            {card.question.title}
          </div>

          {card.question.description && (
            <div className="text-xl font-medium text-gray-500">
              {card.question.description}
            </div>
          )}
        </div>
      </ReviewCard>

      {isRevealed ? (
        <div>
          <ReviewCard side="back" className="min-h-50 border-t bg-gray-50">
            <div className="max-w-2/3">
              <div className="text-2xl font-semibold">{card.answer.title}</div>

              {card.answer.description && (
                <div className="mt-6 text-gray-500">
                  {card.answer.description}
                </div>
              )}
            </div>
          </ReviewCard>

          <div className="border-t bg-white px-8 py-4">
            <GradeButtonGroup onGrade={onGrade} />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-x-4 border-t bg-white px-8 py-4 text-center">
          <Button role="button" size="lg" onClick={onReveal}>
            <EyeIcon /> Show answer
          </Button>
          <span className="text-sm text-gray-600">or press Space</span>
        </div>
      )}
    </div>
  );
};

export default ReviewStep;
