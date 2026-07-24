import { Progress } from '@/shared/ui';

import { sessionProgress } from '../lib/scheduler';

type SessionProgressProps = {
  completed: number;
  total: number;
};

const SessionProgress = ({ completed, total }: SessionProgressProps) => {
  const progress = sessionProgress(completed, total);

  return (
    <div className="flex flex-col items-center gap-2">
      Card {completed} of {total}
      <div className="w-md">
        <Progress value={progress} label={`${progress}%`} />
      </div>
    </div>
  );
};

export default SessionProgress;
