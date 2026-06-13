import { PanelLeftDashedIcon, PanelLeftIcon } from 'lucide-react';

import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { cn } from '@/shared/lib/utils';
import { useTranslation } from 'react-i18next';

export type SidebarBehaviorType = 'expanded' | 'collapsed';

type SidebarBehaviorRadioProps = {
  defaultValue?: SidebarBehaviorType;
  value: SidebarBehaviorType;
  onChange: (value: SidebarBehaviorType) => void;
};

const options = [
  {
    value: 'expanded',
    icon: <PanelLeftIcon />,
  },
  {
    value: 'collapsed',
    icon: <PanelLeftDashedIcon />,
  },
] as const;

export const SidebarBehaviorRadio = ({
  defaultValue,
  value,
  onChange,
}: SidebarBehaviorRadioProps) => {
  const { t } = useTranslation('settings', {
    keyPrefix: 'appereance.sidebar.options',
  });

  return (
    <RadioGroup
      defaultValue={defaultValue}
      value={value}
      className="grid grid-cols-2 gap-4"
      onValueChange={(nextValue) => onChange(nextValue as SidebarBehaviorType)}
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
                {t(`${option.value}.label`)}
              </div>
              <p className="text-muted-foreground text-xs">
                {t(`${option.value}.description`)}
              </p>
            </div>
          </div>
          <RadioGroupItem id={option.value} value={option.value} />
        </label>
      ))}
    </RadioGroup>
  );
};
