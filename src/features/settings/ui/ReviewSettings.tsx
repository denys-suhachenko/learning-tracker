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
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/button';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { Separator } from '@/shared/ui/separator';
import { Switch } from '@/shared/ui/switch';
import NumberStepper from '@/shared/ui/number-stepper';
import {
  ReviewIntensityRadioGroup,
  type ReviewIntensityType,
} from '@/features/settings/ui/ReviewIntensityRadio';

const ReviewSettings = () => {
  const [reviewIntensity, setReviewIntensity] =
    useState<ReviewIntensityType>('balanced');

  const { t } = useTranslation('settings', { keyPrefix: 'review' });

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-card rounded-md border p-4">
        <h2 className="mb-1 text-lg font-medium">{t('dailyLimits.header')}</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          {t('dailyLimits.description')}
        </p>
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-x-4">
            <Calendar1Icon />
            <div>
              <div className="text-sm font-medium">
                {t('dailyLimits.options.limit.label')}
              </div>
              <div className="text-muted-foreground text-xs">
                {t('dailyLimits.options.limit.description')}
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
              <div className="text-sm font-medium">
                {t('dailyLimits.options.itemsPerDay.label')}
              </div>
              <div className="text-muted-foreground text-xs">
                {t('dailyLimits.options.itemsPerDay.description')}
              </div>
            </div>
          </div>
          <NumberStepper value={20} onChange={() => {}} />
        </div>
      </div>

      <div className="bg-card rounded-md border p-4">
        <h2 className="mb-1 text-lg font-medium">{t('order.header')}</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          {t('order.description')}
        </p>
        <RadioGroup defaultValue="weakest">
          <div className="flex items-center gap-3">
            <RadioGroupItem id="weakest" value="weakest" />
            <label htmlFor="weakest">
              <div className="text-sm font-medium">
                {t('order.options.weakest.label')}
              </div>
              <div className="text-muted-foreground text-xs">
                {t('order.options.weakest.description')}
              </div>
            </label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem id="due" value="due" />
            <label htmlFor="due">
              <div className="text-sm font-medium">
                {t('order.options.due.label')}
              </div>
              <div className="text-muted-foreground text-xs">
                {t('order.options.due.description')}
              </div>
            </label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem id="random" value="random" />
            <label htmlFor="random">
              <div className="text-sm font-medium">
                {t('order.options.random.label')}
              </div>
              <div className="text-muted-foreground text-xs">
                {t('order.options.random.description')}
              </div>
            </label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem id="new" value="new" />
            <label htmlFor="new">
              <div className="text-sm font-medium">
                {t('order.options.new.label')}
              </div>
              <div className="text-muted-foreground text-xs">
                {t('order.options.random.description')}
              </div>
            </label>
          </div>
        </RadioGroup>
      </div>

      <div className="bg-card rounded-md border p-4">
        <h2 className="mb-1 text-lg font-medium">{t('behavior.header')}</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          {t('behavior.description')}
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
                  {t('behavior.options.showAnswer.label')}
                </div>
                <div className="text-muted-foreground text-xs">
                  {t('behavior.options.showAnswer.description')}
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
                  {t('behavior.options.autoAdvance.label')}
                </div>
                <div className="text-muted-foreground text-xs">
                  {t('behavior.options.autoAdvance.description')}
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
                <div className="text-sm font-medium">
                  {t('behavior.options.askForDifficulty.label')}
                </div>
                <div className="text-muted-foreground text-xs">
                  {t('behavior.options.askForDifficulty.description')}
                </div>
              </div>
            </label>
            <Switch id="difficulty" />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-md border p-4">
        <h2 className="mb-1 text-lg font-medium">{t('intensity.header')}</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          {t('intensity.description')}
        </p>

        <ReviewIntensityRadioGroup
          defaultValue="balanced"
          value={reviewIntensity}
          onChange={(val) => setReviewIntensity(val)}
        />

        <div className="mt-4 flex flex-nowrap items-center gap-x-2 rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-500">
          <InfoIcon className="size-4" />
          {t('intensity.info')}
        </div>
      </div>

      <div className="bg-card rounded-md border p-4">
        <h2 className="mb-1 text-lg font-medium">{t('summary.header')}</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          {t('summary.description')}
        </p>

        <div className="flex items-center gap-2 text-sm md:gap-4">
          <div className="flex items-center gap-x-2">
            <CalendarIcon />
            <div className="flex flex-col gap-1">
              <span className="font-medium">
                {t('summary.options.dailyLimits.label')}
              </span>
              <span className="text-muted-foreground text-xs">
                {t('summary.options.dailyLimits.description')}
              </span>
            </div>
          </div>
          <Separator orientation="vertical" />
          <div className="flex items-center gap-x-2">
            <StickyNotePlusIcon />
            <div className="flex flex-col gap-1">
              <span className="font-medium">
                {t('summary.options.itemsPerDay.label')}
              </span>
              <span className="text-muted-foreground text-xs">
                {t('summary.options.itemsPerDay.description')}
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="hidden md:block" />
          <div className="flex items-center gap-x-2">
            <ArrowRightLeftIcon />
            <div className="hidden flex-col gap-1 md:flex">
              <span className="font-medium">
                {t('summary.options.order.label')}
              </span>
              <span className="text-muted-foreground text-xs">
                {t('summary.options.order.description')}
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="hidden md:block" />
          <div className="flex items-center gap-x-2">
            <FlameIcon />
            <div className="hidden flex-col gap-1 md:flex">
              <span className="font-medium">
                {t('summary.options.intensity.label')}
              </span>
              <span className="text-muted-foreground text-xs">
                {t('summary.options.intensity.description')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card flex items-start justify-between rounded-md border p-4">
        <div>
          <h2 className="mb-1 text-lg font-medium">{t('reset.header')}</h2>
          <p className="text-muted-foreground mb-4 text-sm">
            {t('reset.description')}
          </p>
        </div>
        <Button variant="destructive" data-icon="inline-start">
          <RefreshCwIcon /> {t('reset.action')}
        </Button>
      </div>
    </div>
  );
};

export default ReviewSettings;
