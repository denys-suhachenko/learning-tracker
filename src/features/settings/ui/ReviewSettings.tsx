import { useState } from 'react';
import {
  RefreshCwIcon,
  Calendar1Icon,
  StickyNotePlusIcon,
  EyeIcon,
  FastForwardIcon,
  KeyboardIcon,
  FlameIcon,
  InfoIcon,
  CalendarIcon,
  ArrowRightLeftIcon,
} from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { Separator } from '@/shared/ui/separator';
import { Switch } from '@/shared/ui/switch';
import NumberStepper from '@/shared/ui/number-stepper';
import {
  ReviewIntensityRadioGroup,
  type ReviewIntensityType,
} from '@/features/settings/ui/ReviewIntensityRadio';

export const userSettingsFormRules = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^\S+@\S+$/i,
      message: 'Invalid format',
    },
  },
  first_name: {},
  last_name: {},
};

const ReviewSettings = () => {
  const [reviewIntensity, setReviewIntensity] =
    useState<ReviewIntensityType>('balanced');

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-card rounded-md border p-6">
        <h2 className="mb-1 text-lg font-medium">Daily Limits</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Control how many items you review each day
        </p>
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-x-4">
            <Calendar1Icon />
            <div>
              <div className="text-sm font-medium">Daily review limit</div>
              <div className="text-muted-foreground text-xs">
                Maximum number of reviews per day
              </div>
            </div>
          </div>
          <NumberStepper value={20} onChange={() => {}} />
        </div>
        <Separator />
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-x-4">
            <StickyNotePlusIcon />
            <div>
              <div className="text-sm font-medium">New items per day</div>
              <div className="text-muted-foreground text-xs">
                How many new items to learn each day
              </div>
            </div>
          </div>
          <NumberStepper value={20} onChange={() => {}} />
        </div>
      </div>

      <div className="bg-card rounded-md border p-4">
        <h2 className="mb-1 text-lg font-medium">Review Order</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Choose the order of your review items
        </p>
        <RadioGroup defaultValue="weakest">
          <div className="flex items-center gap-3">
            <RadioGroupItem id="weakest" value="weakest" />
            <label htmlFor="weakest">
              <div className="text-sm font-medium">Weakest first</div>
              <div className="text-muted-foreground text-xs">
                Show items you struggle with the most
              </div>
            </label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem id="due" value="due" />
            <label htmlFor="due">
              <div className="text-sm font-medium">Due first</div>
              <div className="text-muted-foreground text-xs">
                Show items that are due for review
              </div>
            </label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem id="random" value="random" />
            <label htmlFor="random">
              <div className="text-sm font-medium">Random</div>
              <div className="text-muted-foreground text-xs">
                Show items in random order
              </div>
            </label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem id="new" value="new" />
            <label htmlFor="new">
              <div className="text-sm font-medium">New first</div>
              <div className="text-muted-foreground text-xs">
                Show new items before reviews
              </div>
            </label>
          </div>
        </RadioGroup>
      </div>

      <div className="bg-card rounded-md border p-4">
        <h2 className="mb-1 text-lg font-medium">Review Behavior</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Customize your review session experience
        </p>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor="short-answer"
              className="flex items-center gap-x-4 select-none"
            >
              <div>
                <EyeIcon />
              </div>
              <div>
                <div className="text-sm font-medium">
                  Show answer automatically
                </div>
                <div className="text-muted-foreground text-xs">
                  Show answer after you rate the difficulty
                </div>
              </div>
            </label>
            <Switch id="short-answer" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <label
              htmlFor="auto-advance"
              className="flex items-center gap-x-4 select-none"
            >
              <div>
                <FastForwardIcon />
              </div>
              <div>
                <div className="text-sm font-medium">
                  Auto-advance after rating
                </div>
                <div className="text-muted-foreground text-xs">
                  Automatically show next item after rating
                </div>
              </div>
            </label>
            <Switch id="auto-advance" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <label
              htmlFor="difficulty"
              className="flex items-center gap-x-4 select-none"
            >
              <div>
                <KeyboardIcon />
              </div>
              <div>
                <div className="text-sm font-medium">Ask for difficulty</div>
                <div className="text-muted-foreground text-xs">
                  Always ask for difficulty rating (Again/Hard/Good/Easy)
                </div>
              </div>
            </label>
            <Switch id="difficulty" />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-md border p-4">
        <h2 className="mb-1 text-lg font-medium">Review Intensity</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Choose how intense your spaced repetition should be
        </p>

        <ReviewIntensityRadioGroup
          defaultValue="balanced"
          value={reviewIntensity}
          onChange={(val) => setReviewIntensity(val)}
        />

        <div className="mt-4 flex flex-nowrap items-center gap-x-2 rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-500">
          <InfoIcon className="size-4" />
          You can change this anytime. It affects how often items appear.
        </div>
      </div>

      <div className="bg-card rounded-md border p-4">
        <h2 className="mb-1 text-lg font-medium">Summary</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Your current review settings
        </p>

        <div className="flex items-center gap-2 text-sm md:gap-4">
          <div className="flex items-center gap-x-2">
            <CalendarIcon />
            <div className="flex flex-col gap-1">
              <span className="font-medium">Daily limit</span>
              <span className="text-muted-foreground text-xs">20 items</span>
            </div>
          </div>
          <Separator orientation="vertical" />
          <div className="flex items-center gap-x-2">
            <StickyNotePlusIcon />
            <div className="flex flex-col gap-1">
              <span className="font-medium">New per day</span>
              <span className="text-muted-foreground text-xs">
                Profile & security
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="hidden md:block" />
          <div className="flex items-center gap-x-2">
            <ArrowRightLeftIcon />
            <div className="hidden flex-col gap-1 md:flex">
              <span className="font-medium">Order</span>
              <span className="text-muted-foreground text-xs">
                Support & docs
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="hidden md:block" />
          <div className="flex items-center gap-x-2">
            <FlameIcon />
            <div className="hidden flex-col gap-1 md:flex">
              <span className="font-medium">Intensity</span>
              <span className="text-muted-foreground text-xs">
                Support & docs
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card flex items-start justify-between rounded-md border p-4">
        <div>
          <h2 className="mb-1 text-lg font-medium">Reset Settings</h2>
          <p className="text-muted-foreground mb-4 text-sm">
            Reset all review settings to default
          </p>
        </div>
        <Button variant="destructive" data-icon="inline-start">
          <RefreshCwIcon /> Reset to default
        </Button>
      </div>
    </div>
  );
};

export default ReviewSettings;
