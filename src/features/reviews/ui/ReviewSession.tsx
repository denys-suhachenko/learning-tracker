import SessionProgress from './SessionProgress';
import GradeButtonGroup from './GradeButtonGroup';
import ReviewStep from './ReviewStep';

const ReviewSession = () => {
  return (
    <div className="space-y-8 overflow-hidden rounded-md bg-white p-6 shadow-sm">
      <SessionProgress completed={4} total={12} />

      <ReviewStep />

      <GradeButtonGroup />
    </div>
  );
};

export default ReviewSession;
