import { useTranslation } from 'react-i18next';

import { Badge } from '@/shared/ui/badge';
import { cn } from '@/shared/lib/utils';

type ReviewCardProps = {
  side: 'front' | 'back';
  metadata?: string;
  className?: string;
  children: React.ReactNode;
};

const ReviewCard = ({
  side,
  metadata,
  className,
  children,
}: ReviewCardProps) => {
  const { t } = useTranslation('reviews');

  return (
    <div className={cn('p-8', className)}>
      <div className="mb-6 flex items-center gap-x-3">
        <Badge variant={side === 'front' ? 'secondary' : 'default'}>
          {t(`sides.${side}`)}
        </Badge>
        {metadata && <div className="text-xs text-gray-500">{metadata}</div>}
      </div>

      {children}
    </div>
  );
};

export default ReviewCard;
