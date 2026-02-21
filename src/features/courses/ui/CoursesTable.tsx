import { useMemo } from 'react';

import { Table } from '@/shared/ui';

import { getColumns } from './columns';
import { coursesList } from '../api/mock';

const CoursesTable = () => {
  const columns = useMemo(() => getColumns(), []);

  return (
    <div>
      <Table columns={columns} rows={coursesList} />
    </div>
  );
};

export default CoursesTable;
