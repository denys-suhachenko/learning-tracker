import { Table } from '@/shared/ui';

import type { Review } from '../../model/types';
import { getColumns } from './columns';

const ReviewsListTable = () => {
  const data: Review[] = [
    {
      id: '1',
      title: 'Define pensive transport.',
      deck: 'Cell Biology Basics',
      status: 'Due Today',
      due_date: 'Today',
    },
  ];

  return <Table columns={getColumns()} rows={data} />;
};

export default ReviewsListTable;
