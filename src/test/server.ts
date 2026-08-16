import { setupServer } from 'msw/node';

import { courseHandlers } from '@/features/courses/test/handlers';

export const server = setupServer(...courseHandlers);
