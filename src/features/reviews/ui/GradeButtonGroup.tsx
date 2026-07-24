import {
  RefreshCcwIcon,
  SmileIcon,
  StoneIcon,
  ThumbsUpIcon,
} from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Kbd, KbdGroup } from '@/shared/ui/kbd';

const GradeButtonGroup = () => {
  return (
    <>
      <div className="flex items-center justify-center gap-x-6">
        <Button size="lg" variant="outline" data-icon="inline-start">
          <RefreshCcwIcon /> Repeat
        </Button>
        <Button size="lg" variant="outline" data-icon="inline-start">
          <StoneIcon /> Hard
        </Button>
        <Button size="lg" variant="outline" data-icon="inline-start">
          <SmileIcon /> Good
        </Button>
        <Button size="lg" variant="outline" data-icon="inline-start">
          <ThumbsUpIcon /> Easy
        </Button>
      </div>

      <div className="text-muted-foreground text-center text-sm font-medium">
        Shortcuts:{' '}
        <KbdGroup>
          <Kbd className="p-3 text-sm">1 - Again</Kbd>
          <Kbd className="p-3 text-sm">2 - Hard</Kbd>
          <Kbd className="p-3 text-sm">3 - Good</Kbd>
          <Kbd className="p-3 text-sm">4 - Easy</Kbd>
        </KbdGroup>
      </div>
    </>
  );
};

export default GradeButtonGroup;
