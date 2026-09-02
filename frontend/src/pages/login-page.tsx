import { Link, useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useAuth } from '../features/auth';
import { useDocumentTitle } from '../hooks';
import { useState } from 'react';
import { type FormEvent } from 'react';

export function LoginPage(): React.JSX.Element {
  useDocumentTitle('Login');

  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      setError(null);
      setIsSubmitting(true);

      await login({
        email,
        password,
      });
      navigate('/dashboard');
    } catch (err: unknown) {
      if (isAxiosError(err) && err.response?.data?.message) {
        const msg = err.response.data.message;
        setError(Array.isArray(msg) ? msg.join(', ') : String(msg));
      } else {
        setError('Invalid email or password');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            placeholder="user@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            placeholder="[PASSWORD]"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Login'}
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register Here</Link>
      </p>
    </main>
  );
}
