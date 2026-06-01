import {
  AlbumIcon,
  PaletteIcon,
  BookOpen,
  SparklesIcon,
  BellIcon,
  CircleUserIcon,
} from 'lucide-react';

import { Container } from '@/shared/ui/Container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import ReviewSettings from '@/features/settings/ui/ReviewSettings';
import AccountSettings from '@/features/settings/ui/AccountSettings';
import { PageHeader } from '@/shared/ui';
import AppereanceSettings from '@/features/settings/ui/AppereanceSettings';

const SettingsPage = () => {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Customize your learning experience"
      />

      <Container>
        <Tabs defaultValue="account">
          <TabsList variant="line" className="mb-4">
            <TabsTrigger value="account">
              <CircleUserIcon /> Account
            </TabsTrigger>
            <TabsTrigger value="review">
              <AlbumIcon /> Review
            </TabsTrigger>
            <TabsTrigger value="appereance">
              <PaletteIcon /> Appereance
            </TabsTrigger>
            <TabsTrigger value="learning" disabled>
              <BookOpen /> Learning
            </TabsTrigger>
            <TabsTrigger value="ai" disabled>
              <SparklesIcon /> AI
            </TabsTrigger>
            <TabsTrigger value="notifications" disabled>
              <BellIcon /> Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <AccountSettings />
          </TabsContent>
          <TabsContent value="review">
            <ReviewSettings />
          </TabsContent>
          <TabsContent value="appereance">
            <AppereanceSettings />
          </TabsContent>
        </Tabs>
      </Container>
    </>
  );
};

export default SettingsPage;
