import { useNavigate } from 'react-router';

import { Button } from '@/shared/ui/button';
import { PageHeader } from '@/shared/ui/PageHeader';
import { Container } from '@/shared/ui/Container';

import ReviewSession from '@/features/reviews/ui/ReviewSession';

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

      <ReviewSession />
    </Container>
  );
};

export default ReviewSessionPage;
