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
        className="bg-card min-h-60"
      >
        <div className="max-w-2/3">
          <div className="mb-4 text-3xl font-semibold">
            {card.question.title}
          </div>

          {card.question.description && (
            <div className="text-muted-foreground text-xl font-medium">
              {card.question.description}
            </div>
          )}
        </div>
      </ReviewCard>

      {isRevealed ? (
        <div>
          <ReviewCard side="back" className="bg-card min-h-50 border-t">
            <div className="max-w-2/3">
              <div className="text-2xl font-semibold">{card.answer.title}</div>

              {card.answer.description && (
                <div className="text-muted-foreground mt-6">
                  {card.answer.description}
                </div>
              )}
            </div>
          </ReviewCard>

          <div className="bg-card border-t px-8 py-4">
            <GradeButtonGroup onGrade={onGrade} />
          </div>
        </div>
      ) : (
        <div className="bg-card flex items-center justify-center gap-x-4 border-t px-8 py-4 text-center">
          <Button role="button" size="lg" onClick={onReveal}>
            <EyeIcon /> Show answer
          </Button>
          <span className="text-muted-foreground text-sm">or press Space</span>
        </div>
      )}
    </div>
  );
};

export default ReviewStep;
