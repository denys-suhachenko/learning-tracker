import { Badge } from '@/shared/ui/badge';

type ReviewCardProps = {
  side: 'front' | 'back';
  children: React.ReactNode;
};

const ReviewCard = ({ side, children }: ReviewCardProps) => {
  return (
    <div className="mx-auto max-w-4xl rounded-md border bg-white p-10 shadow-lg">
      <div className="mb-2 text-center">
        <Badge variant={side === 'front' ? 'default' : 'secondary'}>
          {side}
        </Badge>
      </div>

      {children}
    </div>
  );
};

export default ReviewCard;
