import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/auth-context';

export function DashboardPage(): React.JSX.Element {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Welcome, {user?.email}</p>
      <p>Role: {user?.role}</p>

      <Link to="/stores">Browse Stores</Link>
    </div>
  );
}
