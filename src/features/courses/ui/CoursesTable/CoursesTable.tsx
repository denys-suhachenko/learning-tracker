import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Multiselect, Table } from '@/shared/ui';

import type { CourseStatus } from '../../model/types';
import { useGetCoursesQuery, useRemoveCourseMutation } from '../../api/api';

import { getColumns, CourseBadge } from './columns';

type StatusOption = {
  id: number;
  label: string;
  value: CourseStatus;
  color: string;
};

const statuses: StatusOption[] = [
  { id: 1, label: 'Active', value: 'active', color: 'bg-green-400' },
  { id: 3, label: 'Draft', value: 'draft', color: 'bg-gray-400' },
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
  const [selectedStatuses, setSelectedStatuses] = useState<StatusOption[]>([]);

  const { data: courses = [] } = useGetCoursesQuery();
  const [remove] = useRemoveCourseMutation();

  const handleCourseRemove = async (courseId: string) => {
    try {
      await remove(courseId).unwrap();
      toast.success('Course successfuly removed!');
    } catch {
      toast.error("Error! Course hasn't been removed");
    }
  };

  const columns = useMemo(() => getColumns(), []);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Multiselect
          value={selectedStatuses}
          options={statuses}
          width={220}
          label="Statuses"
          chipTemplate={(val) => <CourseBadge status={val.value} />}
          optionTemplate={(option) => <StatusOptionItem option={option} />}
          onChange={(value) => setSelectedStatuses(value)}
        />

        <div className="text-sm">
          <span className="font-medium">Sort by:</span> Progress
        </div>
      </div>

      <Table columns={columns} rows={courses} />
    </div>
  );
};

export default CoursesTable;
