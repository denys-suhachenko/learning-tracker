import { useNavigate } from 'react-router';
import { PlayIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';

import type { ReviewSummary } from '../model/types';

type ReviewsSummaryCardProps = {
  summary?: ReviewSummary;
};

const ReviewsSummaryCard = ({ summary }: ReviewsSummaryCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card overflow-hidden rounded-md px-6 py-4 text-sm shadow-sm">
      <h3 className="mb-4 text-lg font-medium">Today's Summary</h3>

      <ul className="space-y-1">
        <li className="flex items-center justify-between">
          <div>Due today</div>
          <div>{summary?.due_today ?? 0}</div>
        </li>
        <li className="flex items-center justify-between">
          <div>Reviewed today</div>
          <div>{summary?.reviewed_today ?? 0}</div>
        </li>
        <li className="flex items-center justify-between">
          <div>New cards</div>
          <div>{summary?.new_cards ?? 0}</div>
        </li>
        <li className="flex items-center justify-between">
          <div>Learning</div>
          <div>{summary?.learning ?? 0}</div>
        </li>
        <li className="flex items-center justify-between">
          <div>Mastered cards</div>
          <div>{summary?.mastered_cards ?? 0}</div>
        </li>
      </ul>

      <Button
        size="lg"
        className="mt-6 flex w-full items-center justify-center gap-x-3"
        onClick={() => navigate('/review/123')}
      >
        Start Review Session <PlayIcon className="size-4" />
      </Button>
    </div>
  );
};

export default ReviewsSummaryCard;
