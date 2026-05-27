import { Link } from 'react-router';
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';

import { Badge, Progress, type TableColumn } from '@/shared/ui';

import type { Course } from '../../model/types';

export const getColumns = (
  onRemove?: (id: string) => void,
): TableColumn<Course>[] => [
  {
    key: 'title',
    header: 'Name',
    render: (row) => (
      <Link
        to={`/courses/${row.id}`}
        className="text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        {row.title}
      </Link>
    ),
    width: '22%',
  },
  {
    key: 'description',
    header: 'Description',
    width: '26%',
    render: (row) => (
      <span className="text-xs text-gray-700">{row.description}</span>
    ),
  },
  {
    key: 'slug',
    header: 'Progress',
    render: () => {
      const val = Math.max(0, Math.min(Math.round(Math.random() * 100), 100));
      return (
        <Progress
          value={val}
          label={<span className="ml-2">{val}%</span>}
          className="max-w-32"
        />
      );
    },
    width: '16%',
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <CourseBadge status={row.status} />,
    width: '12%',
  },
  {
    key: 'study_area',
    header: 'Study area',
    render: (row) => <span>{row.study_area?.name}</span>,
    width: '14%',
  },
  {
    key: 'actions',
    header: '',
    width: '10%',
    align: 'right',
    render: (row) => (
      <div className="flex items-center justify-end gap-x-4">
        <Link
          to={`${row.id}/edit`}
          className="cursor-pointer text-sm font-medium text-gray-400 hover:text-gray-900"
        >
          <PencilIcon className="size-4" />
        </Link>
        <button
          className="cursor-pointer text-sm font-medium text-gray-400 hover:text-gray-900"
          onClick={() => onRemove?.(row.id)}
        >
          <TrashIcon className="size-4" />
        </button>
      </div>
    ),
  },
];

export function CourseBadge({ status }: { status?: string }) {
  const meta = {
    active: {
      color: 'green',
      label: 'Active',
    },
    draft: {
      color: 'gray',
      label: 'Draft',
    },
  } as any;

  const key = status ?? '';
  return (
    <Badge color={meta[key]?.color || 'gray'}>
      {meta[key]?.label || status}
    </Badge>
  );
}
