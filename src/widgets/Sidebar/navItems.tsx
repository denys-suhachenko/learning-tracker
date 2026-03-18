import { KeyIcon } from '@heroicons/react/24/outline';
import {
  BookOpenIcon,
  CalendarIcon,
  CircleStackIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

export const navItems = [
  {
    path: '/',
    label: 'Dashboard',
    icon: <HomeIcon className="size-6" />,
  },
  {
    path: '/courses',
    label: 'Courses',
    icon: <BookOpenIcon className="size-6" />,
  },
  {
    path: '/planner',
    label: 'Planner',
    icon: <CalendarIcon className="size-6" />,
  },
  {
    path: '/knowledge-base',
    label: 'Knowledge Base',
    icon: <CircleStackIcon className="size-6" />,
  },
  {
    path: '/sign-in',
    label: 'Sign In',
    icon: <KeyIcon className="size-6" />,
  },
];
