import { EyeIcon, MoveDownIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';

import ReviewCard from './ReviewCard';
import IntervalPreview from './IntervalPreview';

const ReviewStep = () => {
  return (
    <>
      <ReviewCard side="front">
        <div className="flex min-h-50 items-center justify-center text-center text-2xl font-medium">
          What is the function of mitochondria in a cell?
        </div>
      </ReviewCard>

      <div className="text-center">
        <Button size="lg">
          <EyeIcon /> Show answer
        </Button>

        <MoveDownIcon className="mx-auto mt-6 text-gray-400" />
      </div>

      <ReviewCard side="back">
        <div className="flex min-h-50 items-center justify-center text-center text-2xl font-medium">
          Mitochondria are the powerhouse of the cell. They produce ATP
          (adenosine triphosphate) through cellular respiration, providing
          energy for various cellular processes.
        </div>

        <div className="mt-4">
          <IntervalPreview />
        </div>
      </ReviewCard>
    </>
  );
};

export default ReviewStep;
