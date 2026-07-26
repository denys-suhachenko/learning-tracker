import { useState } from 'react';

import type { Card, Grade } from '../../model/types';
import { CARDS } from '../../test/mocks';

import SessionProgress from '../SessionProgress';
import ReviewStep from '../ReviewStep/ReviewStep';

type ReviewSessionProps = {
  cards: Card[];
};

const ReviewSession = ({ cards = CARDS }: ReviewSessionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const card = cards[currentIndex];

  const onGrade = (grade: Grade) => {
    // TODO: call scheduleCard and persist
    // TODO: end session after last card graded

    setIsRevealed(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-8 overflow-hidden rounded-md bg-white p-6 shadow-sm">
      <SessionProgress completed={currentIndex} total={cards.length} />

      <ReviewStep
        key={card.id}
        card={card}
        isRevealed={isRevealed}
        onReveal={() => setIsRevealed(true)}
        onGrade={onGrade}
      />
    </div>
  );
};

export default ReviewSession;
