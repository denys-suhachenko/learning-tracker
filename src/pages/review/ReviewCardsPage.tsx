import { useNavigate } from 'react-router';
import {
  CheckIcon,
  FlameIcon,
  ListFilterIcon,
  PlayIcon,
  PlusIcon,
  SearchIcon,
  ThumbsUpIcon,
} from 'lucide-react';

import { PageHeader } from '@/shared/ui';
import { Container } from '@/shared/layout';
import ReviewsListTable from '@/features/reviews/ReviewsListTable';
import { Button } from '@/shared/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shared/ui/input-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

const ReviewCardsPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl leading-9 font-semibold">
              Cards & Due Today
            </h1>
            <p className="mt-2 text-base font-medium text-gray-500 dark:text-white/60">
              Overview of your cards and what's due for review.
            </p>
          </div>
          <div className="flex items-center gap-x-4">
            <Button
              size="lg"
              data-icon="inline-start"
              onClick={() => navigate('/review/create')}
            >
              <PlusIcon className="size-4" /> New Card
            </Button>
          </div>
        </div>
      </PageHeader>

      <Container>
        <div className="grid grid-cols-[3fr_1fr] gap-x-6">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <InputGroup className="min-w-3xs bg-white">
                  <InputGroupInput placeholder="Search cards..." />
                  <InputGroupAddon align="inline-end">
                    <SearchIcon />
                  </InputGroupAddon>
                </InputGroup>

                <Select defaultValue="all">
                  <SelectTrigger className="w-full max-w-48 bg-white">
                    <SelectValue placeholder="Select a deck" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All decks</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all">
                  <SelectTrigger className="w-full max-w-48 bg-white">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All topics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button size="lg" variant="outline" data-icon="inline-end">
                <ListFilterIcon className="size-3" /> Filter
              </Button>
            </div>
            <div className="mb-4">
              <Tabs defaultValue="all">
                <TabsList variant="line">
                  <TabsTrigger value="all">All Cards</TabsTrigger>
                  <TabsTrigger value="today">Due Today</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                  <TabsTrigger value="learning">Learning</TabsTrigger>
                  <TabsTrigger value="review">Review</TabsTrigger>
                  <TabsTrigger value="mastered">Mastered</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <ReviewsListTable />
          </div>

          <aside className="sticky top-6 space-y-6 self-start">
            <div className="overflow-hidden rounded-md bg-white px-6 py-4 text-sm shadow-sm dark:bg-gray-800/50 dark:outline dark:outline-white/10">
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
                onClick={() => navigate('123')}
              >
                Start Review Session <PlayIcon className="size-4" />
              </Button>
            </div>

            <div className="overflow-hidden rounded-md bg-white px-6 py-4 shadow-sm dark:bg-gray-800/50 dark:outline dark:outline-white/10">
              <h3 className="mb-4 text-lg font-medium">Study Streak</h3>

              <div className="mb-6 flex items-center gap-x-2">
                <FlameIcon className="size-8 text-orange-500" />
                <span className="text-lg font-semibold">12 days</span>
              </div>

              <div className="mb-4 flex items-center gap-x-2">
                <span className="font-medium">Keep it up!</span>
                <ThumbsUpIcon className="size-5" />
              </div>

              <ul className="flex flex-nowrap items-center justify-between">
                <li className="flex flex-col justify-center text-center">
                  <div className="mb-1 text-sm">M</div>
                  <div className="flex size-5 items-center justify-center rounded-full bg-green-300">
                    <CheckIcon className="size-3" />
                  </div>
                </li>
                <li className="flex flex-col justify-center text-center">
                  <div className="mb-1 text-sm">T</div>
                  <div className="flex size-5 items-center justify-center rounded-full bg-green-300">
                    <CheckIcon className="size-3" />
                  </div>
                </li>
                <li className="flex flex-col justify-center text-center">
                  <div className="mb-1 text-sm">W</div>
                  <div className="flex size-5 items-center justify-center rounded-full bg-green-300">
                    <CheckIcon className="size-3" />
                  </div>
                </li>
                <li className="flex flex-col justify-center text-center">
                  <div className="mb-1 text-sm">T</div>
                  <div className="flex size-5 items-center justify-center rounded-full bg-green-300">
                    <CheckIcon className="size-3" />
                  </div>
                </li>
                <li className="flex flex-col justify-center text-center">
                  <div className="mb-1 text-sm">F</div>
                  <div className="size-5 rounded-full bg-gray-300" />
                </li>
                <li className="flex flex-col justify-center text-center">
                  <div className="mb-1 text-sm">S</div>
                  <div className="size-5 rounded-full bg-gray-300" />
                </li>
                <li className="flex flex-col justify-center text-center">
                  <div className="mb-1 text-sm">S</div>
                  <div className="size-5 rounded-full bg-gray-300" />
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
};

export default ReviewCardsPage;
