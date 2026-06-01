import { useNavigate } from 'react-router';

import CoursesTable from '@/features/courses/ui/CoursesTable/CoursesTable';
import { PageHeader } from '@/shared/ui';
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/button';

const CoursesListPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title="Courses"
        description="Manage your courses, track progress, and continue learning."
        actions={
          <Button
            onClick={() =>
              navigate('/courses/create', {
                replace: true,
              })
            }
          >
            Create course
          </Button>
        }
      />

      <Container>
        <CoursesTable />
      </Container>
    </>
  );
};

export default CoursesListPage;
