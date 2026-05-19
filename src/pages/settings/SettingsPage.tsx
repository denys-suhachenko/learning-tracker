import {
  AlbumIcon,
  PaletteIcon,
  BookOpen,
  SparklesIcon,
  BellIcon,
  CircleUserIcon,
} from 'lucide-react';

import { Container } from '@/shared/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import ReviewSettings from '@/features/settings/ui/ReviewSettings';
import AccountSettings from '@/features/settings/ui/AccountSettings';
import { PageHeader } from '@/shared/ui';

const SettingsPage = () => {
  return (
    <>
      <PageHeader>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground mt-2 text-base font-medium">
          Customize your learning experience
        </p>
      </PageHeader>

      <Container>
        <Tabs defaultValue="account">
          <TabsList variant="line" className="mb-4">
            <TabsTrigger value="account">
              <CircleUserIcon /> Account
            </TabsTrigger>
            <TabsTrigger value="review">
              <AlbumIcon /> Review
            </TabsTrigger>
            <TabsTrigger value="appereance" disabled>
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
        </Tabs>
      </Container>
    </>
  );
};

export default SettingsPage;
