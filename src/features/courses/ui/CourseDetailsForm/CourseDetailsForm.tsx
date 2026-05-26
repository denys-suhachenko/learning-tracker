import { Controller, useFormContext } from 'react-hook-form';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/shared/ui/select';

import { useGetStudyAreasQuery } from '../../api/api';
import { Input } from '@/shared/ui/input';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/shared/ui/field';
import { Separator } from '@/shared/ui/separator';
import { Textarea } from '@/shared/ui/textarea';
import type { CreateCourse } from '../../model/types';

const CourseDetailsForm = () => {
  const { data: studyAreas = [] } = useGetStudyAreasQuery();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateCourse>();

  return (
    <div className="bg-card rounded-md border p-4">
      <h2 className="mb-4 text-lg font-medium">Course Details</h2>
      <FieldSet>
        <FieldGroup className="gap-4">
          <Field>
            <FieldLabel htmlFor="title">Course title</FieldLabel>
            <Input
              id="title"
              placeholder="Enter course title"
              {...register('title', {
                required: 'Title is required',
              })}
            />
            {errors.title && <FieldError>{errors.title.message}</FieldError>}
          </Field>

          <Separator />

          <Field>
            <FieldLabel htmlFor="slug">Course slug</FieldLabel>
            <Input
              id="slug"
              placeholder="Enter course slug"
              {...register('slug', {
                required: 'Slug is required',
              })}
            />
            {errors.slug && <FieldError>{errors.slug.message}</FieldError>}
            <FieldDescription>
              A unique URL-friendly identifier (e.g.
              classical-mechanics-fundamentals).
            </FieldDescription>
          </Field>

          <Separator />

          <Field>
            <FieldLabel htmlFor="description">Short description</FieldLabel>
            <Textarea
              id="description"
              placeholder="Write a description of a course"
              {...register('description')}
            />
            <FieldDescription>
              Briefly describe what learners will learn in this course.
            </FieldDescription>
          </Field>

          <Separator />

          <Field className="w-[30%]">
            <FieldLabel htmlFor="study_area">Study area</FieldLabel>
            <Controller
              name="study_area"
              control={control}
              rules={{ required: 'Study area is required' }}
              render={({ field }) => (
                <Select
                  value={field.value ?? ''}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="study_area">
                    <SelectValue placeholder="Select study area" />
                  </SelectTrigger>
                  <SelectContent>
                    {studyAreas.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.study_area && (
              <FieldError>{errors.study_area.message}</FieldError>
            )}
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
};

export default CourseDetailsForm;
