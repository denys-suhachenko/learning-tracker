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
        'rounded-md text-sm font-medium shadow-xs transition',
        size === 'small' && 'px-2 py-1',
        size === 'medium' && 'px-2.5 py-1.5',
        size === 'large' && 'px-3 py-2',
        variant === 'primary' && 'bg-gray-900 text-white hover:bg-gray-700',
        variant === 'secondary' &&
          'bg-white text-gray-900 outline-1 outline-gray-300 hover:bg-gray-100',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
