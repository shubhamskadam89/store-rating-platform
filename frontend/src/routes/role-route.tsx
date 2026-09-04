import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth/auth-context';

type Role = 'NORMAL_USER' | 'SYSTEM_ADMIN' | 'STORE_OWNER';

interface RoleRouteProps {
  allowedRoles: Role[];
}

export function RoleRoute({ allowedRoles }: RoleRouteProps): React.JSX.Element {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
