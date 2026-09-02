import { useAuth } from '../features/auth';
import { useDocumentTitle } from '../hooks';

export function DashboardPage(): React.JSX.Element {
  useDocumentTitle('Dashboard');

  const { user, logout } = useAuth();
  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email} </p>
      <p>Role, {user?.role} </p>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </main>
  );
}