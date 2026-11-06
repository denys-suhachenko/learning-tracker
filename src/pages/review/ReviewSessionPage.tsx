import { useMemo } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '@/shared/ui/button';
import { PageHeader } from '@/shared/ui/PageHeader';
import { Container } from '@/shared/ui/Container';

import ReviewSession from '@/features/reviews/ui/ReviewSession/ReviewSession';
import type {
  Card,
  Grade,
  ReviewCardApi,
} from '@/features/reviews/model/types';
import {
  useGetDueReviewCardsQuery,
  useReviewCardMutation,
} from '@/features/reviews/api/api';

const mapApiCardToCard = (card: ReviewCardApi): Card => ({
  id: card.id,
  deckId: card.deck_id,

  question: {
    title: card.question,
    description: card.question_description,
  },

  answer: {
    title: card.answer,
    description: card.answer_description,
  },

  hint: card.hint,

  schedule: {
    intervalMinutes: card.interval_minutes,
    repetitions: card.repetitions,
    easeFactor: card.ease_factor,
    lapses: card.lapses,

    dueAt: card.due_at ?? undefined,
  },
});

const ReviewSessionPage = () => {
  const navigate = useNavigate();

  const {
    data: dueCards = [],
    isFetching,
    isSuccess,
  } = useGetDueReviewCardsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [reviewCard] = useReviewCardMutation();

  const sessionCards = useMemo(
    () => (isSuccess && !isFetching ? dueCards.map(mapApiCardToCard) : null),
    [dueCards, isSuccess, isFetching],
  );

  const handleGrade = async (cardId: string, grade: Grade) => {
    await reviewCard({
      cardId,
      grade,
    }).unwrap();
  };

  if (sessionCards === null) {
    return <Container>Loading review session...</Container>;
  }

  if (sessionCards.length === 0) {
    return (
      <Container>
        <PageHeader
          title="Review Session"
          description="There are no cards due right now."
          className="mb-8"
          actions={
            <Button onClick={() => navigate('/review')}>Back to reviews</Button>
          }
        />
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader
        title="Review Session"
        description="Review cards that are due now."
        className="mb-8"
        actions={
          <Button onClick={() => navigate('/review')}>End session</Button>
        }
      />

      <ReviewSession
        key={sessionCards.map((card) => card.id).join('-')}
        initialCards={sessionCards}
        onGrade={handleGrade}
        onComplete={() => navigate('/review')}
      />
    </Container>
  );
};

export default ReviewSessionPage;
