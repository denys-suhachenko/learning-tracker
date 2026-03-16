import CoursesTable from '@/features/courses/ui/CoursesTable/CoursesTable';
import { Button, Container, Header } from '@/shared/ui';

const CoursesListPage = () => {
  return (
    <>
      <Header>
        <div className="flex items-center justify-between">
          <div className="text-2xl leading-9 font-semibold">Courses</div>
          <Button size="large">Create course</Button>
        </div>
      </Header>

      <Container>
        <CoursesTable />
      </Container>
    </>
  );
};

export default CoursesListPage;
