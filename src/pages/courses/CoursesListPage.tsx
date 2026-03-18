import CoursesTable from '@/features/courses/ui/CoursesTable/CoursesTable';
import { Button, Container, PageHeader } from '@/shared/ui';

const CoursesListPage = () => {
  return (
    <>
      <PageHeader>
        <div className="flex items-center justify-between">
          <div className="text-2xl leading-9 font-semibold">Courses</div>
          <Button size="large">Create course</Button>
        </div>
      </PageHeader>

      <Container>
        <CoursesTable />
      </Container>
    </>
  );
};

export default CoursesListPage;
