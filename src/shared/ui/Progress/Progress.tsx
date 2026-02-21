import type { ReactNode } from 'react';

type ProgressProps = {
  value: number;
  children?: ReactNode;
};

export const Progress = ({ value, children }: ProgressProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-gray-900"
          style={{ width: `${value}%` }}
        />
      </div>
      {children}
    </div>
  );
};
