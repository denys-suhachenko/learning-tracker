import { CheckIcon, CircleIcon, PlayIcon, type LucideIcon } from 'lucide-react';

import type { LessonStatus } from '../../model/types';

type StatusConfig = {
  label: string;
  icon: LucideIcon;
  className: string;
  nextStatus: LessonStatus | null;
};

type StatusDropdownItem = {
  label: string;
  icon: LucideIcon;
  status: LessonStatus;
};

export const statusConfig: Record<LessonStatus, StatusConfig> = {
  planned: {
    label: 'Start lesson',
    icon: CircleIcon,
    className:
      'bg-white dark:bg-transparent text-gray-900 dark:text-white border border-border hover:bg-gray-50 dark:hover:bg-white/5',
    nextStatus: 'in_progress',
  },
  in_progress: {
    label: 'In progress',
    icon: PlayIcon,
    className: 'bg-yellow-400 text-yellow-950 hover:bg-yellow-500',
    nextStatus: 'completed',
  },
  completed: {
    label: 'Completed',
    icon: CheckIcon,
    className: 'bg-green-600 text-white hover:bg-green-700',
    nextStatus: null,
  },
};

export const statusDropdownItems: StatusDropdownItem[] = [
  {
    label: 'Not started',
    icon: CircleIcon,
    status: 'planned',
  },
  {
    label: 'In progress',
    icon: PlayIcon,
    status: 'in_progress',
  },
  {
    label: 'Completed',
    icon: CheckIcon,
    status: 'completed',
  },
];
