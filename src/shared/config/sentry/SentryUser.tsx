import { useEffect } from 'react';
import * as Sentry from '@sentry/react';

import { useCurrentUser } from '../../hooks';
import { env } from '../env';

const isSentryEnable = env.enableSentry && env.sentryDsn;

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
