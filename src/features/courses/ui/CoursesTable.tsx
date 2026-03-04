import { useMemo, useState } from 'react';

import { Multiselect, Table } from '@/shared/ui';
import { useAppSelector } from '@/app/store/hooks';

import { getColumns, CourseBadge } from './columns';

type StatusOption = {
  id: number;
  label: string;
  value: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED' | 'CANCELLED';
  color: string;
};

const statuses: StatusOption[] = [
  { id: 1, label: 'Completed', value: 'COMPLETED', color: 'bg-green-400' },
  { id: 2, label: 'In progress', value: 'IN_PROGRESS', color: 'bg-yellow-500' },
  { id: 3, label: 'Not started', value: 'NOT_STARTED', color: 'bg-gray-400' },
  { id: 4, label: 'Cancelled', value: 'CANCELLED', color: 'bg-red-400' },
];

const StatusOptionItem = ({ option }: { option: StatusOption }) => {
  return (
    <div className="flex items-center gap-x-2">
      <div className={`h-2 w-2 ${option.color} rounded-full`} />
      {option.label}
    </div>
  );
};

const CoursesTable = () => {
  const list = useAppSelector((state) => state.courses.list);
  const [selectedStatuses, setSelectedStatuses] = useState<any>([]);

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
          optionTemplate={(option) => <StatusOptionItem option={option} />}
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
