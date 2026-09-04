import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth';
import { useDocumentTitle } from '../hooks';
import { getErrorMessage } from '../utils/error';
import { useState, type FormEvent } from 'react';

export function LoginPage(): React.JSX.Element {
  useDocumentTitle('Sign In | What They Say');

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
        email: email.trim(),
        password,
      });
      navigate('/dashboard');
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Invalid email or password.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-canvas">
      <style>{`
        .auth-canvas {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          padding: 2.5rem 1.5rem;
          width: 100%;
          box-sizing: border-box;
        }

        .auth-shell {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          width: 100%;
          max-width: 920px;
          display: flex;
          overflow: hidden;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02);
          box-sizing: border-box;
        }

        .auth-hero-pane {
          flex: 1.1;
          background: #f1f5f9;
          position: relative;
          min-height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .auth-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }

        .auth-form-pane {
          flex: 1;
          padding: 2.75rem 2.25rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #ffffff;
          box-sizing: border-box;
        }

        .auth-brand {
          margin-bottom: 1.75rem;
          text-align: left;
        }

        .brand-header-badge {
          display: inline-block;
          margin-bottom: 1.5rem;
        }

        .brand-full-logo {
          height: 48px;
          width: auto;
          max-width: 230px;
          display: block;
          object-fit: contain;
        }

        .auth-title {
          font-size: 1.35rem;
          font-weight: 600;
          color: #09090b;
          margin: 0 0 0.25rem 0;
          letter-spacing: -0.015em;
        }

        .auth-subtitle {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0;
        }

        .form-group {
          margin-bottom: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .form-label {
          font-size: 0.8125rem;
          font-weight: 500;
          color: #334155;
        }

        .form-input {
          width: 100%;
          padding: 0.55rem 0.75rem;
          border: 1px solid #cbd5e1;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          color: #09090b;
          outline: none;
          box-sizing: border-box;
          min-height: 40px;
          transition: border-color 0.12s;
        }

        .form-input:focus {
          border-color: #09090b;
        }

        .submit-btn {
          width: 100%;
          padding: 0.65rem 1rem;
          background: #09090b;
          color: #ffffff;
          border: none;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          margin-top: 0.5rem;
          min-height: 42px;
          transition: background-color 0.12s;
        }

        .submit-btn:hover:not(:disabled) {
          background: #27272a;
        }

        .submit-btn:disabled {
          background: #f4f4f5;
          color: #a1a1aa;
          cursor: not-allowed;
        }

        .alert-box {
          padding: 0.65rem 0.85rem;
          background: #fee2e2;
          color: #991b1b;
          border-radius: 0.375rem;
          font-size: 0.8125rem;
          margin-bottom: 1rem;
        }

        .auth-footer {
          margin-top: 1.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid #f1f5f9;
          text-align: center;
          font-size: 0.8125rem;
          color: #64748b;
        }

        .auth-footer a {
          color: #09090b;
          font-weight: 500;
          text-decoration: underline;
        }

        @media (max-width: 860px) {
          .auth-shell {
            max-width: 440px;
            flex-direction: column;
          }

          .auth-hero-pane {
            display: none;
          }

          .auth-form-pane {
            padding: 2rem;
          }
        }

        @media (max-width: 480px) {
          .auth-canvas {
            padding: 1.5rem 1rem;
          }

          .auth-form-pane {
            padding: 1.5rem 1.25rem;
          }

          .brand-full-logo {
            height: 40px;
            max-width: 190px;
          }
        }
      `}</style>

      <div className="auth-shell">
        <div className="auth-hero-pane">
          <img
            src="/auth-hero.png"
            alt="What They Say - Better feedback, stronger businesses"
            className="auth-hero-img"
          />
        </div>

        <div className="auth-form-pane">
          <div className="auth-brand">
            <div className="brand-header-badge">
              <img src="/logo.svg" alt="What They Say" className="brand-full-logo" />
            </div>
            <h1 className="auth-title">Sign In</h1>
            <p className="auth-subtitle">Enter your credentials to access your account.</p>
          </div>

          {error && (
            <div className="alert-box" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={(e) => void handleSubmit(e)}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="user@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              id="login-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account? <Link to="/register">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
