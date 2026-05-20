import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useCurrentUser } from '@/shared/hooks';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/shared/ui/field';
import {
  ClockIcon,
  LanguagesIcon,
  LockIcon,
  ShieldIcon,
  Trash2Icon,
} from 'lucide-react';
import { Separator } from '@/shared/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Switch } from '@/shared/ui/switch';
import { AppleIcon, GoogleIcon } from '@/shared/icons';
import { Badge } from '@/shared/ui/badge';

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

const AccountSettings = () => {
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
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-card rounded-md border p-4">
        <h2 className="mb-1 text-lg font-medium">Profile Information</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Manage your personal information and profile details.
        </p>

        <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                id="email"
                placeholder="Enter your email"
                autoComplete="off"
                {...register('email', userSettingsFormRules.email)}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>First name</FieldLabel>
                <Input
                  id="first_name"
                  placeholder="Enter first name"
                  autoComplete="off"
                  {...register('first_name', userSettingsFormRules.first_name)}
                />
              </Field>

              <Field>
                <FieldLabel>Last name</FieldLabel>
                <Input
                  id="last_name"
                  placeholder="Enter last name"
                  autoComplete="off"
                  {...register('last_name', userSettingsFormRules.last_name)}
                />
              </Field>
            </div>

            <Field orientation="horizontal">
              <Button type="submit">Update</Button>
            </Field>
          </FieldGroup>
        </form>
      </div>

      <div className="bg-card rounded-md border p-4">
        <h2 className="mb-1 text-lg font-medium">Security</h2>
        <p className="text-muted-foreground text-sm">
          Keep your account secure and protected.
        </p>
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-x-4">
            <LockIcon />
            <div>
              <div className="text-sm font-medium">Password</div>
              <div className="text-muted-foreground text-xs">
                Last changed 45 days ago
              </div>
            </div>
          </div>
          <Button variant="outline">Change Password</Button>
        </div>
        <Separator />
        <div className="flex items-center justify-between py-6">
          <label
            htmlFor="two-factor-auth"
            className="flex items-center gap-x-4"
          >
            <div>
              <ShieldIcon />
            </div>
            <div>
              <div className="text-sm font-medium">
                Two-Factor Authentication
              </div>
              <div className="text-muted-foreground text-xs">
                Add an extra layer of security to your account
              </div>
            </div>
          </label>
          <Switch id="two-factor-auth" />
        </div>
      </div>

      <div className="bg-card rounded-md border p-4">
        <h2 className="mb-1 text-lg font-medium">Preferences</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Customize your account preferences.
        </p>
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-x-4">
            <LanguagesIcon />
            <div>
              <div className="text-sm font-medium">Language</div>
              <div className="text-muted-foreground text-xs">
                Choose your preferred language
              </div>
            </div>
          </div>
          <Select defaultValue="en">
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select preferred language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ua">Українська</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-x-4">
            <div>
              <ClockIcon />
            </div>
            <div>
              <div className="text-sm font-medium">Time Zone</div>
              <div className="text-muted-foreground text-xs">
                Set your local time zone
              </div>
            </div>
          </div>
          <Select defaultValue="eest">
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select your timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="west">
                (UTC+01:00) Western European Summer Time
              </SelectItem>
              <SelectItem value="cest">
                (UTC+02:00) Central European Summer Time
              </SelectItem>
              <SelectItem value="eest">
                (UTC+03:00) Eastern European Summer Time
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-card rounded-md border p-4">
        <h2 className="mb-1 text-lg font-medium">Connected Accounts</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Manage your connected accounts and active sessions.
        </p>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-muted rounded-md p-2">
                <GoogleIcon />
              </div>
              <div>
                <div className="text-sm font-medium">Google</div>
                <p className="text-muted-foreground text-xs">
                  Connected on May 12, 2024
                </p>
              </div>
            </div>
            <Badge className="border border-green-300 bg-green-100 text-green-700">
              Connected
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-muted rounded-md p-2">
                <AppleIcon />
              </div>
              <div>
                <div className="text-sm font-medium">Apple</div>
                <p className="text-muted-foreground text-xs">Not connected</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-card col-span-2 rounded-md border p-4">
        <h2 className="mb-1 text-lg font-medium text-red-600">Danger Zone</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          These actions are permanent and cannot be undone.
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <div className="rounded-md bg-red-100 p-2 text-red-600">
              <Trash2Icon className="size-6" />
            </div>
            <div>
              <div className="text-sm font-medium">Delete Account</div>
              <div className="text-muted-foreground text-xs">
                Permanently delete your account and all of your data.
              </div>
            </div>
          </div>
          <Button variant="destructive">Delete Account</Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
