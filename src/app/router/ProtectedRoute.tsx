import { Navigate, Outlet } from 'react-router';

import { useAppSelector } from '../store/hooks';

const ProtectedRoute = () => {
  const token = useAppSelector((state) => state.auth.accessToken);

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
