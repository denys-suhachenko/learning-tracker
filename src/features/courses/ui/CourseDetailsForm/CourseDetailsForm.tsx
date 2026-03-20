import { Controller, useForm } from 'react-hook-form';

import {
  Card,
  CardContent,
  CardHeader,
  Input,
  Select,
  Textarea,
} from '@/shared/ui';

import { useGetStudyAreasQuery } from '../../api/api';
import { courseDetailsFormRules } from './courseDetailsFormRules';

type CourseFormValues = {
  title: string;
  slug: string;
  description: string;
  study_area: string;
};

const CourseDetailsForm = () => {
  const { data: studyAreas = [] } = useGetStudyAreasQuery();

  const studyAreasOptions = studyAreas.map((area) => ({
    value: area.id,
    label: area.name,
  }));

  const { register, control } = useForm<CourseFormValues>();

  return (
    <Card>
      <CardHeader bordered>
        <h3 className="font-medium">Course Details</h3>
      </CardHeader>
      <CardContent flush>
        <form className="divide-y divide-gray-200/70 text-sm dark:divide-white/10">
          <div className="flex items-center gap-x-4 px-6 py-4">
            <div className="w-1/5 font-medium">Course title</div>
            <div className="w-4/5">
              <Input
                id="title"
                placeholder="Enter course title"
                autoComplete="off"
                {...register('title', courseDetailsFormRules.title)}
              />
            </div>
          </div>

          <div className="flex items-center gap-x-4 px-6 py-4">
            <div className="w-1/5 font-medium">Course slug</div>
            <div className="w-4/5">
              <Input
                id="slug"
                placeholder="Enter course slug"
                autoComplete="off"
                {...register('slug', courseDetailsFormRules.title)}
              />
            </div>
          </div>

          <div className="flex items-start gap-x-4 px-6 py-4">
            <div className="w-1/5 font-medium">Short description</div>
            <div className="w-4/5">
              <Textarea
                id="description"
                placeholder="Write a description of a course"
                {...register('description', courseDetailsFormRules.description)}
              />
            </div>
          </div>

          <div className="flex items-center gap-x-4 px-6 py-4">
            <div className="w-1/5 font-medium">Study area</div>
            <div className="w-4/5">
              <Controller
                name="study_area"
                control={control}
                rules={courseDetailsFormRules.study_area}
                render={({ field }) => (
                  <Select
                    id="study_area"
                    name={field.name}
                    value={field.value}
                    options={studyAreasOptions}
                    onChange={field.onChange}
                    placeholder="Select study area"
                  />
                )}
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CourseDetailsForm;
