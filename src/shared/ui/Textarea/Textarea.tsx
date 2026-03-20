import { forwardRef } from 'react';
import clsx from 'clsx';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    return (
      <div className="relative">
        <textarea
          ref={ref}
          {...props}
          className={clsx(
            'block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm leading-6 outline-1 outline-gray-300 focus:outline-gray-400 dark:text-white dark:outline-gray-700 dark:focus:outline-gray-600',
            props.className,
          )}
        />
      </div>
    );
  },
);
