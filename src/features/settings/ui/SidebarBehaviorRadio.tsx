import { PanelLeftDashedIcon, PanelLeftIcon } from 'lucide-react';

import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { cn } from '@/shared/lib/utils';

export type SidebarBehaviorType = 'expanded' | 'collapsed';

type SidebarBehaviorRadioProps = {
  defaultValue?: SidebarBehaviorType;
  value: SidebarBehaviorType;
  onChange: (value: SidebarBehaviorType) => void;
};

const options = [
  {
    value: 'expanded',
    title: 'Expanded',
    description: 'Always show full sidebar',
    icon: <PanelLeftIcon />,
  },
  {
    value: 'collapsed',
    title: 'Collapsed',
    description: 'Collapse by default',
    icon: <PanelLeftDashedIcon />,
  },
];

export const SidebarBehaviorRadio = ({
  defaultValue,
  value,
  onChange,
}: SidebarBehaviorRadioProps) => {
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
