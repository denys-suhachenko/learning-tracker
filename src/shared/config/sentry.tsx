import * as Sentry from '@sentry/react';

import { useCurrentUser } from '../hooks';

import { env } from './env';
import { useEffect } from 'react';

const isSentryEnable = env.enableSentry && env.sentryDsn;

export const initSentry = () => {
  if (!isSentryEnable) {
    return;
  }

  Sentry.init({
    dsn: env.sentryDsn,
    tracesSampleRate: 0.1,
    release: `${__APP_VERSION__}-${__COMMIT_SHA__}`,
  });
};

export const SentryUser = () => {
  const { user } = useCurrentUser();

  useEffect(() => {
    if (!isSentryEnable) {
      return;
    }

    if (user) {
      Sentry.setUser({
        id: user.id,
        email: user.email,
        username: user.username,
        ip_address: '{{auto}}',
      });
    } else {
      Sentry.setUser(null);
    }
  }, [user]);

  return null;
};
