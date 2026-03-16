import clsx from 'clsx';
import { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactElement;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    return (
      <div className="relative">
        {props.icon && (
          <div className="absolute top-2.5 left-2">{props.icon}</div>
        )}
        <input
          ref={ref}
          className={clsx(
            'mt-2 block w-full rounded-md bg-white py-1.5 text-sm leading-6 text-gray-900 outline-1 outline-gray-300 focus:outline-gray-400',
            props.icon ? 'pr-3 pl-8' : 'px-3',
          )}
          {...props}
        />
      </div>
    );
  },
);
