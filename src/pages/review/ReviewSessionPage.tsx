import { useNavigate } from 'react-router';

import { Container } from '@/shared/layout';
import { PageHeader, Progress } from '@/shared/ui';
import { Button } from '@/shared/ui/button';
import {
  EyeIcon,
  MoveDownIcon,
  RefreshCcwIcon,
  SmileIcon,
  StoneIcon,
  ThumbsUpIcon,
} from 'lucide-react';
import { Kbd, KbdGroup } from '@/shared/ui/kbd';
import { Badge } from '@/shared/ui/badge';

const ReviewSessionPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl leading-9 font-semibold">Review Session</h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-white/60">
              Deck:{' '}
              <span className="font-medium text-blue-600">
                Cell Biology Basics
              </span>{' '}
              &middot; Topic: <span className="font-medium">Biology</span>
            </p>
          </div>
          <div className="flex items-center gap-x-4">
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/review')}
            >
              End session
            </Button>
          </div>
        </div>
      </PageHeader>

      <Container>
        <div className="space-y-8 overflow-hidden rounded-md bg-white p-6 shadow-sm dark:bg-gray-800/50 dark:outline dark:outline-white/10">
          <div className="flex flex-col items-center gap-2">
            Card 4 of 12
            <div className="w-md">
              <Progress value={25} label="25%" />
            </div>
          </div>

          <div className="mx-auto max-w-4xl rounded-md border bg-white p-10 shadow-lg">
            <div className="mb-2 text-center">
              <Badge>Front</Badge>
            </div>
            <div className="flex min-h-[200px] items-center justify-center text-center text-2xl font-medium">
              What is the function of mitochondria in a cell?
            </div>
          </div>

          <div className="text-center">
            <Button size="lg">
              <EyeIcon /> Show answer
            </Button>

            <MoveDownIcon className="mx-auto mt-6 text-gray-400" />
          </div>

          <div className="mx-auto max-w-4xl rounded-md border bg-white p-10 shadow-lg">
            <div className="mb-2 text-center">
              <Badge variant="secondary">Back</Badge>
            </div>
            <div className="flex min-h-[200px] items-center justify-center text-center text-2xl font-medium">
              Mitochondria are the powerhouse of the cell. They produce ATP
              (adenosine triphosphate) through cellular respiration, providing
              energy for various cellular processes.
            </div>
            <div className="mt-4 flex items-center justify-center gap-6">
              <div className="font-medium">
                <span className="text-green-600">Good:</span> 2 days
              </div>
              <div className="font-medium">
                <span className="text-orange-600">Hard:</span> 1 day
              </div>
              <div className="font-medium">
                <span className="text-red-600">Again:</span> 10 min
              </div>
              <div className="font-medium">
                <span className="text-green-800">Easy:</span> 5 days
              </div>
            </div>
          </div>

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
              <Kbd className="p-3 text-sm">1 Again</Kbd>
              <Kbd className="p-3 text-sm">2 Hard</Kbd>
              <Kbd className="p-3 text-sm">3 Good</Kbd>
              <Kbd className="p-3 text-sm">4 Easy</Kbd>
            </KbdGroup>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ReviewSessionPage;
