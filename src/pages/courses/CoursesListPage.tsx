import CoursesTable from '@/features/courses/ui/CoursesTable';
import { Button } from '@/shared/ui';

const CoursesListPage = () => {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div className="text-2xl leading-9 font-semibold">Courses</div>
        <Button size="large">Create course</Button>
      </div>

      <CoursesTable />
    </>
  );
};

export default CoursesListPage;
