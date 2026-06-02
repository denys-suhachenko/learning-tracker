import { ChevronDownIcon } from 'lucide-react';

import { ButtonGroup } from '@/shared/ui/button-group';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import type { LessonStatus } from '../../model/types';

import { statusConfig, statusDropdownItems } from './statusConfig';
import { cn } from '@/shared/lib/utils';

type LessonStatusSelectorProps = {
  status: LessonStatus;
  disabled?: boolean;
  onChange: (status: LessonStatus) => void;
};

const LessonStatusSelector = ({
  status,
  disabled,
  onChange,
}: LessonStatusSelectorProps) => {
  const config = statusConfig[status];

  return (
    <ButtonGroup aria-disabled={disabled}>
      <Button
        disabled={disabled || !config.nextStatus}
        className={cn(config.className)}
        onClick={() => config.nextStatus && onChange(config.nextStatus)}
      >
        <config.icon /> {config.label}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button disabled={disabled} className={cn(config.className)}>
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {statusDropdownItems.map((item) => (
            <DropdownMenuItem
              key={item.status}
              disabled={item.status === status}
              onClick={() => onChange(item.status)}
            >
              <item.icon /> {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
};

export default LessonStatusSelector;
