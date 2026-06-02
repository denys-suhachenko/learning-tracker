import { useState } from 'react';
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

import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import type { Module } from '@/features/courses/model/types';

import type { CreateLesson } from '../../model/types';

type EditorMode = 'edit' | 'preview';

type LessonDetailsFormProps = {
  modules: Module[];
};

const LessonDetailsForm = ({ modules }: LessonDetailsFormProps) => {
  const [editorMode, setEditorMode] = useState<EditorMode>('edit');

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

          <div className="grid grid-cols-2 gap-x-4">
            <Field>
              <FieldLabel htmlFor="estimated_minutes">
                Estimated time (minutes)
              </FieldLabel>
              <Input
                id="estimated_minutes"
                type="number"
                min={1}
                placeholder="0"
                {...register('estimated_minutes', {
                  required: 'Estimated time is required',
                  valueAsNumber: true,
                })}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="module">Module</FieldLabel>
              <Controller
                name="module"
                control={control}
                rules={{ required: 'Module is required' }}
                render={({ field }) => (
                  <Select
                    key={field.value ?? 'empty'}
                    value={field.value ?? ''}
                    disabled={true}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="module">
                      <SelectValue placeholder="Select module" />
                    </SelectTrigger>
                    <SelectContent>
                      {modules.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
          </div>

          <Separator />

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel>Content</FieldLabel>
              <Tabs
                value={editorMode}
                onValueChange={(val) => setEditorMode(val as EditorMode)}
              >
                <TabsList variant="line">
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <NoteEditor
                  value={field.value ?? ''}
                  mode={editorMode}
                  className="border shadow-xs"
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
