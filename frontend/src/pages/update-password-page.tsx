import { useState, type FormEvent } from 'react';
import { AuthApi } from '../api/auth.api';
import { useNotification } from '../features/notifications';
import { getErrorMessage } from '../utils/error';

export function UpdatePasswordPage(): React.JSX.Element {
  const { notifySuccess, notifyError } = useNotification();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Real-time password criteria
  const hasLength = newPassword.length >= 8 && newPassword.length <= 16;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;

  const isFormValid =
    currentPassword.length > 0 &&
    hasLength &&
    hasUppercase &&
    hasSpecial &&
    passwordsMatch;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!isFormValid) {
      setError('Please satisfy all password criteria before submitting.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      await AuthApi.updatePassword({
        currentPassword,
        newPassword,
      });

      notifySuccess('Your password has been updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: unknown) {
      const msg = getErrorMessage(
        err,
        'Failed to update password. Please verify your current password is correct.',
      );
      setError(msg);
      notifyError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="password-container">
      <style>{`
        .password-container {
          max-width: 480px;
          margin: 3rem auto;
          padding: 0 1.5rem;
          width: 100%;
          box-sizing: border-box;
        }

        .password-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          padding: 2rem;
          box-sizing: border-box;
        }

        .password-header {
          margin-bottom: 1.5rem;
        }

        .password-header h1 {
          font-size: 1.35rem;
          font-weight: 600;
          color: #09090b;
          margin: 0 0 0.35rem 0;
          letter-spacing: -0.015em;
        }

        .password-header p {
          color: #64748b;
          font-size: 0.875rem;
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

        .criteria-box {
          background: #fafafa;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          padding: 0.85rem;
          margin: 1.25rem 0;
        }

        .criteria-title {
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 0.5rem;
        }

        .criteria-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .criteria-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.8125rem;
          color: #64748b;
        }

        .criteria-row.valid {
          color: #059669;
          font-weight: 500;
        }

        .criteria-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #cbd5e1;
          flex-shrink: 0;
        }

        .criteria-row.valid .criteria-dot {
          background: #059669;
        }

        .submit-button {
          width: 100%;
          padding: 0.6rem 1rem;
          background: #09090b;
          color: #ffffff;
          font-size: 0.875rem;
          font-weight: 500;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          min-height: 42px;
          transition: background-color 0.12s ease;
        }

        .submit-button:hover:not(:disabled) {
          background: #27272a;
        }

        .submit-button:disabled {
          background: #f4f4f5;
          color: #a1a1aa;
          cursor: not-allowed;
        }

        .error-alert {
          padding: 0.65rem 0.85rem;
          background: #fee2e2;
          color: #991b1b;
          border-radius: 0.375rem;
          font-size: 0.8125rem;
          margin-bottom: 1rem;
        }

        @media (max-width: 480px) {
          .password-container {
            margin: 1.5rem auto;
            padding: 0 1rem;
          }

          .password-card {
            padding: 1.5rem 1.25rem;
          }
        }
      `}</style>

      <div className="password-card">
        <div className="password-header">
          <h1>Update Password</h1>
          <p>Change your account password securely.</p>
        </div>

        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={(e) => void handleSubmit(e)}>
          <div className="form-group">
            <label className="form-label" htmlFor="currentPassword">
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              className="form-input"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="newPassword">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              className="form-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="8 to 16 characters"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              required
            />
          </div>

          <div className="criteria-box">
            <div className="criteria-title">Password Requirements</div>
            <ul className="criteria-list">
              <li className={`criteria-row ${hasLength ? 'valid' : ''}`}>
                <span className="criteria-dot" />
                <span>8 to 16 characters in length</span>
              </li>
              <li className={`criteria-row ${hasUppercase ? 'valid' : ''}`}>
                <span className="criteria-dot" />
                <span>At least one uppercase letter (A-Z)</span>
              </li>
              <li className={`criteria-row ${hasSpecial ? 'valid' : ''}`}>
                <span className="criteria-dot" />
                <span>At least one special character</span>
              </li>
              <li className={`criteria-row ${passwordsMatch ? 'valid' : ''}`}>
                <span className="criteria-dot" />
                <span>Passwords match</span>
              </li>
            </ul>
          </div>

          <button
            type="submit"
            className="submit-button"
            id="update-password-btn"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
