import {
  BracesIcon,
  EyeIcon,
  FolderBookmarkIcon,
  ImageIcon,
  InfoIcon,
  MessageCircleQuestionMarkIcon,
  WalletCardsIcon,
} from 'lucide-react';

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
import { Container } from '@/shared/layout';

const ReviewCreatePage = () => {
  return (
    <>
      <PageHeader>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl leading-9 font-semibold">
              Create Review Card
            </h1>
            <p className="mt-2 text-base font-medium text-gray-500 dark:text-white/60">
              Add a new card to your deck. Good cards make great reviews.
            </p>
          </div>
        </div>
      </PageHeader>

      <Container>
        <div className="mb-6 flex items-center gap-4">
          <Select defaultValue="biology">
            <SelectTrigger className="w-full max-w-3xs bg-white">
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="biology">Biology</SelectItem>
              <SelectItem value="math">Math</SelectItem>
              <SelectItem value="english">English</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="cell-biology">
            <SelectTrigger className="w-full max-w-3xs bg-white">
              <SelectValue placeholder="Select a deck" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cell-biology">Cell Biology Basics</SelectItem>
              <SelectItem value="calculus">Calculus</SelectItem>
              <SelectItem value="english-past-perfect">
                English Past Perfect Tense
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="basic" className="mb-4">
          <TabsList>
            <TabsTrigger value="basic">
              <WalletCardsIcon /> Basic
            </TabsTrigger>
            <TabsTrigger value="cloze">
              <BracesIcon /> Cloze
            </TabsTrigger>
            <TabsTrigger value="image">
              <ImageIcon /> Image occlusion
            </TabsTrigger>
            <TabsTrigger value="questions">
              <MessageCircleQuestionMarkIcon /> Q&A
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-[3fr_2fr] gap-x-6 overflow-hidden rounded-md bg-white p-6 text-sm shadow-sm dark:bg-gray-800/50 dark:outline dark:outline-white/10">
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="front-side">
                Question / Front side
              </FieldLabel>
              <Textarea
                id="front-side"
                placeholder="Type your front side message here."
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="back-side">Answer / Back side</FieldLabel>
              <Textarea
                id="back-side"
                placeholder="Type your back side message here."
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="hint">Hint / Notes</FieldLabel>
              <Textarea id="hint" placeholder="Type your hint." />
            </Field>
            <Field>
              <FieldLabel>Difficulty</FieldLabel>
              <RadioGroup
                defaultValue="medium"
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
                <Switch id="add-to-review" />
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
              <Button data-icon="inline-start">
                <FolderBookmarkIcon /> Save card
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
                      What is the function of mitochondria in a cell?
                    </div>
                  </div>
                  <Separator />
                  <div className="p-4">
                    <div className="mb-4">
                      <Badge variant="secondary">Back</Badge>
                    </div>
                    <div className="text-[15px] font-medium">
                      Mitochondria are the powerhouse of the cel. They produce
                      ATP (adenosine triphosphate) through cellular respiration,
                      providing energy for various cellular processes.
                    </div>
                  </div>
                </div>

                <div className="text-muted-foreground mt-6 flex items-center gap-x-2 font-medium">
                  <InfoIcon className="size-4" /> This is how your card wil
                  appear during review.
                </div>
              </div>
            </Field>
          </aside>
        </div>
      </Container>
    </>
  );
};

export default ReviewCreatePage;
