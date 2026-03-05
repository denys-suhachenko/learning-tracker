import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  className?: string;
};

export const Button = ({
  variant = 'primary',
  size = 'medium',
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'cursor-pointer rounded-md text-sm font-medium shadow-xs transition',
        size === 'small' && 'px-2 py-1',
        size === 'medium' && 'px-2.5 py-1.5',
        size === 'large' && 'px-3 py-2',
        variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-500',
        variant === 'secondary' &&
          'bg-white text-gray-900 outline-1 outline-gray-300 hover:bg-gray-100 dark:bg-white/10 dark:text-white dark:outline-gray-700 dark:hover:bg-white/15',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
