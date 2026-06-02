import PlannerBoard from '@/features/planner/ui/PlannerBoard';
import { PageHeader } from '@/shared/ui';
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/button';

const PlannerPage = () => {
  return (
    <Container>
      <PageHeader
        title="Planner"
        actions={<Button size="lg">Add topic</Button>}
        className="mb-8"
      />

      <PlannerBoard />
    </Container>
  );
};

export default PlannerPage;
