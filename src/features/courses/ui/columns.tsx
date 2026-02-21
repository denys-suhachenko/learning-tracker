import { Link } from 'react-router';

import { Badge, Progress, type TableColumn } from '@/shared/ui';

import type { Course } from '../model/types';

export const getColumns = (
  onRemove?: (course: Course) => void,
): TableColumn<Course>[] => [
  {
    key: 'title',
    header: 'Name',
    render: (row) => (
      <Link to="/courses" className="font-medium hover:text-gray-900">
        {row.title}
      </Link>
    ),
    width: '30%',
  },
  {
    key: 'progress',
    header: 'Progress',
    render: (row) => <Progress value={row.progress}>{row.progress}%</Progress>,
    width: '25%',
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <CourseBadge status={row.status} />,
    width: '15%',
  },
  {
    key: 'area',
    header: 'Study area',
    width: '20%',
  },
  {
    key: 'actions',
    header: '',
    width: '10%',
    align: 'right',
    render: (row) => (
      <button
        className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900"
        onClick={() => onRemove?.(row)}
      >
        Remove
      </button>
    ),
  },
];

function CourseBadge({ status }: { status: string }) {
  const meta = {
    COMPLETED: {
      color: 'green',
      label: 'Completed',
    },
    IN_PROGRESS: {
      color: 'yellow',
      label: 'In progress',
    },
    NOT_STARTED: {
      color: 'gray',
      label: 'Not started',
    },
    CANCELLED: {
      color: 'red',
      label: 'Cancelled',
    },
  } as any;

  return <Badge color={meta[status].color}>{meta[status].label}</Badge>;
}
