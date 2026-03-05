import PlannerBoard from '@/features/planner/ui/PlannerBoard';

const PlannerPage = () => {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div className="text-2xl leading-9 font-semibold">Planner</div>
      </div>

      <PlannerBoard />
    </>
  );
};

export default PlannerPage;
