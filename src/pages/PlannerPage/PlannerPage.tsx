import PlannerBoard from '@/features/planner/ui/PlannerBoard';
import { PageHeader } from '@/shared/ui';
import { Container } from '@/shared/layout';
import { Button } from '@/shared/ui/button';

const PlannerPage = () => {
  return (
    <>
      <PageHeader>
        <div className="flex items-center justify-between">
          <div className="text-2xl leading-9 font-semibold">Planner</div>
          <Button size="lg">Add topic</Button>
        </div>
      </PageHeader>

      <Container>
        <PlannerBoard />
      </Container>
    </>
  );
};

export default PlannerPage;
