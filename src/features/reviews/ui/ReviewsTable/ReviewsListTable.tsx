import { Table } from '@/shared/ui';

import type { ReviewCardApi } from '../../model/types';

import { getColumns } from './columns';

type ReviewsListTableProps = {
  data: ReviewCardApi[];
};

const ReviewsListTable = ({ data = [] }: ReviewsListTableProps) => {
  return <Table columns={getColumns()} rows={data} />;
};

export default ReviewsListTable;
