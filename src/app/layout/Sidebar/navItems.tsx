import {
  RefreshCcwIcon,
  // CalendarIcon,
  // LibraryBigIcon,
  BookAIcon,
  HouseIcon,
} from 'lucide-react';

export const navItems = [
  {
    path: '/',
    label: 'dashboard',
    icon: <HouseIcon className="size-6" />,
  },
  {
    path: '/courses',
    label: 'courses',
    icon: <BookAIcon className="size-6" />,
  },
  // {
  //   path: '/planner',
  //   label: 'planner',
  //   icon: <CalendarIcon className="size-6" />,
  // },
  {
    path: '/review',
    label: 'review',
    icon: <RefreshCcwIcon className="size-6" />,
  },
  // {
  //   path: '/knowledge-base',
  //   label: 'knowledgeBase',
  //   icon: <LibraryBigIcon className="size-6" />,
  // },
] as const;
