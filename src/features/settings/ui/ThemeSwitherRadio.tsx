import {
  FlameIcon,
  LeafIcon,
  MonitorIcon,
  MoonIcon,
  ScaleIcon,
  SunIcon,
} from 'lucide-react';

import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { cn } from '@/shared/lib/utils';

type ThemeValue = 'light' | 'dark' | 'system';

type ThemeSwitcherRadioProps = {
  defaultValue?: ThemeValue;
  value: ThemeValue;
  onChange: (value: ThemeValue) => void;
};

const options = [
  {
    value: 'light',
    title: 'Light',
    description: 'Clean and bright',
    icon: <SunIcon />,
  },
  {
    value: 'dark',
    title: 'Dark',
    description: 'Easy on the eyes',
    icon: <MoonIcon />,
  },
  {
    value: 'system',
    title: 'System',
    description: 'Follow system',
    icon: <MonitorIcon />,
  },
];

export const ThemeSwitcherRadio = ({
  defaultValue,
  value,
  onChange,
}: ThemeSwitcherRadioProps) => {
  return (
    <RadioGroup
      defaultValue={defaultValue}
      value={value}
      className="grid grid-cols-3 gap-4"
      onValueChange={(nextValue) => onChange(nextValue as ThemeValue)}
    >
      {options.map((option) => (
        <label
          key={option.value}
          htmlFor={option.value}
          className={cn(
            'relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border p-4 text-center transition select-none',
            option.value === value
              ? 'bg-blue-50'
              : 'bg-white hover:bg-slate-50',
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
