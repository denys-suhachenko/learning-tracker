import { useState } from 'react';
import { RotateCcwIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Switch } from '@/shared/ui/switch';
import { Separator } from '@/shared/ui/separator';
import { useTheme } from '@/shared/hooks';

import { ThemeSwitcherRadio } from './ThemeSwitherRadio';
import { type AccentColor, AccentColorRadio } from './AccentColorRadio';
import { FocusModeRadio, type FocusModeType } from './FocusModeRadio';
import {
  SidebarBehaviorRadio,
  type SidebarBehaviorType,
} from './SidebarBehaviorRadio';

const AppereanceSettings = () => {
  const [accentColor, setAccentColor] = useState<AccentColor>('cyan');
  const [focusMode, setFocusMode] = useState<FocusModeType>('comfortable');
  const [sidebarBehavior, setSidebarBehavior] =
    useState<SidebarBehaviorType>('expanded');

  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="mb-6 grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-card rounded-md border p-4">
            <h2 className="mb-1 text-lg font-medium">Study environment</h2>
            <p className="text-muted-foreground mb-4 text-sm">
              Choose the look that helps you focus and stay productive.
            </p>
            <ThemeSwitcherRadio
              defaultValue="light"
              value={theme}
              onChange={(val) => setTheme(val)}
            />
          </div>

          <div className="bg-card rounded-md border p-4">
            <h2 className="mb-1 text-lg font-medium">Focus mode (density)</h2>
            <p className="text-muted-foreground mb-4 text-sm">
              Adjust how much content is visible on screen.
            </p>
            <FocusModeRadio
              value={focusMode}
              onChange={(val) => setFocusMode(val)}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-md border p-4">
            <h2 className="mb-1 text-lg font-medium">Accent color</h2>
            <p className="text-muted-foreground mb-4 text-sm">
              Pick a color that represents your study journey.
            </p>
            <AccentColorRadio
              value={accentColor}
              onChange={(val) => setAccentColor(val)}
            />
          </div>

          <div className="bg-card rounded-md border p-4">
            <h2 className="mb-1 text-lg font-medium">Sidebar behavior</h2>
            <p className="text-muted-foreground mb-4 text-sm">
              Choose how the sidebar works.
            </p>
            <div className="space-y-4">
              <SidebarBehaviorRadio
                value={sidebarBehavior}
                onChange={(val) => setSidebarBehavior(val)}
              />
              <Separator />
              <div className="flex items-center justify-between">
                <label htmlFor="animate-sidebar" className="flex-1 select-none">
                  <div className="text-sm font-medium">Animations</div>
                  <div className="text-muted-foreground text-xs">
                    Enable subtle animations across the app.
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
            Why personalize?
          </h2>
          <p className="text-muted-foreground mb-4 text-xs">
            A comfortable environment helps your brain focus better, so you can
            learn more in less time.
          </p>
        </div>

        <div className="bg-card flex items-start justify-between rounded-md border p-4">
          <div>
            <h2 className="mb-1 text-sm font-medium">Reset appearance</h2>
            <p className="text-muted-foreground mb-4 text-xs">
              Revert all appenance settings to default.
            </p>
          </div>
          <Button variant="outline" data-icon="inline-start">
            <RotateCcwIcon /> Reset to default
          </Button>
        </div>
      </div>
    </>
  );
};

export default AppereanceSettings;
