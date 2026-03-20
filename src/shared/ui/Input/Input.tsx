import clsx from 'clsx';
import { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  label?: string;
  description?: string;
  icon?: React.ReactElement;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, description, icon, className, ...props }: InputProps, ref) => {
    return (
      <div>
        {label && (
          <label htmlFor={id} className="mb-2 block font-medium">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && <div className="absolute top-2.5 left-2">{icon}</div>}
          <input
            id={id}
            ref={ref}
            className={clsx(
              'block w-full rounded-md bg-white/5 py-1.5 text-sm leading-6 outline-1 outline-gray-300 focus:outline-gray-400 dark:text-white dark:outline-gray-700 dark:focus:outline-gray-600',
              icon ? 'pr-3 pl-8' : 'px-3',
              className,
            )}
            {...props}
          />
        </div>
        {description && (
          <p className="mt-2 text-xs text-red-600 dark:text-red-400">
            {description}
          </p>
        )}
      </div>
    );
  },
);
