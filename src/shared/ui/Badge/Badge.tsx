import type { ReactNode } from 'react';
import clsx from 'clsx';

type BadgeProps = {
  color?: 'gray' | 'green' | 'yellow' | 'red';
  children: ReactNode;
};

export const Badge = ({ color = 'gray', children }: BadgeProps) => (
  <div
    className={clsx(
      'inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-medium ring-1',
      color === 'green' &&
        'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-500',
      color === 'yellow' &&
        'bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-500/10 dark:text-yellow-500',
      color === 'gray' &&
        'bg-gray-50 text-gray-600 ring-gray-500/20 dark:bg-gray-400/10 dark:text-gray-400',
      color === 'red' &&
        'bg-red-50 text-red-700 ring-red-500/20 dark:bg-red-400/10 dark:text-red-400',
    )}
  >
    {children}
  </div>
);
