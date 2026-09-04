import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UsersApi } from '../api/users.api';
import { getErrorMessage } from '../utils/error';
import { getStoreImage } from '../utils/store-image';
import type { UserDetails } from '../types/user';

export function AdminUserDetailsPage(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchUserDetails = async () => {
      try {
        setIsLoading(true);
        setError('');
        const data = await UsersApi.getUserById(id);
        setUser(data);
      } catch (err: unknown) {
        setError(getErrorMessage(err, 'Failed to load user details.'));
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUserDetails();
  }, [id]);

  return (
    <div className="user-details-container">
      <style>{`
        .user-details-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1.5rem 3rem 1.5rem;
          width: 100%;
          box-sizing: border-box;
        }

        .back-nav {
          margin-bottom: 1.5rem;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #475569;
          padding: 0.35rem 0.75rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: all 0.12s ease;
        }

        .back-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #09090b;
        }

        .detail-card {
          background: #ffffff;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
          padding: 1.75rem;
          margin-bottom: 1.5rem;
        }

        .card-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .user-headline h1 {
          margin: 0;
          font-size: 1.35rem;
          font-weight: 600;
          color: #09090b;
          letter-spacing: -0.015em;
        }

        .user-headline p {
          margin: 0.2rem 0 0;
          color: #64748b;
          font-size: 0.875rem;
        }

        .role-pill {
          font-size: 0.6875rem;
          font-weight: 600;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          letter-spacing: 0.02em;
          text-transform: capitalize;
          border: 1px solid #e2e8f0;
          background: #f1f5f9;
          color: #475569;
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

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
          margin-top: 1.25rem;
        }

        .info-cell {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .info-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .info-value {
          font-size: 0.875rem;
          color: #1e293b;
          font-weight: 500;
          word-break: break-word;
        }

        .section-title {
          margin: 0 0 1rem 0;
          font-size: 1.05rem;
          font-weight: 600;
          color: #09090b;
          letter-spacing: -0.01em;
        }

        .store-highlight {
          background: #fafafa;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .store-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .store-title {
          margin: 0;
          font-size: 1.05rem;
          font-weight: 600;
          color: #09090b;
        }

        .store-email {
          margin: 0.15rem 0 0;
          color: #64748b;
          font-size: 0.8125rem;
        }

        .rating-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.55rem;
          background: #fefce8;
          border: 1px solid #fef08a;
          color: #854d0e;
          font-size: 0.8125rem;
          font-weight: 600;
          border-radius: 4px;
        }

        .ratings-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 550px;
        }

        .ratings-table th {
          background: #fafafa;
          color: #64748b;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 0.65rem 0.85rem;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }

        .ratings-table td {
          padding: 0.75rem 0.85rem;
          font-size: 0.875rem;
          color: #334155;
          border-bottom: 1px solid #f1f5f9;
        }

        .empty-box {
          padding: 2.5rem 1rem;
          text-align: center;
          color: #64748b;
          font-size: 0.875rem;
          background: #fafafa;
          border-radius: 0.375rem;
          border: 1px dashed #cbd5e1;
        }

        .error-alert {
          padding: 0.65rem 0.85rem;
          background: #fee2e2;
          color: #991b1b;
          border-radius: 0.375rem;
          margin-bottom: 1rem;
          font-size: 0.875rem;
        }

        @media (max-width: 640px) {
          .user-details-container {
            padding: 1.5rem 1rem 2.5rem 1rem;
          }

          .detail-card {
            padding: 1.25rem 1rem;
          }

          .card-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .store-row {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="back-nav">
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate('/admin/users')}
          id="back-to-users-btn"
        >
          ← Users
        </button>
      </div>

      {error && <div className="error-alert">{error}</div>}

      {isLoading && <div className="empty-box">Loading user account details...</div>}

      {!isLoading && user && (
        <>
          <div className="detail-card">
            <div className="card-header-row">
              <div className="user-headline">
                <h1 id="user-detail-name">{user.name}</h1>
                <p id="user-detail-email">{user.email}</p>
              </div>

              <div>
                <span
                  className={`role-pill ${
                    user.role === 'SYSTEM_ADMIN'
                      ? 'admin'
                      : user.role === 'STORE_OWNER'
                        ? 'owner'
                        : ''
                  }`}
                  id="user-detail-role"
                >
                  {user.role.replace('_', ' ').toLowerCase()}
                </span>
              </div>
            </div>

            <div className="info-grid">
              <div className="info-cell">
                <span className="info-label">User ID</span>
                <span
                  className="info-value"
                  style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}
                >
                  {user.id}
                </span>
              </div>

              <div className="info-cell">
                <span className="info-label">Address</span>
                <span className="info-value">{user.address || '—'}</span>
              </div>

              <div className="info-cell">
                <span className="info-label">Registered On</span>
                <span className="info-value">
                  {new Date(user.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>

          {user.role === 'STORE_OWNER' && (
            <div className="detail-card">
              <h2 className="section-title">Assigned Store</h2>

              {user.ownedStore ? (
                <div className="store-highlight">
                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                    <img
                      src={getStoreImage(user.ownedStore.name, user.ownedStore.id)}
                      alt={user.ownedStore.name}
                      style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '0.5rem',
                        objectFit: 'cover',
                        border: '1px solid #e2e8f0',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="store-row">
                        <div>
                          <h3 className="store-title" id="owned-store-name">
                            {user.ownedStore.name}
                          </h3>
                          <p className="store-email" id="owned-store-email">
                            {user.ownedStore.email}
                          </p>
                        </div>

                        <div className="rating-chip" id="owned-store-rating">
                          <span>
                            {user.ownedStore.rating !== null
                              ? `${user.ownedStore.rating} / 5`
                              : 'No ratings'}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: '#854d0e' }}>
                            ({user.ownedStore.ratingsCount}{' '}
                            {user.ownedStore.ratingsCount === 1 ? 'review' : 'reviews'})
                          </span>
                        </div>
                      </div>

                      <div className="info-cell" style={{ marginTop: '0.5rem' }}>
                        <span className="info-label">Location</span>
                        <span className="info-value">{user.ownedStore.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="empty-box">
                  No store is currently assigned to this store owner account.
                </div>
              )}
            </div>
          )}

          {user.role === 'NORMAL_USER' && (
            <div className="detail-card">
              <h2 className="section-title">Submitted Ratings ({user.ratings.length})</h2>

              {user.ratings.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                  <table className="ratings-table">
                    <thead>
                      <tr>
                        <th>Store</th>
                        <th>Store Email</th>
                        <th>Rating Given</th>
                        <th>Date Submitted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.ratings.map((r) => (
                        <tr key={r.id}>
                          <td style={{ fontWeight: 500, color: '#09090b' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                              <img
                                src={getStoreImage(r.store.name, r.store.id)}
                                alt={r.store.name}
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '0.25rem',
                                  objectFit: 'cover',
                                  border: '1px solid #e2e8f0',
                                  flexShrink: 0,
                                }}
                              />
                              <span>{r.store.name}</span>
                            </div>
                          </td>
                          <td style={{ color: '#64748b' }}>{r.store.email}</td>
                          <td>
                            <span style={{ fontWeight: 600, color: '#09090b' }}>{r.value} / 5</span>
                          </td>
                          <td style={{ color: '#64748b' }}>
                            {new Date(r.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-box">
                  No ratings have been submitted by this user account yet.
                </div>
              )}
            </div>
          )}

          {user.role === 'SYSTEM_ADMIN' && (
            <div className="detail-card">
              <h2 className="section-title">Administrative Permissions</h2>
              <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: '1.5', margin: 0 }}>
                This account has full operator permissions across the What They Say platform,
                including managing stores, users, password management, and viewing platform
                statistics.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
