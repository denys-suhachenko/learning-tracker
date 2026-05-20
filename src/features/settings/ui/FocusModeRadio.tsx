import { Grid2X2Icon, LayoutGridIcon } from 'lucide-react';

import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { cn } from '@/shared/lib/utils';

export type FocusModeType = 'comfortable' | 'compact';

type FocusModeRadioProps = {
  defaultValue?: FocusModeType;
  value: FocusModeType;
  onChange: (value: FocusModeType) => void;
};

const options = [
  {
    value: 'comfortable',
    title: 'Comfortable',
    description: 'More spacing and larger elements',
    icon: <LayoutGridIcon />,
  },
  {
    value: 'compact',
    title: 'Compact',
    description: 'Show more content at once',
    icon: <Grid2X2Icon />,
  },
];

export const FocusModeRadio = ({
  defaultValue,
  value,
  onChange,
}: FocusModeRadioProps) => {
  return (
    <RadioGroup
      defaultValue={defaultValue}
      value={value}
      className="grid grid-cols-2 gap-4"
      onValueChange={(nextValue) => onChange(nextValue as FocusModeType)}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            'relative flex cursor-pointer items-start gap-3 rounded-md border p-4 transition select-none',
            option.value === value
              ? 'bg-blue-50'
              : 'bg-white hover:bg-slate-50',
          )}
        >
          <div className="flex flex-1 gap-3 leading-snug">
            {option.icon}
            <div>
              <div className="mb-1 text-sm leading-none font-medium">
                {option.title}
              </div>
              <p className="text-muted-foreground text-xs">
                {option.description}
              </p>
            </div>
          </div>
          <RadioGroupItem id={option.value} value={option.value} />
        </label>
      ))}
    </RadioGroup>
  );
};
