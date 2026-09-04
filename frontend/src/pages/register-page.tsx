import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth';
import { useNotification } from '../features/notifications';
import { useDocumentTitle } from '../hooks';
import { getErrorMessage } from '../utils/error';

export function RegisterPage(): React.JSX.Element {
  useDocumentTitle('Create Account | What They Say');

  const navigate = useNavigate();
  const { register } = useAuth();
  const { notifySuccess } = useNotification();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field validations
  const isNameValid = name.trim().length >= 20 && name.trim().length <= 60;
  const isAddressValid = address.length > 0 && address.length <= 400;
  const hasLength = password.length >= 8 && password.length <= 16;
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const isPasswordValid = hasLength && hasUppercase && hasSpecial;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!isNameValid) {
      setError('Full Name must be between 20 and 60 characters.');
      return;
    }

    if (!isPasswordValid) {
      setError(
        'Password must be 8-16 characters with at least 1 uppercase letter and 1 special character.',
      );
      return;
    }

    if (!isAddressValid) {
      setError('Address must not exceed 400 characters.');
      return;
    }

    try {
      setError(null);
      setIsSubmitting(true);

      await register({
        name: name.trim(),
        email: email.trim(),
        password,
        address: address.trim(),
      });

      notifySuccess('Account registered successfully. Please sign in with your credentials.');
      navigate('/login');
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Unable to create account. Please try again.'));
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
          max-width: 980px;
          display: flex;
          overflow: hidden;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02);
          box-sizing: border-box;
        }

        .auth-hero-pane {
          flex: 1;
          background: #f1f5f9;
          position: relative;
          min-height: 600px;
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
          flex: 1.2;
          padding: 2.5rem 2.25rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #ffffff;
          box-sizing: border-box;
        }

        .auth-brand {
          margin-bottom: 1.5rem;
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
          margin-bottom: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .form-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #334155;
          flex-wrap: wrap;
        }

        .field-hint {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: normal;
        }

        .field-hint.valid {
          color: #059669;
        }

        .field-hint.error {
          color: #ef4444;
        }

        .form-input, .form-textarea {
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

        .form-input:focus, .form-textarea:focus {
          border-color: #09090b;
        }

        .password-rules {
          background: #fafafa;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          padding: 0.65rem 0.75rem;
          margin-top: 0.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          font-size: 0.75rem;
          color: #64748b;
        }

        .rule-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .rule-row.met {
          color: #059669;
          font-weight: 500;
        }

        .rule-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #cbd5e1;
          flex-shrink: 0;
        }

        .rule-row.met .rule-dot {
          background: #059669;
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
          margin-top: 1.25rem;
          padding-top: 1rem;
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
            max-width: 480px;
            flex-direction: column;
          }

          .auth-hero-pane {
            display: none;
          }

          .auth-form-pane {
            padding: 2rem 1.5rem;
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

          .form-label {
            flex-direction: column;
            gap: 0.15rem;
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
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Register to discover stores and submit reviews.</p>
          </div>

          {error && (
            <div className="alert-box" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={(e) => void handleSubmit(e)}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                <span>Full Name</span>
                <span
                  className={`field-hint ${name.length === 0 ? '' : isNameValid ? 'valid' : 'error'}`}
                >
                  {name.length}/60 (min 20)
                </span>
              </label>
              <input
                id="name"
                type="text"
                className="form-input"
                placeholder="e.g. Jonathan Bartholomew Edwards"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                <span>Email Address</span>
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="user@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="address">
                <span>Address</span>
                <span className="field-hint">{address.length}/400</span>
              </label>
              <textarea
                id="address"
                className="form-textarea"
                rows={2}
                placeholder="Street name, building, apartment, city, and zip code"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                <span>Password</span>
                <span
                  className={`field-hint ${password.length === 0 ? '' : isPasswordValid ? 'valid' : 'error'}`}
                >
                  {isPasswordValid ? 'Satisfies criteria' : '8-16 chars, 1 uppercase, 1 special'}
                </span>
              </label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              <div className="password-rules">
                <div className={`rule-row ${hasLength ? 'met' : ''}`}>
                  <span className="rule-dot" />
                  <span>8 to 16 characters</span>
                </div>
                <div className={`rule-row ${hasUppercase ? 'met' : ''}`}>
                  <span className="rule-dot" />
                  <span>At least one uppercase letter (A-Z)</span>
                </div>
                <div className={`rule-row ${hasSpecial ? 'met' : ''}`}>
                  <span className="rule-dot" />
                  <span>At least one special character (!@#$%^&amp;*)</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="submit-btn"
              id="register-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
