import PlannerBoard from '@/features/planner/ui/PlannerBoard';
import { PageHeader, Container, Button } from '@/shared/ui';

const PlannerPage = () => {
  return (
    <>
      <PageHeader>
        <div className="flex items-center justify-between">
          <div className="text-2xl leading-9 font-semibold">Planner</div>
          <Button size="large">Add topic</Button>
        </div>
      </PageHeader>

      <Container>
        <PlannerBoard />
      </Container>
    </>
  );
};

export default PlannerPage;
