import { FlameIcon, LeafIcon, ScaleIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { cn } from '@/shared/lib/utils';

export type ReviewIntensityType = 'light' | 'balanced' | 'intense';

type ReviewIntensityRadioGroupProps = {
  defaultValue?: ReviewIntensityType;
  value: ReviewIntensityType;
  onChange: (value: ReviewIntensityType) => void;
};

const options = [
  {
    value: 'light',
    icon: <LeafIcon className="text-green-600" />,
  },
  {
    value: 'balanced',
    icon: <ScaleIcon className="text-blue-600" />,
  },
  {
    value: 'intense',
    icon: <FlameIcon className="text-orange-600" />,
  },
] as const;

export const ReviewIntensityRadioGroup = ({
  defaultValue,
  value,
  onChange,
}: ReviewIntensityRadioGroupProps) => {
  const { t } = useTranslation('settings', {
    keyPrefix: 'review.intensity.options',
  });

  return (
    <RadioGroup
      defaultValue={defaultValue}
      value={value}
      className="grid grid-cols-3 gap-4"
      onValueChange={(nextValue) => onChange(nextValue as ReviewIntensityType)}
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
