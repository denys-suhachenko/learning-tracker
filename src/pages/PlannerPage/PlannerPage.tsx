import PlannerBoard from '@/features/planner/ui/PlannerBoard';
import { Header, Container } from '@/shared/ui';

const PlannerPage = () => {
  return (
    <>
      <Header>
        <div className="flex items-center justify-between">
          <div className="text-2xl leading-9 font-semibold">Planner</div>
        </div>
      </Header>

      <Container>
        <PlannerBoard />
      </Container>
    </>
  );
};

export default PlannerPage;
