import { useState } from 'react';
import { isAxiosError } from 'axios';
import { UsersApi } from '../api/users.api';
import type { UserRole } from '../types/user';

export function AdminUsersPage(): React.JSX.Element {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'NORMAL_USER' as UserRole,
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      setMessage('');
      setError('');
      setIsSubmitting(true);

      await UsersApi.createUser(form);

      setMessage('User created successfully.');

      setForm({
        name: '',
        email: '',
        password: '',
        address: '',
        role: 'NORMAL_USER',
      });
    } catch (err: unknown) {
      if (isAxiosError(err) && err.response?.data?.message) {
        const msg = err.response.data.message;
        setError(Array.isArray(msg) ? msg.join(' | ') : String(msg));
      } else {
        setError('Failed to create user.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '0 1rem', textAlign: 'left' }}>
      <h1>Manage Users</h1>
      <p style={{ color: '#64748b' }}>Create a new user account with role assignment.</p>

      {message && (
        <div style={{ background: '#dcfce7', color: '#15803d', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '1rem' }}>
          {message}
        </div>
      )}
      {error && (
        <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', color: '#b91c1c', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={(event) => void handleSubmit(event)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.25rem' }}>
            Full Name (20 to 60 characters)
          </label>
          <input
            style={{ width: '100%', padding: '0.6rem', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            placeholder="e.g. Christopher Columbus Smith"
            value={form.name}
            minLength={20}
            maxLength={60}
            required
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
          <small style={{ color: '#64748b' }}>Current length: {form.name.length} / min 20</small>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.25rem' }}>Email</label>
          <input
            type="email"
            style={{ width: '100%', padding: '0.6rem', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            placeholder="user@example.com"
            value={form.email}
            required
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.25rem' }}>
            Password (8-16 chars, 1 uppercase, 1 special char)
          </label>
          <input
            type="password"
            style={{ width: '100%', padding: '0.6rem', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            placeholder="e.g. Secret1234!"
            value={form.password}
            minLength={8}
            maxLength={16}
            required
            onChange={(event) => setForm({ ...form, password: event.target.value })}
          />
          <small style={{ color: '#64748b' }}>Must have 8-16 chars, 1 uppercase letter, 1 special symbol</small>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.25rem' }}>Address (max 400 chars)</label>
          <input
            style={{ width: '100%', padding: '0.6rem', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            placeholder="e.g. 123 Main Street, Suite 100"
            value={form.address}
            maxLength={400}
            required
            onChange={(event) => setForm({ ...form, address: event.target.value })}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.25rem' }}>Role</label>
          <select
            style={{ width: '100%', padding: '0.6rem', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            value={form.role}
            onChange={(event) =>
              setForm({
                ...form,
                role: event.target.value as UserRole,
              })
            }
          >
            <option value="NORMAL_USER">Normal User</option>
            <option value="SYSTEM_ADMIN">System Admin</option>
            <option value="STORE_OWNER">Store Owner</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '0.75rem',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            fontWeight: 600,
            borderRadius: '6px',
            border: 'none',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
          }}
        >
          {isSubmitting ? 'Creating User...' : 'Create User'}
        </button>
      </form>
    </div>
  );
}
