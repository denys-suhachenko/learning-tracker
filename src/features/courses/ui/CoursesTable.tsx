import { useMemo, useState } from 'react';

import { Multiselect, Table } from '@/shared/ui';
import { useAppSelector } from '@/app/store/hooks';

import { getColumns, CourseBadge } from './columns';

const CoursesTable = () => {
  const list = useAppSelector((state) => state.courses.list);
  const [selectedStatuses, setSelectedStatuses] = useState<any>([]);

  const statuses = [
    { id: 1, label: 'Completed', value: 'COMPLETED' },
    { id: 2, label: 'In progress', value: 'IN_PROGRESS' },
    { id: 3, label: 'Not started', value: 'NOT_STARTED' },
    { id: 4, label: 'Draft', value: 'DRAFT' },
    { id: 5, label: 'Cancelled', value: 'CANCELLED' },
  ];

  const columns = useMemo(() => getColumns(), []);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Multiselect
          value={selectedStatuses}
          options={statuses}
          width={320}
          label="Statuses"
          chipTemplate={(val) => <CourseBadge status={val.value} />}
          onChange={(value) => setSelectedStatuses(value)}
        />

        <div className="text-sm">
          <span className="font-medium">Sort by:</span> Progress
        </div>
      </div>

      <Table columns={columns} rows={list} />
    </div>
  );
};

export default CoursesTable;
