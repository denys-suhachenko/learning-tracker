import { useState } from 'react';
import { RotateCcwIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Button } from '@/shared/ui/button';
import { Switch } from '@/shared/ui/switch';
import { Separator } from '@/shared/ui/separator';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import type { UserAccentColor, UserTheme } from '../model/types';
import { useGetSettingsQuery, useUpdateSettingsMutation } from '../api/api';

import { ThemeSwitcherRadio } from './ThemeSwitherRadio';
import { AccentColorRadio } from './AccentColorRadio';
import { FocusModeRadio, type FocusModeType } from './FocusModeRadio';
import {
  SidebarBehaviorRadio,
  type SidebarBehaviorType,
} from './SidebarBehaviorRadio';

const AppereanceSettings = () => {
  const [focusMode, setFocusMode] = useState<FocusModeType>('comfortable');
  const [sidebarBehavior, setSidebarBehavior] =
    useState<SidebarBehaviorType>('expanded');

  const { t } = useTranslation('settings', { keyPrefix: 'appereance' });

  const { data: userSettings } = useGetSettingsQuery();
  const [updateSettings] = useUpdateSettingsMutation();

  const handleThemeChange = async (theme: UserTheme) => {
    try {
      await updateSettings({
        theme,
      }).unwrap();
      toast.success(`Theme successfully changed to ${theme}`);
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to change theme'));
    }
  };

  const handleAccentChange = async (accent_color: UserAccentColor) => {
    try {
      await updateSettings({
        accent_color,
      }).unwrap();
      toast.success(`Accent color successfully changed to ${accent_color}`);
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to change theme'));
    }
  };

  return (
    <>
      <div className="mb-6 grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-card rounded-md border p-4">
            <h2 className="mb-1 text-lg font-medium">{t('theme.header')}</h2>
            <p className="text-muted-foreground mb-4 text-sm">
              {t('theme.description')}
            </p>
            <ThemeSwitcherRadio
              value={userSettings?.theme ?? 'system'}
              onChange={handleThemeChange}
            />
          </div>

          <div className="bg-card rounded-md border p-4">
            <h2 className="mb-1 text-lg font-medium">
              {t('focusMode.header')}
            </h2>
            <p className="text-muted-foreground mb-4 text-sm">
              {t('focusMode.description')}
            </p>
            <FocusModeRadio
              value={focusMode}
              onChange={(val) => setFocusMode(val)}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-md border p-4">
            <h2 className="mb-1 text-lg font-medium">
              {t('accentColor.header')}
            </h2>
            <p className="text-muted-foreground mb-4 text-sm">
              {t('accentColor.description')}
            </p>
            <AccentColorRadio
              value={userSettings?.accent_color ?? 'cyan'}
              onChange={handleAccentChange}
            />
          </div>

          <div className="bg-card rounded-md border p-4">
            <h2 className="mb-1 text-lg font-medium">{t('sidebar.header')}</h2>
            <p className="text-muted-foreground mb-4 text-sm">
              {t('sidebar.description')}
            </p>
            <div className="space-y-4">
              <SidebarBehaviorRadio
                value={sidebarBehavior}
                onChange={(val) => setSidebarBehavior(val)}
              />
              <Separator />
              <div className="flex items-center justify-between">
                <label htmlFor="animate-sidebar" className="flex-1 select-none">
                  <div className="text-sm font-medium">
                    {t('sidebar.options.animations.label')}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {t('sidebar.options.animations.description')}
                  </div>
                </label>
                <Switch id="animate-sidebar" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-md border border-yellow-300/50 bg-yellow-300/10 p-4">
          <h2 className="mb-1 text-sm font-medium text-yellow-700">
            {t('info.label')}
          </h2>
          <p className="text-muted-foreground mb-4 text-xs">
            {t('info.description')}
          </p>
        </div>

        <div className="bg-card flex items-start justify-between rounded-md border p-4">
          <div>
            <h2 className="mb-1 text-sm font-medium">{t('reset.label')}</h2>
            <p className="text-muted-foreground mb-4 text-xs">
              {t('reset.description')}
            </p>
          </div>
          <Button variant="outline" data-icon="inline-start">
            <RotateCcwIcon /> {t('reset.action')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AppereanceSettings;
