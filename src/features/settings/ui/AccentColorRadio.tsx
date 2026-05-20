import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { cn } from '@/shared/lib/utils';
import { CheckIcon } from 'lucide-react';

export type AccentColor =
  | 'violet'
  | 'blue'
  | 'cyan'
  | 'green'
  | 'orange'
  | 'red'
  | 'pink';

type AccentColorRadioProps = {
  defaultValue?: AccentColor;
  value: AccentColor;
  onChange: (value: AccentColor) => void;
};

const colorOptions: { value: AccentColor; title: string; bgClass: string }[] = [
  { value: 'violet', title: 'Violet', bgClass: 'bg-violet-600' },
  { value: 'blue', title: 'Blue', bgClass: 'bg-blue-600' },
  { value: 'cyan', title: 'Cyan', bgClass: 'bg-cyan-600' },
  { value: 'green', title: 'Green', bgClass: 'bg-green-600' },
  { value: 'orange', title: 'Orange', bgClass: 'bg-orange-600' },
  { value: 'red', title: 'Red', bgClass: 'bg-red-600' },
  { value: 'pink', title: 'Pink', bgClass: 'bg-pink-600' },
];

export const AccentColorRadio = ({
  defaultValue,
  value,
  onChange,
}: AccentColorRadioProps) => {
  return (
    <RadioGroup
      defaultValue={defaultValue}
      value={value}
      className="flex items-center gap-2"
      onValueChange={(nextValue) => onChange(nextValue as AccentColor)}
    >
      {colorOptions.map((color) => (
        <label
          key={color.value}
          htmlFor={color.value}
          className={cn(
            'relative flex size-8 cursor-pointer items-center justify-center rounded-full ring-offset-2 outline outline-transparent transition-all',
            'hover:outline-black/60',
            color.bgClass,
          )}
        >
          {value === color.value && (
            <CheckIcon className="pointer-events-none size-4 text-white" />
          )}
          <RadioGroupItem
            id={color.value}
            value={color.value}
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          />
        </label>
      ))}
    </RadioGroup>
  );
};
