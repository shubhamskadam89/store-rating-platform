import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useAuth } from '../features/auth';
import { useDocumentTitle } from '../hooks';

export function RegisterPage(): React.JSX.Element {
  useDocumentTitle('Register');

  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      setError(null);
      setIsSubmitting(true);

      await register({
        name,
        email,
        password,
        address,
      });

      navigate('/login');
    } catch (err: unknown) {
      if (isAxiosError(err) && err.response?.data?.message) {
        const msg = err.response.data.message;
        setError(Array.isArray(msg) ? msg.join(', ') : String(msg));
      } else {
        setError('Unable to create account. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name</label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="address">Address</label>

          <textarea
            id="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </main>
  );
}
