import { useEffect, useState } from 'react';
import { OwnerApi } from '../api/owner.api';
import { getErrorMessage } from '../utils/error';
import { getStoreImage } from '../utils/store-image';
import type { OwnerDashboardData } from '../types/dashboard';

export function OwnerDashboardPage(): React.JSX.Element {
  const [data, setData] = useState<OwnerDashboardData | null>(null);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setIsLoading(true);
        setError('');

        const result = await OwnerApi.getDashboard();
        setData(result);
      } catch (err: unknown) {
        setError(
          getErrorMessage(
            err,
            'Unable to load store dashboard. Please confirm a store has been assigned to your account by an administrator.',
          ),
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadDashboard();
  }, []);

  const filteredRatings =
    data?.ratings.filter((r) => {
      if (!search.trim()) return true;
      const term = search.toLowerCase();
      return r.user.name.toLowerCase().includes(term) || r.user.email.toLowerCase().includes(term);
    }) ?? [];

  return (
    <div className="owner-container">
      <style>{`
        .owner-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1.5rem 3rem 1.5rem;
          width: 100%;
          box-sizing: border-box;
        }

        .header-section {
          margin-bottom: 2rem;
        }

        .portal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #09090b;
          margin: 0 0 0.25rem 0;
          letter-spacing: -0.02em;
        }

        .portal-subtitle {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0;
        }

        .metric-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .store-hero-card {
          position: relative;
          border-radius: 0.75rem;
          overflow: hidden;
          height: 180px;
          margin-bottom: 1.5rem;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
        }

        .store-hero-cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .store-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(9, 9, 11, 0.15) 0%, rgba(9, 9, 11, 0.85) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.5rem;
          color: #ffffff;
        }

        .store-badge {
          display: inline-block;
          align-self: flex-start;
          padding: 0.2rem 0.65rem;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 9999px;
          margin-bottom: 0.4rem;
        }

        .store-hero-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 0.25rem 0;
          letter-spacing: -0.02em;
        }

        .store-hero-details {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.85);
          flex-wrap: wrap;
        }

        .metric-panel {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          padding: 1.25rem;
        }

        .metric-label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
          margin-bottom: 0.35rem;
        }

        .metric-title {
          font-size: 1.15rem;
          font-weight: 600;
          color: #09090b;
          margin: 0 0 0.35rem 0;
          word-break: break-word;
        }

        .metric-meta {
          font-size: 0.8125rem;
          color: #64748b;
          margin: 0;
          word-break: break-word;
        }

        .rating-number {
          font-size: 2rem;
          font-weight: 600;
          color: #09090b;
          letter-spacing: -0.02em;
        }

        .rating-denom {
          font-size: 1rem;
          color: #64748b;
          margin-left: 0.25rem;
          font-weight: normal;
        }

        .reviews-section {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .section-bar {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .section-heading {
          font-size: 1rem;
          font-weight: 600;
          color: #09090b;
          margin: 0;
        }

        .search-input {
          padding: 0.45rem 0.75rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          font-size: 0.8125rem;
          width: 260px;
          outline: none;
          min-height: 38px;
          box-sizing: border-box;
        }

        .search-input:focus {
          border-color: #09090b;
        }

        .reviews-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          min-width: 550px;
        }

        .reviews-table th {
          background: #fafafa;
          padding: 0.65rem 1.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #64748b;
          border-bottom: 1px solid #e2e8f0;
        }

        .reviews-table td {
          padding: 0.85rem 1.25rem;
          font-size: 0.875rem;
          color: #334155;
          border-bottom: 1px solid #f1f5f9;
        }

        .reviews-table tr:hover td {
          background: #fafafa;
        }

        .empty-state {
          padding: 3rem 1rem;
          text-align: center;
          color: #64748b;
          font-size: 0.875rem;
        }

        .error-card {
          padding: 0.75rem 1rem;
          background: #fee2e2;
          color: #991b1b;
          border-radius: 0.375rem;
          font-size: 0.875rem;
        }

        @media (max-width: 640px) {
          .owner-container {
            padding: 1.5rem 1rem 2.5rem 1rem;
          }

          .metric-grid {
            grid-template-columns: 1fr;
          }

          .section-bar {
            flex-direction: column;
            align-items: stretch;
          }

          .search-input {
            width: 100%;
          }
        }
      `}</style>

      <div className="header-section">
        <h1 className="portal-title">Store Owner Dashboard</h1>
        <p className="portal-subtitle">Performance metrics and customer ratings for your store.</p>
      </div>

      {isLoading ? (
        <div className="empty-state">Loading store analytics...</div>
      ) : error ? (
        <div className="error-card">{error}</div>
      ) : data ? (
        <>
          <div className="store-hero-card">
            <img
              src={getStoreImage(data.store.name, data.store.id)}
              alt={data.store.name}
              className="store-hero-cover"
            />
            <div className="store-hero-overlay">
              <span className="store-badge">Your Storefront</span>
              <h2 className="store-hero-name">{data.store.name}</h2>
              <div className="store-hero-details">
                <span>{data.store.email}</span>
                <span>•</span>
                <span>{data.store.address}</span>
              </div>
            </div>
          </div>

          <div className="metric-grid">
            <div className="metric-panel">
              <div
                style={{
                  display: 'flex',
                  gap: '0.85rem',
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                }}
              >
                <img
                  src={getStoreImage(data.store.name, data.store.id)}
                  alt={data.store.name}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '0.5rem',
                    objectFit: 'cover',
                    border: '1px solid #e2e8f0',
                    flexShrink: 0,
                  }}
                />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className="metric-label" style={{ marginBottom: '0.15rem' }}>
                    Store
                  </div>
                  <h2 className="metric-title" style={{ fontSize: '1.05rem', margin: 0 }}>
                    {data.store.name}
                  </h2>
                </div>
              </div>
              <p className="metric-meta">{data.store.email}</p>
              <p className="metric-meta" style={{ marginTop: '0.2rem' }}>
                {data.store.address}
              </p>
            </div>

            <div className="metric-panel">
              <div className="metric-label">Average Rating</div>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span className="rating-number">
                  {data.averageRating !== null ? data.averageRating : '—'}
                </span>
                <span className="rating-denom">/ 5.0</span>
              </div>
              <p className="metric-meta" style={{ marginTop: '0.4rem' }}>
                {data.averageRating !== null
                  ? 'Based on customer reviews'
                  : 'No ratings submitted yet'}
              </p>
            </div>

            <div className="metric-panel">
              <div className="metric-label">Total Reviews</div>
              <div className="rating-number">{data.totalRatings}</div>
              <p className="metric-meta" style={{ marginTop: '0.4rem' }}>
                Customer ratings recorded
              </p>
            </div>
          </div>

          <div className="reviews-section">
            <div className="section-bar">
              <h2 className="section-heading">Customer Ratings ({data.ratings.length})</h2>
              <input
                type="text"
                className="search-input"
                placeholder="Filter by customer name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="reviews-table">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Email Address</th>
                    <th>Rating</th>
                    <th>Submitted On</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRatings.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="empty-state">
                        {search
                          ? `No customer ratings match "${search}".`
                          : 'No customers have rated this store yet.'}
                      </td>
                    </tr>
                  ) : (
                    filteredRatings.map((r) => (
                      <tr key={r.id}>
                        <td style={{ fontWeight: 500, color: '#09090b' }}>{r.user.name}</td>
                        <td style={{ color: '#64748b' }}>{r.user.email}</td>
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
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
