import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Input,
  PageHeader,
} from '@/shared/ui';
import { useCurrentUser } from '@/shared/hooks';

type UserSettingsFormValues = {
  email: string;
  first_name: string;
  last_name: string;
};

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

const SettingsPage = () => {
  const { user } = useCurrentUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSettingsFormValues>({
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
    },
  });

  const onSubmit = () => {};

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      });
    }
  }, [user, reset]);

  return (
    <>
      <PageHeader>
        <h2 className="text-2xl font-semibold">Settings</h2>
      </PageHeader>

      <Container>
        <Card>
          <CardHeader bordered>
            <h3 className="font-medium">User settings</h3>
          </CardHeader>

          <CardContent>
            <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <Input
                  id="email"
                  label="Email address"
                  placeholder="Enter your email"
                  autoComplete="off"
                  description={errors.email?.message}
                  {...register('email', userSettingsFormRules.email)}
                />
              </div>

              <div className="flex gap-x-6">
                <div className="w-1/2">
                  <Input
                    id="first_name"
                    label="First name"
                    placeholder="Enter first name"
                    autoComplete="off"
                    {...register(
                      'first_name',
                      userSettingsFormRules.first_name,
                    )}
                  />
                </div>

                <div className="w-1/2">
                  <Input
                    id="last_name"
                    label="Last name"
                    placeholder="Enter last name"
                    autoComplete="off"
                    {...register('last_name', userSettingsFormRules.last_name)}
                  />
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end">
                <Button type="submit">Update</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default SettingsPage;
