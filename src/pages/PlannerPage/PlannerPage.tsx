import PlannerBoard from '@/features/planner/ui/PlannerBoard';
import { PageHeader } from '@/shared/ui';
import { Container } from '@/shared/layout';
import { Button } from '@/shared/ui/button';

const PlannerPage = () => {
  return (
    <>
      <PageHeader
        title="Planner"
        actions={<Button size="lg">Add topic</Button>}
      />

      <Container>
        <PlannerBoard />
      </Container>
    </>
  );
};

export default PlannerPage;
