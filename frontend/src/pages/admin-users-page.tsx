import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsersApi } from '../api/users.api';
import { useNotification } from '../features/notifications';
import { getErrorMessage } from '../utils/error';
import type { CreateUserRequest, User, UserRole } from '../types/user';

type SortField = 'name' | 'email' | 'address' | 'role';
type SortDirection = 'asc' | 'desc';

export function AdminUsersPage(): React.JSX.Element {
  const navigate = useNavigate();
  const { notifySuccess, notifyError } = useNotification();

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState<UserRole | ''>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Create User modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form, setForm] = useState<CreateUserRequest>({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'NORMAL_USER',
  });
  const [createError, setCreateError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await UsersApi.getUsers(search, role || undefined);
      setUsers(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to load users.'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, role]);

  const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (form.name.trim().length < 20 || form.name.trim().length > 60) {
      setCreateError('Full Name must be between 20 and 60 characters.');
      return;
    }

    if (form.password.length < 8 || form.password.length > 16) {
      setCreateError('Password must be between 8 and 16 characters.');
      return;
    }

    if (!/[A-Z]/.test(form.password) || !/[^A-Za-z0-9]/.test(form.password)) {
      setCreateError(
        'Password must contain at least one uppercase letter and one special character.',
      );
      return;
    }

    if (form.address.length > 400) {
      setCreateError('Address must not exceed 400 characters.');
      return;
    }

    try {
      setIsSubmitting(true);
      setCreateError('');

      await UsersApi.createUser({
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
      });

      notifySuccess(`User "${form.name}" created successfully.`);
      setForm({
        name: '',
        email: '',
        password: '',
        address: '',
        role: 'NORMAL_USER',
      });
      setShowCreateModal(false);

      await loadUsers();
    } catch (err: unknown) {
      const msg = getErrorMessage(err, 'Failed to create user account.');
      setCreateError(msg);
      notifyError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSort = (field: SortField): void => {
    if (sortField === field) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortField(field);
    setSortDirection('asc');
  };

  const sortedUsers = [...users].sort((a, b) => {
    const first = (a[sortField] || '').toLowerCase();
    const second = (b[sortField] || '').toLowerCase();

    const comparison = first.localeCompare(second);
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="admin-users-container">
      <style>{`
        .admin-users-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 2rem 1.5rem 3rem 1.5rem;
          width: 100%;
          box-sizing: border-box;
        }

        .header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.75rem;
        }

        .page-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #09090b;
          margin: 0 0 0.25rem 0;
          letter-spacing: -0.02em;
        }

        .page-subtitle {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0;
        }

        .primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #09090b;
          color: #ffffff;
          padding: 0.5rem 0.9rem;
          border-radius: 0.375rem;
          font-size: 0.8125rem;
          font-weight: 500;
          border: none;
          cursor: pointer;
          min-height: 38px;
          transition: background-color 0.12s ease;
        }

        .primary-btn:hover {
          background: #27272a;
        }

        .filter-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }

        .search-field {
          flex: 1;
          min-width: 240px;
          max-width: 380px;
          padding: 0.5rem 0.8rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          color: #09090b;
          outline: none;
          min-height: 38px;
          box-sizing: border-box;
        }

        .search-field:focus {
          border-color: #09090b;
        }

        .select-filter {
          padding: 0.5rem 0.8rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          color: #334155;
          outline: none;
          cursor: pointer;
          min-height: 38px;
        }

        .count-tag {
          font-size: 0.8125rem;
          color: #64748b;
          margin-left: auto;
        }

        .table-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          min-width: 650px;
        }

        .data-table th {
          background: #fafafa;
          padding: 0.65rem 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #64748b;
          border-bottom: 1px solid #e2e8f0;
        }

        .sort-trigger {
          background: none;
          border: none;
          padding: 0;
          font-size: inherit;
          font-weight: inherit;
          text-transform: inherit;
          letter-spacing: inherit;
          color: inherit;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .sort-trigger:hover {
          color: #09090b;
        }

        .data-table td {
          padding: 0.85rem 1rem;
          font-size: 0.875rem;
          color: #334155;
          border-bottom: 1px solid #f1f5f9;
        }

        .data-table tr:hover td {
          background: #fafafa;
        }

        .user-name-link {
          font-weight: 500;
          color: #09090b;
          text-decoration: none;
          cursor: pointer;
        }

        .user-name-link:hover {
          text-decoration: underline;
        }

        .role-pill {
          display: inline-block;
          font-size: 0.6875rem;
          font-weight: 600;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          border: 1px solid #e2e8f0;
          background: #f1f5f9;
          color: #475569;
          letter-spacing: 0.02em;
          text-transform: capitalize;
        }

        .role-pill.admin {
          background: #fef2f2;
          border-color: #fecaca;
          color: #991b1b;
        }

        .role-pill.owner {
          background: #fefce8;
          border-color: #fef08a;
          color: #854d0e;
        }

        .action-link {
          font-size: 0.8125rem;
          font-weight: 500;
          color: #09090b;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 0.3rem 0.65rem;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: all 0.12s ease;
        }

        .action-link:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 1rem;
        }

        .modal-box {
          background: #ffffff;
          border-radius: 0.5rem;
          width: 100%;
          max-width: 500px;
          padding: 1.75rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          max-height: 90vh;
          overflow-y: auto;
          box-sizing: border-box;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .modal-title {
          font-size: 1.15rem;
          font-weight: 600;
          color: #09090b;
          margin: 0;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 1.25rem;
          color: #64748b;
          cursor: pointer;
          line-height: 1;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-label {
          display: block;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #334155;
          margin-bottom: 0.35rem;
        }

        .hint {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: normal;
          float: right;
        }

        .form-input, .form-textarea, .form-select {
          padding: 0.5rem 0.75rem;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          color: #09090b;
          outline: none;
          box-sizing: border-box;
          width: 100%;
        }

        .form-input:focus, .form-textarea:focus, .form-select:focus {
          border-color: #09090b;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }

        .btn-cancel {
          padding: 0.5rem 0.85rem;
          background: #ffffff;
          color: #475569;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
        }

        .error-banner {
          padding: 0.6rem 0.8rem;
          background: #fee2e2;
          color: #991b1b;
          border-radius: 0.375rem;
          font-size: 0.8125rem;
          margin-bottom: 1rem;
        }

        @media (max-width: 640px) {
          .admin-users-container {
            padding: 1.5rem 1rem 2.5rem 1rem;
          }

          .header-row {
            flex-direction: column;
            align-items: stretch;
            gap: 0.85rem;
          }

          .primary-btn {
            width: 100%;
            justify-content: center;
          }

          .filter-row {
            flex-direction: column;
            align-items: stretch;
          }

          .search-field {
            max-width: none;
            width: 100%;
            min-width: 0;
          }

          .select-filter {
            width: 100%;
          }

          .count-tag {
            margin-left: 0;
          }

          .modal-box {
            padding: 1.25rem 1rem;
          }

          .modal-actions {
            flex-direction: column-reverse;
          }

          .modal-actions button {
            width: 100%;
            min-height: 40px;
            justify-content: center;
          }
        }
      `}</style>

      <div className="header-row">
        <div>
          <h1 className="page-title">Users</h1>
          <p className="page-subtitle">Manage platform user accounts and permissions.</p>
        </div>

        <button
          type="button"
          className="primary-btn"
          id="open-create-user-modal"
          onClick={() => {
            setCreateError('');
            setShowCreateModal(true);
          }}
        >
          Add User
        </button>
      </div>

      <div className="filter-row">
        <input
          type="text"
          className="search-field"
          placeholder="Search by name, email, or address..."
          value={search}
          id="user-search-input"
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          className="select-filter"
          value={role}
          id="user-role-filter"
          onChange={(event) => setRole(event.target.value as UserRole | '')}
        >
          <option value="">All Roles</option>
          <option value="NORMAL_USER">Normal User</option>
          <option value="STORE_OWNER">Store Owner</option>
          <option value="SYSTEM_ADMIN">System Admin</option>
        </select>

        <span className="count-tag">
          {users.length} user{users.length === 1 ? '' : 's'}
        </span>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="table-card">
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>
                  <button type="button" className="sort-trigger" onClick={() => handleSort('name')}>
                    Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    className="sort-trigger"
                    onClick={() => handleSort('email')}
                  >
                    Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    className="sort-trigger"
                    onClick={() => handleSort('address')}
                  >
                    Address {sortField === 'address' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </button>
                </th>
                <th>
                  <button type="button" className="sort-trigger" onClick={() => handleSort('role')}>
                    Role {sortField === 'role' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </button>
                </th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && users.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}
                  >
                    Loading users...
                  </td>
                </tr>
              ) : sortedUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}
                  >
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                sortedUsers.map((u) => (
                  <tr key={u.id} id={`user-row-${u.id}`}>
                    <td>
                      <span
                        className="user-name-link"
                        onClick={() => navigate(`/admin/users/${u.id}`)}
                      >
                        {u.name}
                      </span>
                    </td>
                    <td style={{ color: '#64748b' }}>{u.email}</td>
                    <td>{u.address || '—'}</td>
                    <td>
                      <span
                        className={`role-pill ${
                          u.role === 'SYSTEM_ADMIN'
                            ? 'admin'
                            : u.role === 'STORE_OWNER'
                              ? 'owner'
                              : 'user'
                        }`}
                      >
                        {u.role.replace('_', ' ').toLowerCase()}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        className="action-link"
                        id={`view-details-${u.id}`}
                        onClick={() => navigate(`/admin/users/${u.id}`)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Create User Account</h2>
              <button type="button" className="close-btn" onClick={() => setShowCreateModal(false)}>
                ×
              </button>
            </div>

            {createError && <div className="error-banner">{createError}</div>}

            <form onSubmit={(e) => void handleCreateUser(e)}>
              <div className="form-group">
                <label className="form-label" htmlFor="create-user-name">
                  <span>Full Name</span>
                  <span className="hint">{form.name.length}/60 (min 20)</span>
                </label>
                <input
                  id="create-user-name"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Alexander Jonathan Smith"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="create-user-email">
                  Email Address
                </label>
                <input
                  id="create-user-email"
                  type="email"
                  className="form-input"
                  placeholder="user@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="create-user-password">
                  <span>Password</span>
                  <span className="hint">8-16 chars, 1 uppercase, 1 special</span>
                </label>
                <input
                  id="create-user-password"
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="create-user-address">
                  <span>Address</span>
                  <span className="hint">{form.address.length}/400</span>
                </label>
                <textarea
                  id="create-user-address"
                  className="form-textarea"
                  rows={2}
                  maxLength={400}
                  placeholder="Street address, City, Country"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="create-user-role">
                  Role
                </label>
                <select
                  id="create-user-role"
                  className="form-select"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}
                >
                  <option value="NORMAL_USER">Normal User</option>
                  <option value="STORE_OWNER">Store Owner</option>
                  <option value="SYSTEM_ADMIN">System Admin</option>
                </select>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="primary-btn"
                  id="submit-create-user"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
