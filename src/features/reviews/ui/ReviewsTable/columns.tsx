import { Link } from 'react-router';
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react';

import { type TableColumn } from '@/shared/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';

import type { Review } from '../../model/types';

export const getColumns = (): TableColumn<Review>[] => [
  {
    key: 'title',
    header: 'Name',
    render: (row: Review) => (
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
    key: 'deck',
    header: 'Deck',
    width: '26%',
    render: (row: Review) => (
      <Link to={`/courses/${row.id}`} className="text-sm text-blue-600">
        {row.deck}
      </Link>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    render: (row: Review) => <Badge>{row.status}</Badge>,
    width: '17%',
  },
  {
    key: 'due_date',
    header: 'Due date',
    render: (row: Review) => <span>{row.due_date}</span>,
    width: '14%',
  },
  {
    key: 'actions',
    header: '',
    width: '5%',
    align: 'right',
    render: () => (
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
