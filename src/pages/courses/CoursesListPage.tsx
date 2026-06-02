import { Link } from 'react-router';

import CoursesTable from '@/features/courses/ui/CoursesTable/CoursesTable';
import { PageHeader } from '@/shared/ui';
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/button';

const CoursesListPage = () => {
  return (
    <Container>
      <PageHeader
        title="Courses"
        description="Manage your courses, track progress, and continue learning."
        className="mb-8"
        actions={
          <Button asChild>
            <Link to="create">Create course</Link>
          </Button>
        }
      />

      <CoursesTable />
    </Container>
  );
};

export default CoursesListPage;
