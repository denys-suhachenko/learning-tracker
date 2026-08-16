import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  BracesIcon,
  EyeIcon,
  FolderBookmarkIcon,
  ImageIcon,
  InfoIcon,
  MessageCircleQuestionMarkIcon,
  WalletCardsIcon,
} from 'lucide-react';

import {
  useCreateReviewCardMutation,
  useGetReviewDecksQuery,
  useGetReviewTopicsQuery,
} from '@/features/reviews/api/api';

import { PageHeader } from '@/shared/ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Textarea } from '@/shared/ui/textarea';
import { Field, FieldLabel } from '@/shared/ui/field';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { Switch } from '@/shared/ui/switch';
import { Separator } from '@/shared/ui/separator';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Container } from '@/shared/ui/Container';

const ReviewCreatePage = () => {
  const navigate = useNavigate();

  const [topic, setTopic] = useState('');
  const [deck, setDeck] = useState('');

  const [question, setQuestion] = useState('');
  const [questionDescription, setQuestionDescription] = useState('');

  const [answer, setAnswer] = useState('');
  const [answerDescription, setAnswerDescription] = useState('');

  const [hint, setHint] = useState('');

  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(
    'medium',
  );

  const [reviewNextSession, setReviewNextSession] = useState(false);
  const { data: topics = [] } = useGetReviewTopicsQuery();
  const { data: decks = [] } = useGetReviewDecksQuery();

  const [createReviewCard, { isLoading: isSaving }] =
    useCreateReviewCardMutation();

  const availableDecks = useMemo(() => {
    if (!topic) {
      return [];
    }
    return decks.filter((deck) => deck.topic_id === topic);
  }, [decks, topic]);

  const handleSave = async () => {
    if (!deck || !question.trim() || !answer.trim()) {
      return;
    }

    try {
      await createReviewCard({
        deck_id: deck,
        card_type: 'basic',

        question: question.trim(),
        question_description: questionDescription.trim(),

        answer: answer.trim(),
        answer_description: answerDescription.trim(),

        hint: hint.trim(),

        difficulty,
        review_next_session: reviewNextSession,
      }).unwrap();

      navigate('/review');
    } catch (error) {
      console.error('Failed to create review card:', error);
    }
  };

  return (
    <Container>
      <PageHeader
        title="Create Review Card"
        description="Add a new card to your deck. Good cards make great reviews."
        className="mb-8"
      />

      <div className="mb-6 flex items-center gap-4">
        <Select
          value={topic}
          onValueChange={(value) => {
            setTopic(value);
            setDeck('');
          }}
        >
          <SelectTrigger className="w-full max-w-3xs bg-white">
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>

          <SelectContent>
            {topics.map((topic) => (
              <SelectItem key={topic.id} value={topic.id}>
                {topic.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={deck} onValueChange={setDeck} disabled={!topic}>
          <SelectTrigger className="w-full max-w-3xs bg-white">
            <SelectValue placeholder="Select a deck" />
          </SelectTrigger>

          <SelectContent>
            {availableDecks.map((deck) => (
              <SelectItem key={deck.id} value={deck.id}>
                {deck.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="basic" className="mb-4">
        <TabsList>
          <TabsTrigger value="basic">
            <WalletCardsIcon /> Basic
          </TabsTrigger>
          <TabsTrigger value="cloze" disabled>
            <BracesIcon /> Cloze
          </TabsTrigger>
          <TabsTrigger value="image" disabled>
            <ImageIcon /> Image occlusion
          </TabsTrigger>
          <TabsTrigger value="questions" disabled>
            <MessageCircleQuestionMarkIcon /> Q&A
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-[3fr_2fr] gap-x-6 overflow-hidden rounded-md bg-white p-6 text-sm shadow-sm">
        <div className="space-y-6">
          <Field>
            <FieldLabel htmlFor="front-side">Question / Front side</FieldLabel>
            <Textarea
              id="front-side"
              placeholder="Type your front side message here."
              value={question}
              onChange={(event) => {
                setQuestion(event.target.value);
              }}
            />
            <Textarea
              placeholder="Optional question description..."
              value={questionDescription}
              onChange={(event) => {
                setQuestionDescription(event.target.value);
              }}
              className="mt-3"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="back-side">Answer / Back side</FieldLabel>
            <Textarea
              id="back-side"
              placeholder="Type your back side message here."
              value={answer}
              onChange={(event) => {
                setAnswer(event.target.value);
              }}
            />
            <Textarea
              placeholder="Optional answer description..."
              value={answerDescription}
              onChange={(event) => {
                setAnswerDescription(event.target.value);
              }}
              className="mt-3"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="hint">Hint / Notes</FieldLabel>
            <Textarea
              id="hint"
              placeholder="Type your hint."
              value={hint}
              onChange={(event) => {
                setHint(event.target.value);
              }}
            />
          </Field>
          <Field>
            <FieldLabel>Difficulty</FieldLabel>
            <RadioGroup
              value={difficulty}
              onValueChange={(value) => {
                setDifficulty(value as 'easy' | 'medium' | 'hard');
              }}
              className="flex items-center gap-x-6"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem id="easy" value="easy" />
                <label htmlFor="easy">Easy</label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem id="medium" value="medium" />
                <label htmlFor="medium">Medium</label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem id="hard" value="hard" />
                <label htmlFor="hard">Hard</label>
              </div>
            </RadioGroup>
          </Field>
          <Field>
            <FieldLabel>Add to review queue</FieldLabel>
            <div className="flex items-center space-x-2">
              <Switch
                id="add-to-review"
                checked={reviewNextSession}
                onCheckedChange={setReviewNextSession}
              />
              <label htmlFor="add-to-review">
                Review this card in the next session
              </label>
            </div>
          </Field>
          <Separator />
          <div className="flex items-center justify-between">
            <Button variant="outline" data-icon="inline-start">
              <EyeIcon /> Preview
            </Button>
            <Button
              data-icon="inline-start"
              onClick={handleSave}
              disabled={isSaving || !deck || !question.trim() || !answer.trim()}
            >
              <FolderBookmarkIcon />
              {isSaving ? 'Saving...' : 'Save card'}
            </Button>
          </div>
        </div>

        <aside className="space-y-6">
          <Field>
            <FieldLabel>Live preview</FieldLabel>
            <div className="overflow-hidden rounded-md border bg-gray-50 p-4 shadow-sm">
              <div className="rounded-md border bg-white p-2 shadow-lg">
                <div className="p-4">
                  <div className="mb-4">
                    <Badge>Front</Badge>
                  </div>
                  <div className="text-[15px] font-medium">
                    {question || 'Your question will appear here.'}
                  </div>
                  {questionDescription && (
                    <div className="mt-3 text-sm text-gray-500">
                      {questionDescription}
                    </div>
                  )}
                </div>
                <Separator />
                <div className="p-4">
                  <div className="mb-4">
                    <Badge variant="secondary">Back</Badge>
                  </div>
                  <div className="text-[15px] font-medium">
                    {answer || 'Your answer will appear here.'}
                  </div>
                  {answerDescription && (
                    <div className="mt-3 text-sm text-gray-500">
                      {answerDescription}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-muted-foreground mt-6 flex items-center gap-x-2 font-medium">
                <InfoIcon className="size-4" /> This is how your card wil appear
                during review.
              </div>
            </div>
          </Field>
        </aside>
      </div>
    </Container>
  );
};

export default ReviewCreatePage;
