import { Progress } from '@/shared/ui';

import { sessionProgress } from '../lib/scheduler';
import { Button } from '@/shared/ui/button';
import { UndoIcon } from 'lucide-react';

type SessionProgressProps = {
  completed: number;
  total: number;
};

const SessionProgress = ({ completed, total }: SessionProgressProps) => {
  const progress = sessionProgress(completed, total);

  return (
    <div className="flex items-center gap-x-6">
      <div className="shrink-0 text-sm font-medium text-gray-500">
        Card {completed} of {total}
      </div>
      <div className="w-full">
        <Progress value={progress} label={`${progress}%`} />
      </div>
      <Button variant="outline">
        <UndoIcon /> Undo
      </Button>
    </div>
  );
};

export default SessionProgress;
