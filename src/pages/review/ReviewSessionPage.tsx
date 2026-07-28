import { useNavigate } from 'react-router';

import { Button } from '@/shared/ui/button';
import { PageHeader } from '@/shared/ui/PageHeader';
import { Container } from '@/shared/ui/Container';

import ReviewSession from '@/features/reviews/ui/ReviewSession/ReviewSession';
import { CARDS } from '@/features/reviews/test/mocks';
import { createLocalStorageRepository } from '@/features/reviews/model/repository';

const reviewRepository = createLocalStorageRepository();

const ReviewSessionPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <PageHeader
        title="Review Session"
        description="Deck: Cell Biology Basics and Topic: Biology"
        className="mb-8"
        actions={
          <Button onClick={() => navigate('/review')}>End session</Button>
        }
      />

      <ReviewSession initialCards={CARDS} repository={reviewRepository} />
    </Container>
  );
};

export default ReviewSessionPage;
