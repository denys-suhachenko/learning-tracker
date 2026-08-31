import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';

import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { cn } from '@/shared/lib/utils';
import { useTranslation } from 'react-i18next';

type ThemeValue = 'light' | 'dark' | 'system';

type ThemeSwitcherRadioProps = {
  defaultValue?: ThemeValue;
  value: ThemeValue;
  onChange: (value: ThemeValue) => void;
};

const options = [
  {
    value: 'light',
    icon: <SunIcon />,
  },
  {
    value: 'dark',
    icon: <MoonIcon />,
  },
  {
    value: 'system',
    icon: <MonitorIcon />,
  },
] as const;

export const ThemeSwitcherRadio = ({
  defaultValue,
  value,
  onChange,
}: ThemeSwitcherRadioProps) => {
  const { t } = useTranslation('settings', {
    keyPrefix: 'appereance.theme.options',
  });

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
              ? 'dark:bg-accent bg-blue-50'
              : 'dark:hover:bg-accent hover:bg-slate-50',
          )}
        >
          {option.icon}
          <div className="font-medium">{t(`${option.value}.label`)}</div>
          <div className="text-muted-foreground text-xs">
            {t(`${option.value}.description`)}
          </div>
          <RadioGroupItem id={option.value} value={option.value} />
        </label>
      ))}
    </RadioGroup>
  );
};
