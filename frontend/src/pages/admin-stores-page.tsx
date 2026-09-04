import { useEffect, useState } from 'react';
import { StoresApi } from '../api/stores.api';
import { UsersApi } from '../api/users.api';
import { useNotification } from '../features/notifications';
import { getErrorMessage } from '../utils/error';
import { getStoreImage } from '../utils/store-image';
import type { AdminStore } from '../types/store';
import type { User } from '../types/user';

type SortField = 'name' | 'email' | 'address' | 'rating';
type SortDirection = 'asc' | 'desc';

export function AdminStoresPage(): React.JSX.Element {
  const { notifySuccess, notifyError } = useNotification();
  const [stores, setStores] = useState<AdminStore[]>([]);
  const [storeOwners, setStoreOwners] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Store creation modal state
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    ownerId: '',
  });
  const [createError, setCreateError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadStores = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await StoresApi.getAdminStores(search);
      setStores(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to load stores.'));
    } finally {
      setIsLoading(false);
    }
  };

  const loadOwners = async () => {
    try {
      const owners = await UsersApi.getUsers(undefined, 'STORE_OWNER');
      setStoreOwners(owners);
    } catch {
      // Ignored
    }
  };

  useEffect(() => {
    void loadStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    void loadOwners();
  }, []);

  const handleCreateStore = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (form.address.length > 400) {
      setCreateError('Address must not exceed 400 characters.');
      return;
    }

    try {
      setIsSubmitting(true);
      setCreateError('');

      await StoresApi.createStore({
        name: form.name.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        ownerId: form.ownerId || undefined,
      });

      notifySuccess(`Store "${form.name}" created successfully.`);
      setForm({
        name: '',
        email: '',
        address: '',
        ownerId: '',
      });
      setShowModal(false);

      await loadStores();
    } catch (err: unknown) {
      const msg = getErrorMessage(err, 'Failed to create store.');
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

  const sortedStores = [...stores].sort((a, b) => {
    const first = a[sortField];
    const second = b[sortField];

    if (first === null) return 1;
    if (second === null) return -1;

    const comparison =
      typeof first === 'number' && typeof second === 'number'
        ? first - second
        : String(first).localeCompare(String(second));

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="admin-stores-container">
      <style>{`
        .admin-stores-container {
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
          transition: background-color 0.12s ease;
        }

        .primary-btn:hover {
          background: #27272a;
        }

        .filter-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .search-field {
          flex: 1;
          max-width: 380px;
          padding: 0.5rem 0.8rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          color: #09090b;
          outline: none;
          transition: border-color 0.12s;
        }

        .search-field:focus {
          border-color: #09090b;
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

        .store-identity-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .admin-store-avatar {
          width: 42px;
          height: 42px;
          border-radius: 0.375rem;
          object-fit: cover;
          border: 1px solid #e2e8f0;
          flex-shrink: 0;
          background: #f1f5f9;
        }

        .admin-store-name-text {
          font-weight: 600;
          color: #09090b;
        }

        .rating-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 600;
          font-size: 0.8125rem;
          color: #09090b;
          background: #f4f4f5;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }

        .rating-badge.has-rating {
          background: #fefce8;
          color: #854d0e;
        }

        .owner-chip {
          display: inline-flex;
          flex-direction: column;
          font-size: 0.8125rem;
        }

        .owner-name {
          font-weight: 500;
          color: #09090b;
        }

        .owner-email {
          color: #64748b;
          font-size: 0.75rem;
        }

        .no-owner {
          color: #94a3b8;
          font-style: italic;
          font-size: 0.8125rem;
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
          max-width: 480px;
          padding: 1.75rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
          max-height: 90vh;
          overflow-y: auto;
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

        .close-btn {
          background: none;
          border: none;
          font-size: 1.25rem;
          color: #94a3b8;
          cursor: pointer;
          padding: 0;
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
          display: flex;
          justify-content: space-between;
        }

        .form-input, .form-textarea, .form-select {
          padding: 0.5rem 0.75rem;
          border: 1px solid #cbd5e1;
          border-radius: 0.375rem;
          font-size: 0.875rem;
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
          .admin-stores-container {
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
          <h1 className="page-title">Stores</h1>
          <p className="page-subtitle">Register and manage platform stores.</p>
        </div>

        <button
          type="button"
          className="primary-btn"
          id="open-create-store-modal"
          onClick={() => {
            setCreateError('');
            setShowModal(true);
          }}
        >
          Add Store
        </button>
      </div>

      <div className="filter-row">
        <input
          type="text"
          className="search-field"
          placeholder="Search by name, email, or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="count-tag">
          {stores.length} registered store{stores.length === 1 ? '' : 's'}
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
                    Store Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </button>
                </th>
                <th>
                  <button type="button" className="sort-trigger" onClick={() => handleSort('email')}>
                    Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </button>
                </th>
                <th>
                  <button type="button" className="sort-trigger" onClick={() => handleSort('address')}>
                    Address {sortField === 'address' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </button>
                </th>
                <th>
                  <button type="button" className="sort-trigger" onClick={() => handleSort('rating')}>
                    Rating {sortField === 'rating' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </button>
                </th>
                <th>Assigned Owner</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && stores.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
                    Loading stores...
                  </td>
                </tr>
              ) : sortedStores.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
                    No stores found.
                  </td>
                </tr>
              ) : (
                sortedStores.map((store) => (
                  <tr key={store.id}>
                    <td className="store-title-cell">
                      <div className="store-identity-box">
                        <img
                          src={getStoreImage(store.name, store.id)}
                          alt={store.name}
                          className="admin-store-avatar"
                        />
                        <span className="admin-store-name-text">{store.name}</span>
                      </div>
                    </td>
                    <td style={{ color: '#64748b' }}>{store.email}</td>
                    <td>{store.address}</td>
                    <td>
                      <span className={`score-pill ${store.rating !== null ? 'rated' : ''}`}>
                        {store.rating !== null ? `${store.rating} / 5` : 'No ratings'}
                      </span>
                    </td>
                    <td className="owner-cell">
                      {store.owner ? `${store.owner.name} (${store.owner.email})` : 'Unassigned'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add New Store</h2>
              <button type="button" className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>

            {createError && <div className="error-banner">{createError}</div>}

            <form onSubmit={(e) => void handleCreateStore(e)}>
              <div className="form-group">
                <label className="form-label" htmlFor="store-name-input">
                  Store Name
                </label>
                <input
                  id="store-name-input"
                  className="form-input"
                  placeholder="e.g. Metro Supermarket"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="store-email-input">
                  Store Email
                </label>
                <input
                  id="store-email-input"
                  type="email"
                  className="form-input"
                  placeholder="contact@store.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="store-address-input">
                  <span>Address</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {form.address.length}/400
                  </span>
                </label>
                <textarea
                  id="store-address-input"
                  className="form-textarea"
                  rows={2}
                  maxLength={400}
                  placeholder="Street, City, State, Country"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="store-owner-select">
                  Store Owner (Optional)
                </label>
                <select
                  id="store-owner-select"
                  className="form-select"
                  value={form.ownerId}
                  onChange={(e) => setForm({ ...form, ownerId: e.target.value })}
                >
                  <option value="">None (Unassigned)</option>
                  {storeOwners.map((owner) => (
                    <option key={owner.id} value={owner.id}>
                      {owner.name} ({owner.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="primary-btn"
                  id="submit-create-store"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Store'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
