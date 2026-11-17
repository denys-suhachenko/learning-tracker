import { useMemo, useState } from 'react';
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
import {
  useGetReviewCardsQuery,
  useGetReviewDecksQuery,
  useGetReviewSummaryQuery,
  useGetReviewTopicsQuery,
} from '@/features/reviews/api/api';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/pagination';

type Tab = 'all' | 'due' | 'new' | 'learning' | 'review' | 'mastered';

const ReviewCardsPage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [topic, setTopic] = useState('all');
  const [deck, setDeck] = useState('all');
  const [tab, setTab] = useState<Tab>('all');
  const [page, setPage] = useState(1);

  const { data: cardsPage } = useGetReviewCardsQuery({
    page,
    search: search || undefined,
    topic: topic === 'all' ? undefined : topic,
    deck: deck === 'all' ? undefined : deck,
    due: tab === 'due' ? true : undefined,
    status: tab !== 'all' && tab !== 'due' ? tab : undefined,
  });
  const cards = cardsPage?.results ?? [];

  const { data: topics = [] } = useGetReviewTopicsQuery();
  const { data: decks = [] } = useGetReviewDecksQuery();
  const { data: summary } = useGetReviewSummaryQuery();

  const availableDecks = useMemo(() => {
    if (topic === 'all') {
      return decks;
    }
    return decks.filter((deck) => deck.topic_id === topic);
  }, [decks, topic]);

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
              <InputGroup className="min-w-3xs">
                <InputGroupInput
                  placeholder="Search cards..."
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                />
                <InputGroupAddon align="inline-end">
                  <SearchIcon />
                </InputGroupAddon>
              </InputGroup>

              <Select
                value={deck}
                onValueChange={(value) => {
                  setDeck(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select a deck" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All decks</SelectItem>

                  {availableDecks.map((deck) => (
                    <SelectItem key={deck.id} value={deck.id}>
                      {deck.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={topic}
                onValueChange={(value) => {
                  setTopic(value);
                  setDeck('all');
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All topics</SelectItem>

                  {topics.map((topic) => (
                    <SelectItem key={topic.id} value={topic.id}>
                      {topic.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button size="lg" variant="ghost" data-icon="inline-end">
              <ListFilterIcon className="size-3" /> Filter
            </Button>
          </div>

          <div className="mb-4">
            <Tabs
              value={tab}
              onValueChange={(value) => {
                setTab(value as Tab);
                setPage(1);
              }}
            >
              <TabsList variant="line">
                <TabsTrigger value="all">All Cards</TabsTrigger>
                <TabsTrigger value="due">Due Today</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="learning">Learning</TabsTrigger>
                <TabsTrigger value="review">Review</TabsTrigger>
                <TabsTrigger value="mastered">Mastered</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div>
            <ReviewsListTable data={cards} />

            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    aria-disabled={!cardsPage?.previous}
                    onClick={(event) => {
                      event.preventDefault();

                      if (cardsPage?.previous) {
                        setPage((current) => Math.max(1, current - 1));
                      }
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    {page}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    aria-disabled={!cardsPage?.next}
                    onClick={(event) => {
                      event.preventDefault();

                      if (cardsPage?.next) {
                        setPage((current) => current + 1);
                      }
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        <aside className="sticky top-6 space-y-6 self-start">
          <ReviewsSummaryCard summary={summary} />
          <StudyStreakCard
            currentStreak={summary?.current_streak ?? 0}
            weekActivity={summary?.week_activity ?? []}
          />
        </aside>
      </div>
    </Container>
  );
};

export default ReviewCardsPage;
