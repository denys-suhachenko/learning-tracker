import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

import CoursesTable from '@/features/courses/ui/CoursesTable/CoursesTable';
import { PageHeader } from '@/shared/ui';
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/button';

const CoursesListPage = () => {
  const { t } = useTranslation('courses', { keyPrefix: 'list' });

  return (
    <Container>
      <PageHeader
        title={t('title')}
        description={t('description')}
        className="mb-8"
        actions={
          <Button asChild>
            <Link to="create">{t('actions.createCourse')}</Link>
          </Button>
        }
      />

      <CoursesTable />
    </Container>
  );
};

export default CoursesListPage;
