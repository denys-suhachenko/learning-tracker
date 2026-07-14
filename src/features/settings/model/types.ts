import type { Schemas } from '@/shared/api/types';

export type UserSettings = Schemas['UserSettings'];

export type UserLanguage = Schemas['UserSettings']['language'];

export type Timezone =
  | 'UTC'
  | 'Europe/London'
  | 'Europe/Warsaw'
  | 'Europe/Kyiv'
  | 'Europe/Istanbul';

export type UserTheme = NonNullable<Schemas['UserSettings']['theme']>;

export type UserAccentColor = NonNullable<
  Schemas['UserSettings']['accent_color']
>;
