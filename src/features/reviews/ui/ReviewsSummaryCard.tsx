import { useNavigate } from 'react-router';
import { PlayIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';

const ReviewsSummaryCard = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-md bg-white px-6 py-4 text-sm shadow-sm">
      <h3 className="mb-4 text-lg font-medium">Today's Summary</h3>

      <ul className="space-y-1">
        <li className="flex items-center justify-between">
          <div>Due today</div>
          <div>18</div>
        </li>
        <li className="flex items-center justify-between">
          <div>Reviewed today</div>
          <div>24</div>
        </li>
        <li className="flex items-center justify-between">
          <div>New cards</div>
          <div>7</div>
        </li>
        <li className="flex items-center justify-between">
          <div>Learning</div>
          <div>9</div>
        </li>
        <li className="flex items-center justify-between">
          <div>Mastered cards</div>
          <div>82</div>
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
