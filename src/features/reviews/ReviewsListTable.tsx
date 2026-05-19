import { Link } from 'react-router';
import {
  CheckIcon,
  EllipsisVerticalIcon,
  FlameIcon,
  PencilIcon,
  PlayIcon,
  ThumbsUpIcon,
  TrashIcon,
} from 'lucide-react';

import { Badge, Table, type TableColumn } from '@/shared/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Button } from '@/shared/ui/button';

export const getColumns = (
  onRemove?: (id: string) => void,
): TableColumn<any>[] => [
  {
    key: 'title',
    header: 'Name',
    render: (row) => (
      <Link
        to={`/courses/${row.id}`}
        className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
      >
        {row.title}
      </Link>
    ),
    width: '22%',
  },
  {
    key: 'deck',
    header: 'Deck',
    width: '26%',
    render: (row) => (
      <Link
        to={`/courses/${row.id}`}
        className="text-sm text-blue-600 dark:text-blue-500 dark:hover:text-white"
      >
        {row.deck}
      </Link>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <Badge>{row.status}</Badge>,
    width: '17%',
  },
  {
    key: 'due_date',
    header: 'Due date',
    render: (row) => <span>{row.due_date}</span>,
    width: '14%',
  },
  {
    key: 'actions',
    header: '',
    width: '5%',
    align: 'right',
    render: (row) => (
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVerticalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <PencilIcon />
                Edit
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                <TrashIcon />
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

const ReviewsListTable = () => {
  const data = [
    {
      id: '1',
      title: 'Define pensive transport.',
      deck: 'Cell Biology Basics',
      status: 'Due Ttoday',
      due_date: 'Today',
    },
  ];

  return <Table columns={getColumns()} rows={data} />;
};

export default ReviewsListTable;
