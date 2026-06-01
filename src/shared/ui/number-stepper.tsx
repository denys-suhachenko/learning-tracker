import { Minus, Plus } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

type NumberStepperProps = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  onChange: (value: number) => void;
};

const NumberStepper = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  className,
  onChange,
}: NumberStepperProps) => {
  const decrease = () => {
    onChange(Math.max(min, value - step));
  };

  const increase = () => {
    onChange(Math.min(max, value + step));
  };

  return (
    <div
      className={cn(
        'inline-flex h-8 items-center overflow-hidden rounded-lg border bg-white',
        className,
      )}
    >
      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        className="flex h-full w-8 items-center justify-center text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Decrease value"
      >
        <Minus className="h-4 w-4" />
      </button>

      <div className="min-w-10 px-3 text-center text-sm font-medium text-slate-950">
        {value}
      </div>

      <button
        type="button"
        onClick={increase}
        disabled={value >= max}
        className="flex h-full w-8 items-center justify-center text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Increase value"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};

export default NumberStepper;
