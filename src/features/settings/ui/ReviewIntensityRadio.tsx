import { FlameIcon, LeafIcon, ScaleIcon } from 'lucide-react';

import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { cn } from '@/shared/lib/utils';

type ReviewIntensity = 'light' | 'balanced' | 'intense';

type ReviewIntensityRadioGroupProps = {
  defaultValue?: ReviewIntensity;
  value: ReviewIntensity;
  onChange: (value: ReviewIntensity) => void;
};

const options = [
  {
    value: 'light',
    title: 'Light',
    description: 'Slower intervals. More reviews.',
    icon: <LeafIcon className="text-green-600" />,
  },
  {
    value: 'balanced',
    title: 'Balanced',
    description: 'Recommended for most users.',
    icon: <ScaleIcon className="text-blue-600" />,
  },
  {
    value: 'intense',
    title: 'Intense',
    description: 'Faster intervals. Fewer reviews.',
    icon: <FlameIcon className="text-orange-600" />,
  },
];

export const ReviewIntensityRadioGroup = ({
  defaultValue,
  value,
  onChange,
}: ReviewIntensityRadioGroupProps) => {
  return (
    <RadioGroup
      defaultValue={defaultValue}
      value={value}
      className="grid grid-cols-3 gap-4"
      onValueChange={(nextValue) => onChange(nextValue as ReviewIntensity)}
    >
      {options.map((option) => (
        <label
          key={option.value}
          htmlFor={option.value}
          className={cn(
            'relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border p-4 text-center transition select-none',
            'hover:bg-slate-50',
            option.value === value ? 'bg-blue-50' : 'bg-white',
          )}
        >
          {option.icon}
          <div className="font-medium">{option.title}</div>
          <div className="text-muted-foreground text-xs">
            {option.description}
          </div>
          <RadioGroupItem id={option.value} value={option.value} />
        </label>
      ))}
    </RadioGroup>
  );
};
