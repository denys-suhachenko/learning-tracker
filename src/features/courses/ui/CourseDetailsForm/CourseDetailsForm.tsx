import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('courses', { keyPrefix: 'create.form' });

  return (
    <div className="bg-card rounded-md border p-4">
      <h2 className="mb-4 text-lg font-medium">{t('header')}</h2>
      <FieldSet>
        <FieldGroup className="gap-4">
          <Field>
            <FieldLabel htmlFor="title">{t('title.label')}</FieldLabel>
            <Input
              id="title"
              placeholder={t('title.placeholder')}
              {...register('title', {
                required: 'Title is required',
              })}
            />
            {errors.title && <FieldError>{errors.title.message}</FieldError>}
          </Field>

          <Separator />

          <Field>
            <FieldLabel htmlFor="slug">{t('slug.label')}</FieldLabel>
            <Input
              id="slug"
              placeholder={t('slug.placeholder')}
              {...register('slug', {
                required: 'Slug is required',
              })}
            />
            {errors.slug && <FieldError>{errors.slug.message}</FieldError>}
            <FieldDescription>{t('slug.description')}</FieldDescription>
          </Field>

          <Separator />

          <Field>
            <FieldLabel htmlFor="description">
              {t('description.label')}
            </FieldLabel>
            <Textarea
              id="description"
              placeholder={t('description.placeholder')}
              {...register('description')}
            />
            <FieldDescription>{t('description.description')}</FieldDescription>
          </Field>

          <Separator />

          <Field className="w-[30%]">
            <FieldLabel htmlFor="study_area">{t('studyArea.label')}</FieldLabel>
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
                    <SelectValue placeholder={t('studyArea.placeholder')} />
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
