import {
  RefreshCcwIcon,
  CalendarIcon,
  LibraryBigIcon,
  BookAIcon,
  HouseIcon,
} from 'lucide-react';

export const navItems = [
  {
    path: '/',
    label: 'Dashboard',
    icon: <HouseIcon className="size-6" />,
  },
  {
    path: '/courses',
    label: 'Courses',
    icon: <BookAIcon className="size-6" />,
  },
  // {
  //   path: '/planner',
  //   label: 'Planner',
  //   icon: <CalendarIcon className="size-6" />,
  // },
  {
    path: '/review',
    label: 'Review',
    icon: <RefreshCcwIcon className="size-6" />,
  },
  // {
  //   path: '/knowledge-base',
  //   label: 'Knowledge Base',
  //   icon: <LibraryBigIcon className="size-6" />,
  // },
];
