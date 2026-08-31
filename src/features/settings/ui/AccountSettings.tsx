import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
import { useUpdateProfileMutation } from '@/features/auth/api/api';
import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { useGetSettingsQuery, useUpdateSettingsMutation } from '../api/api';
import type { UserLanguage } from '../model/types';
import i18n from '@/app/providers/i18n/i18n';

type UserSettingsFormValues = {
  email: string;
  first_name: string;
  last_name: string;
};

const userSettingsFormRules = {
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
  const { data: preferences } = useGetSettingsQuery();
  const { t } = useTranslation('settings', { keyPrefix: 'account' });

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [updateSettings] = useUpdateSettingsMutation();

  const { register, handleSubmit, reset } = useForm<UserSettingsFormValues>({
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
    },
  });

  const handleTimezoneChange = async (timezone: string) => {
    try {
      await updateSettings({
        timezone,
      }).unwrap();
      toast.success('Timezone updated successfully');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to change timezone'));
    }
  };

  const handleLanguageChange = async (language: UserLanguage) => {
    try {
      const updatedSettings = await updateSettings({
        language,
      }).unwrap();

      await i18n.changeLanguage(updatedSettings.language);
      localStorage.setItem('language', updatedSettings.language || 'en');
      toast.success('Language updated successfully');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to change language'));
    }
  };

  const onSubmit = async (data: UserSettingsFormValues) => {
    try {
      await updateProfile({
        first_name: data.first_name,
        last_name: data.last_name,
      }).unwrap();

      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to update profile'));
    }
  };

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
        <h2 className="mb-1 text-lg font-medium">{t('profile.header')}</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          {t('profile.description')}
        </p>

        <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel htmlFor="email">
                {t('profile.email.label')}
              </FieldLabel>
              <Input
                id="email"
                placeholder={t('profile.email.placeholder')}
                autoComplete="off"
                disabled={true}
                {...register('email', userSettingsFormRules.email)}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="first_name">
                  {t('profile.firstName.label')}
                </FieldLabel>
                <Input
                  id="first_name"
                  placeholder={t('profile.firstName.placeholder')}
                  autoComplete="off"
                  {...register('first_name', userSettingsFormRules.first_name)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="last_name">
                  {t('profile.lastName.label')}
                </FieldLabel>
                <Input
                  id="last_name"
                  placeholder={t('profile.lastName.placeholder')}
                  autoComplete="off"
                  {...register('last_name', userSettingsFormRules.last_name)}
                />
              </Field>
            </div>

            <Field orientation="horizontal">
              <Button type="submit" disabled={isUpdating}>
                {t('profile.actions.update')}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>

      <div className="bg-card rounded-md border p-4">
        <h2 className="mb-1 text-lg font-medium">{t('security.header')}</h2>
        <p className="text-muted-foreground text-sm">
          {t('security.description')}
        </p>
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-x-4">
            <LockIcon />
            <div>
              <div className="text-sm font-medium">
                {t('security.password.label')}
              </div>
              <div className="text-muted-foreground text-xs">
                {t('security.password.description', {
                  days: 45,
                })}
              </div>
            </div>
          </div>
          <Button variant="outline">
            {t('security.password.actions.change')}
          </Button>
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
                {t('security.twoAuth.label')}
              </div>
              <div className="text-muted-foreground text-xs">
                {t('security.twoAuth.description')}
              </div>
            </div>
          </label>
          <Switch id="two-factor-auth" />
        </div>
      </div>

      <div className="bg-card rounded-md border p-4">
        <h2 className="mb-1 text-lg font-medium">{t('preferences.header')}</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          {t('preferences.description')}
        </p>
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-x-4">
            <LanguagesIcon />
            <div>
              <div className="text-sm font-medium">
                {t('preferences.language.label')}
              </div>
              <div className="text-muted-foreground text-xs">
                {t('preferences.language.description')}
              </div>
            </div>
          </div>
          <Select
            value={preferences?.language ?? 'en'}
            onValueChange={(value) =>
              handleLanguageChange(value as UserLanguage)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select preferred language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="uk">Українська</SelectItem>
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
              <div className="text-sm font-medium">
                {t('preferences.timezone.label')}
              </div>
              <div className="text-muted-foreground text-xs">
                {t('preferences.timezone.description')}
              </div>
            </div>
          </div>
          <Select
            value={preferences?.timezone ?? 'UTC'}
            onValueChange={handleTimezoneChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UTC">UTC</SelectItem>
              <SelectItem value="Europe/London">Europe/London</SelectItem>
              <SelectItem value="Europe/Warsaw">Europe/Warsaw</SelectItem>
              <SelectItem value="Europe/Kyiv">Europe/Kyiv</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-card rounded-md border p-4">
        <h2 className="mb-1 text-lg font-medium">
          {t('connectedAccounts.header')}
        </h2>
        <p className="text-muted-foreground mb-4 text-sm">
          {t('connectedAccounts.description')}
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
                  {t('connectedAccounts.statuses.connectedDate', {
                    date: 'May 12, 2024',
                  })}
                </p>
              </div>
            </div>
            <Badge className="border border-green-300 bg-green-100 text-green-700">
              {t('connectedAccounts.statuses.connected')}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-muted rounded-md p-2">
                <AppleIcon />
              </div>
              <div>
                <div className="text-sm font-medium">Apple</div>
                <p className="text-muted-foreground text-xs">
                  {t('connectedAccounts.statuses.notConnected')}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              {t('connectedAccounts.actions.connect')}
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-card col-span-2 rounded-md border p-4">
        <h2 className="mb-1 text-lg font-medium text-red-600">
          {t('danger.header')}
        </h2>
        <p className="text-muted-foreground mb-4 text-sm">
          {t('danger.description')}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <div className="rounded-md bg-red-100 p-2 text-red-600">
              <Trash2Icon className="size-6" />
            </div>
            <div>
              <div className="text-sm font-medium">
                {t('danger.delete.label')}
              </div>
              <div className="text-muted-foreground text-xs">
                {t('danger.delete.description')}
              </div>
            </div>
          </div>
          <Button variant="destructive" disabled={true}>
            {t('danger.delete.actions.delete')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
