import {
  AlbumIcon,
  PaletteIcon,
  BookOpen,
  SparklesIcon,
  BellIcon,
  CircleUserIcon,
} from 'lucide-react';
import { useSearchParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Container } from '@/shared/ui/Container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import ReviewSettings from '@/features/settings/ui/ReviewSettings';
import AccountSettings from '@/features/settings/ui/AccountSettings';
import { PageHeader } from '@/shared/ui';
import AppereanceSettings from '@/features/settings/ui/AppereanceSettings';

const SETTINGS_TABS = [
  'account',
  'appereance',
  'review',
  'learning',
  'ai',
  'notifications',
];

type SettingsTab = (typeof SETTINGS_TABS)[number];

const DEFAULT_TAB: SettingsTab = 'account';

const isSettingsTab = (value: string | null): value is SettingsTab => {
  return SETTINGS_TABS.includes(value as SettingsTab);
};

const SettingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation('settings');

  const tabParam = searchParams.get('tab');

  const activeTab: SettingsTab = isSettingsTab(tabParam)
    ? tabParam
    : DEFAULT_TAB;

  const handleTabChange = (tab: SettingsTab) => {
    setSearchParams({ tab });
  };

  return (
    <Container>
      <PageHeader
        title={t('header.title')}
        description={t('header.description')}
        className="mb-8"
      />

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList variant="line" className="mb-4">
          <TabsTrigger value="account">
            <CircleUserIcon /> {t(`tabs.account`)}
          </TabsTrigger>
          <TabsTrigger value="appereance">
            <PaletteIcon /> {t('tabs.appereance')}
          </TabsTrigger>
          <TabsTrigger value="review">
            <AlbumIcon /> {t('tabs.review')}
          </TabsTrigger>
          <TabsTrigger value="learning" disabled>
            <BookOpen /> {t('tabs.learning')}
          </TabsTrigger>
          <TabsTrigger value="ai" disabled>
            <SparklesIcon /> {t('tabs.ai')}
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            <BellIcon /> {t('tabs.notifications')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <AccountSettings />
        </TabsContent>
        <TabsContent value="appereance">
          <AppereanceSettings />
        </TabsContent>
        <TabsContent value="review">
          <ReviewSettings />
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default SettingsPage;
