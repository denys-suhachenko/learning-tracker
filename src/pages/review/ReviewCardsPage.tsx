import { useNavigate } from 'react-router';
import { ListFilterIcon, PlusIcon, SearchIcon } from 'lucide-react';

import { PageHeader } from '@/shared/ui/PageHeader';
import { Container } from '@/shared/ui/Container';
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

import ReviewsListTable from '@/features/reviews/ui/ReviewsTable/ReviewsListTable';
import ReviewsSummaryCard from '@/features/reviews/ui/ReviewsSummaryCard';
import StudyStreakCard from '@/features/reviews/ui/StudyStreakCard';

const ReviewCardsPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <PageHeader
        title="Cards & Due Today"
        description="Overview of your cards and what's due for review."
        className="mb-8"
        actions={
          <Button
            data-icon="inline-start"
            onClick={() => navigate('/review/create')}
          >
            <PlusIcon className="size-4" /> New Card
          </Button>
        }
      />

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

            <Button size="lg" variant="ghost" data-icon="inline-end">
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
          <ReviewsSummaryCard />
          <StudyStreakCard />
        </aside>
      </div>
    </Container>
  );
};

export default ReviewCardsPage;
