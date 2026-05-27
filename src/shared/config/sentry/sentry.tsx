import * as Sentry from '@sentry/react';

import { env } from '../env';

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
