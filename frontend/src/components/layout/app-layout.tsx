import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth/auth-context';

export function AppLayout(): React.JSX.Element {
  const { user, logout } = useAuth();

  return (
    <div>
      <header>
        <nav>
          <Link to="/dashboard">Dashboard</Link>

          {user?.role === 'NORMAL_USER' && (
            <>
              {' | '}
              <Link to="/stores">Stores</Link>
            </>
          )}

          {user?.role === 'SYSTEM_ADMIN' && (
            <>
              {' | '}
              <Link to="/admin/users">Users</Link>
              {' | '}
              <Link to="/admin/stores">Stores</Link>
            </>
          )}

          {user?.role === 'STORE_OWNER' && (
            <>
              {' | '}
              <Link to="/owner">Owner Dashboard</Link>
            </>
          )}
        </nav>

        <div>
          <span>{user?.email}</span>
          {' | '}
          <span>{user?.role}</span>
          {' | '}
          <button type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
