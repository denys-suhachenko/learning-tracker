import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  className?: string;
};

const buttonStyles = {
  base: 'rounded-md font-medium shadow-xs transition disabled:cursor-not-allowed disabled:opacity-50',
  variant: {
    primary: 'bg-blue-600 text-white hover:bg-blue-500',
    secondary:
      'bg-white text-gray-900 outline outline-gray-300 hover:bg-gray-100 dark:bg-white/10 dark:text-white dark:outline-gray-700 dark:hover:bg-white/15',
  },
  size: {
    small: 'px-2 py-1 text-xs',
    medium: 'px-2.5 py-1.5 text-sm',
    large: 'px-3 py-2 text-sm',
  },
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
        buttonStyles.base,
        buttonStyles.variant[variant],
        buttonStyles.size[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
