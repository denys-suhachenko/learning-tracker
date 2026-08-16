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

import type { ReviewCardApi } from '../../model/types';
import { formatDueDate, formatStatus } from '../../lib/format';

export const getColumns = (): TableColumn<ReviewCardApi>[] => [
  {
    key: 'question',
    header: 'Name',
    render: (row: ReviewCardApi) => (
      <span className="text-sm font-medium text-gray-700 hover:text-gray-900">
        {row.question}
      </span>
    ),
    width: '22%',
  },
  {
    key: 'deck_name',
    header: 'Deck',
    width: '26%',
    render: (row: ReviewCardApi) => <span>{row.deck_name}</span>,
  },
  {
    key: 'status',
    header: 'Status',
    render: (row: ReviewCardApi) => <Badge>{formatStatus(row)}</Badge>,
    width: '17%',
  },
  {
    key: 'due_at',
    header: 'Due date',
    render: (row: ReviewCardApi) => <span>{formatDueDate(row.due_at)}</span>,
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
