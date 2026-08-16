import { useState } from 'react';
import { SquareCheckBigIcon } from 'lucide-react';

import type { Card, Grade } from '../../model/types';
import SessionProgress from '../SessionProgress';
import ReviewStep from '../ReviewStep/ReviewStep';
import { Button } from '@/shared/ui/button';

type ReviewSessionProps = {
  initialCards: Card[];
  onGrade: (cardId: string, grade: Grade) => Promise<void>;
  onComplete: () => void;
};

const ReviewSession = ({
  initialCards,
  onGrade,
  onComplete,
}: ReviewSessionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finished, setFinished] = useState(false);

  const card = initialCards[currentIndex];

  const handleGrade = async (grade: Grade) => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onGrade(card.id, grade);

      setIsRevealed(false);

      if (currentIndex < initialCards.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setFinished(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (finished) {
    return (
      <div className="flex flex-col items-center overflow-hidden rounded-md border bg-white p-8 shadow-xs">
        <h3 className="text-2xl font-semibold">Review is finished for today</h3>
        <p className="mt-4 text-lg font-medium text-gray-500">
          Come back tomorrow and these names will start to feel like your own.
        </p>
        <SquareCheckBigIcon className="mt-6 size-14 text-green-600" />

        <Button className="mt-8" onClick={onComplete}>
          Back to reviews
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 rounded-md border bg-white p-6 shadow-xs">
        <SessionProgress completed={currentIndex} total={initialCards.length} />
      </div>

      <ReviewStep
        key={card.id}
        card={card}
        isRevealed={isRevealed}
        onReveal={() => setIsRevealed(true)}
        onGrade={handleGrade}
      />
    </>
  );
};

export default ReviewSession;
