import { useSelector } from 'react-redux';

import type { RootState } from '@/app/store/store';
import { useMeQuery } from '@/features/auth/api/api';

export const useCurrentUser = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken);

  const query = useMeQuery(undefined, {
    skip: !token,
  });

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
  };
};
