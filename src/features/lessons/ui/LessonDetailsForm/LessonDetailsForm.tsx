import { Controller, useFormContext } from 'react-hook-form';

import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { NoteEditor } from '@/shared/ui';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/shared/ui/field';
import { Separator } from '@/shared/ui/separator';

import type { CreateLesson } from '../../model/types';

const LessonDetailsForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateLesson>();

  return (
    <div className="bg-card rounded-md border p-4">
      <h2 className="mb-4 text-lg font-medium">Lesson Details</h2>
      <FieldSet>
        <FieldGroup className="gap-4">
          <Field>
            <FieldLabel htmlFor="title">Lesson title</FieldLabel>
            <Input
              id="title"
              placeholder="Enter lesson title"
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && <FieldError>{errors.title.message}</FieldError>}
          </Field>

          <Separator />

          <Field>
            <FieldLabel htmlFor="description">Short description</FieldLabel>
            <Textarea
              id="description"
              placeholder="Briefly describe what this lesson is about"
              {...register('description')}
            />
            <FieldDescription>
              Optional — appears on the lesson card in the module.
            </FieldDescription>
          </Field>

          <Separator />

          <Field className="w-[30%]">
            <FieldLabel htmlFor="estimated_minutes">
              Estimated time (minutes)
            </FieldLabel>
            <Input
              id="estimated_minutes"
              type="number"
              min={1}
              placeholder="15"
              {...register('estimated_minutes', { valueAsNumber: true })}
            />
          </Field>

          <Separator />

          <Field>
            <FieldLabel>Content</FieldLabel>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <NoteEditor
                  value={field.value ?? ''}
                  onChange={field.onChange}
                />
              )}
            />
            <FieldDescription>
              Use Markdown. Math formulas supported with $...$ and $$...$$.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
};

export default LessonDetailsForm;
