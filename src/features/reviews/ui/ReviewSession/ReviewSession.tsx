import { useState } from 'react';

import type { Card, Grade } from '../../model/types';
import type { ReviewRepository } from '../../model/repository';

import SessionProgress from '../SessionProgress';
import ReviewStep from '../ReviewStep/ReviewStep';
import { scheduleCard } from '../../lib/scheduler';

type ReviewSessionProps = {
  initialCards: Card[];
  repository: ReviewRepository;
};

const ReviewSession = ({ initialCards, repository }: ReviewSessionProps) => {
  const [cards, setCards] = useState(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const card = cards[currentIndex];

  const onGrade = (grade: Grade) => {
    const now = new Date();

    setCards((prev) =>
      prev.map((c) =>
        card.id === c.id
          ? {
              ...c,
              schedule: scheduleCard(card.schedule, grade, now),
            }
          : c,
      ),
    );

    repository.saveReview(card.id, grade, now);

    setIsRevealed(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // TODO: end session after last card graded
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
