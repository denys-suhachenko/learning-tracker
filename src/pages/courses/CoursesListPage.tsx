import { useNavigate } from 'react-router';

import CoursesTable from '@/features/courses/ui/CoursesTable/CoursesTable';
import { Button, Card, Container, PageHeader, Progress } from '@/shared/ui';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';

const CoursesListPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader>
        <div className="flex items-center justify-between">
          <div className="text-2xl leading-9 font-semibold">Courses</div>
          <Button
            size="large"
            onClick={() =>
              navigate('/courses/create', {
                replace: true,
              })
            }
          >
            Create course
          </Button>
        </div>
      </PageHeader>

      <Container>
        <CoursesTable />
      </Container>
    </>
  );
};

export default CoursesListPage;
