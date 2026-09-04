import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UsersApi } from '../api/users.api';
import { StoresApi } from '../api/stores.api';
import { useAuth } from '../features/auth/auth-context';
import type { AdminStats } from '../types/dashboard';
import type { Store } from '../types/store';
import { getStoreImage } from '../utils/store-image';
import { OwnerDashboardPage } from './owner-dashboard-page';

export function DashboardPage(): React.JSX.Element {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoadingStores, setIsLoadingStores] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');

  useEffect(() => {
    if (user?.role === 'SYSTEM_ADMIN') {
      const loadStats = async () => {
        try {
          const data = await UsersApi.getStats();
          setStats(data);
        } catch {
          // Ignored in dashboard summary
        }
      };
      void loadStats();
    } else if (user?.role === 'NORMAL_USER') {
      const loadStores = async () => {
        try {
          setIsLoadingStores(true);
          const data = await StoresApi.getStores();
          setStores(data);
        } catch {
          // Handled gracefully in UI
        } finally {
          setIsLoadingStores(false);
        }
      };
      void loadStores();
    }
  }, [user?.role]);

  // Calculations for regular customers
  const myRatedStores = stores.filter((s) => s.myRating !== null);
  const myAvgRating =
    myRatedStores.length > 0
      ? (
          myRatedStores.reduce((sum, s) => sum + (s.myRating ?? 0), 0) / myRatedStores.length
        ).toFixed(1)
      : null;

  // Top community picks (sorted by overallRating descending)
  const topCommunityPicks = [...stores]
    .sort((a, b) => (b.overallRating ?? 0) - (a.overallRating ?? 0))
    .slice(0, 3);

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/stores?search=${encodeURIComponent(quickSearch.trim())}`);
    } else {
      navigate('/stores');
    }
  };

  if (user?.role === 'STORE_OWNER') {
    return <OwnerDashboardPage />;
  }

  return (
    <div className="dashboard-container">
      <style>{`
        .dashboard-container {
          max-width: 1160px;
          margin: 0 auto;
          padding: 2.25rem 1.5rem 3.5rem;
          width: 100%;
          box-sizing: border-box;
          font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif;
        }

        .dashboard-header {
          margin-bottom: 1.75rem;
        }

        .dashboard-title {
          font-size: 1.55rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 0.35rem 0;
          letter-spacing: -0.02em;
        }

        .dashboard-description {
          font-size: 0.925rem;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }

        /* Metrics & Stats Grid */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .metric-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 1.35rem 1.25rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .metric-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px -4px rgba(15, 23, 42, 0.06);
        }

        .metric-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .metric-value {
          font-size: 1.85rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.025em;
          line-height: 1.1;
          display: flex;
          align-items: baseline;
          gap: 0.35rem;
        }

        .metric-subtext {
          font-size: 0.8125rem;
          color: #94a3b8;
          font-weight: 500;
          margin-top: 0.35rem;
        }

        /* Customer Welcome Banner */
        .customer-welcome-hero {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border-radius: 1rem;
          padding: 2.25rem 2rem;
          color: #ffffff;
          margin-bottom: 2rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 12px 30px -8px rgba(15, 23, 42, 0.25);
        }

        .hero-glow-accent {
          position: absolute;
          top: -40px;
          right: -40px;
          width: 260px;
          height: 260px;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .welcome-hero-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .welcome-title {
          font-size: 1.65rem;
          font-weight: 800;
          letter-spacing: -0.025em;
          margin: 0 0 0.4rem;
          color: #ffffff;
        }

        .welcome-desc {
          font-size: 0.95rem;
          color: #cbd5e1;
          margin: 0;
          max-width: 620px;
          line-height: 1.5;
        }

        .welcome-search-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          max-width: 520px;
          background: #ffffff;
          border-radius: 0.5rem;
          padding: 0.35rem 0.4rem 0.35rem 0.85rem;
        }

        .welcome-search-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 0.9rem;
          color: #0f172a;
          background: transparent;
        }

        .welcome-search-btn {
          background: #0f172a;
          color: #ffffff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.12s ease;
        }

        .welcome-search-btn:hover {
          background: #334155;
        }

        /* Dashboard Section Container */
        .dashboard-section {
          margin-bottom: 2.5rem;
        }

        .section-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.15rem;
        }

        .section-heading {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          letter-spacing: -0.015em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .section-view-all {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #0284c7;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .section-view-all:hover {
          color: #0369a1;
          text-decoration: underline;
        }

        /* Store Mini Cards Grid */
        .mini-stores-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.25rem;
        }

        .mini-store-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.875rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
        }

        .mini-store-card:hover {
          border-color: #cbd5e1;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -4px rgba(15, 23, 42, 0.08);
        }

        .mini-store-thumb {
          width: 100%;
          height: 135px;
          object-fit: cover;
          display: block;
          background: #f1f5f9;
        }

        .mini-card-content {
          padding: 1.15rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: space-between;
        }

        .mini-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 0.35rem;
        }

        .mini-card-name {
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          line-height: 1.35;
        }

        .mini-card-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.2rem 0.5rem;
          background: #fef3c7;
          border: 1px solid #fde68a;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #92400e;
          flex-shrink: 0;
        }

        .mini-card-address {
          font-size: 0.8125rem;
          color: #64748b;
          margin: 0 0 0.85rem;
          line-height: 1.4;
        }

        .mini-card-footer {
          padding-top: 0.75rem;
          border-top: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .my-score-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #059669;
          background: #ecfdf5;
          padding: 0.2rem 0.55rem;
          border-radius: 0.375rem;
          border: 1px solid #d1fae5;
        }

        .btn-card-action {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #0f172a;
          text-decoration: none;
          padding: 0.35rem 0.75rem;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 0.375rem;
          transition: all 0.12s ease;
        }

        .btn-card-action:hover {
          background: #0f172a;
          color: #ffffff;
          border-color: #0f172a;
        }

        .empty-dash-state {
          background: #ffffff;
          border: 1px dashed #cbd5e1;
          border-radius: 0.75rem;
          padding: 2.25rem 1.5rem;
          text-align: center;
          color: #64748b;
        }

        .empty-dash-icon {
          width: 36px;
          height: 36px;
          margin: 0 auto 0.75rem;
          color: #94a3b8;
        }

        .empty-dash-text {
          font-size: 0.925rem;
          margin: 0 0 1rem;
        }

        .btn-empty-action {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 1.15rem;
          background: #0f172a;
          color: #ffffff;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
        }

        .actions-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .btn-action-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #0f172a;
          color: #ffffff;
          padding: 0.6rem 1.25rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.12s ease;
          min-height: 40px;
        }

        .btn-action-primary:hover {
          background: #1e293b;
        }

        .btn-action-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #0f172a;
          padding: 0.6rem 1.25rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.12s ease;
          min-height: 40px;
        }

        .btn-action-outline:hover {
          background: #f8fafc;
          border-color: #94a3b8;
        }

        .user-welcome-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 1.75rem;
          margin-bottom: 1.5rem;
        }

        .user-welcome-meta {
          font-size: 0.875rem;
          color: #64748b;
        }

        @media (max-width: 640px) {
          .dashboard-container {
            padding: 1.5rem 1rem 2.5rem;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .welcome-hero-top {
            flex-direction: column;
          }

          .welcome-search-bar {
            width: 100%;
          }

          .mini-stores-grid {
            grid-template-columns: 1fr;
          }

          .actions-row {
            flex-direction: column;
            width: 100%;
          }

          .btn-action-primary,
          .btn-action-outline {
            width: 100%;
          }
        }
      `}</style>

      {user?.role === 'SYSTEM_ADMIN' ? (
        <>
          <div className="dashboard-header">
            <h1 className="dashboard-title">System Overview</h1>
            <p className="dashboard-description">
              Platform-wide totals and administrative controls.
            </p>
          </div>

          {stats && (
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-label">Total Users</div>
                <div className="metric-value">{stats.users}</div>
                <div className="metric-subtext">Registered platform accounts</div>
              </div>

              <div className="metric-card">
                <div className="metric-label">Total Stores</div>
                <div className="metric-value">{stats.stores}</div>
                <div className="metric-subtext">Active retail listings</div>
              </div>

              <div className="metric-card">
                <div className="metric-label">Total Ratings</div>
                <div className="metric-value">{stats.ratings}</div>
                <div className="metric-subtext">Verified rating submissions</div>
              </div>
            </div>
          )}

          <div className="actions-row">
            <Link to="/admin/users" className="btn-action-primary">
              Manage Users
            </Link>
            <Link to="/admin/stores" className="btn-action-outline">
              Manage Stores
            </Link>
          </div>
        </>
      ) : (
        /* Rich Customer-Centric Dashboard for Normal Users */
        <>
          {/* Welcome Banner with Quick Search */}
          <div className="customer-welcome-hero">
            <div className="hero-glow-accent" aria-hidden="true" />
            <div className="welcome-hero-top">
              <div>
                <h1 className="welcome-title">Welcome to What They Say</h1>
                <p className="welcome-desc">
                  Your community rating dashboard. Discover standout local shops, track your
                  ratings, and guide shoppers with authentic feedback.
                </p>
              </div>
            </div>

            <form onSubmit={handleQuickSearchSubmit} className="welcome-search-bar">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="welcome-search-input"
                placeholder="Search stores by name or location..."
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                aria-label="Search stores"
              />
              <button type="submit" className="welcome-search-btn">
                Find Stores
              </button>
            </form>
          </div>

          {/* Personal Activity & Community Stats */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-label">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>Stores You've Rated</span>
              </div>
              <div className="metric-value">
                <span>{myRatedStores.length}</span>
              </div>
              <div className="metric-subtext">Stores rated by you</div>
            </div>

            <div className="metric-card">
              <div className="metric-label">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="#f59e0b">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Your Avg Score Given</span>
              </div>
              <div className="metric-value">
                <span>{myAvgRating ? `${myAvgRating}` : '—'}</span>
                {myAvgRating && <span style={{ fontSize: '1rem', color: '#f59e0b' }}>★</span>}
              </div>
              <div className="metric-subtext">Based on your submitted ratings</div>
            </div>
          </div>

          {/* Section: Your Rated Stores */}
          <div className="dashboard-section">
            <div className="section-title-row">
              <h2 className="section-heading">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>Stores You've Rated</span>
              </h2>
              {myRatedStores.length > 0 && (
                <Link to="/stores" className="section-view-all">
                  Browse all stores →
                </Link>
              )}
            </div>

            {isLoadingStores ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                Loading your ratings...
              </div>
            ) : myRatedStores.length > 0 ? (
              <div className="mini-stores-grid">
                {myRatedStores.slice(0, 3).map((store) => (
                  <div key={store.id} className="mini-store-card">
                    <img
                      src={getStoreImage(store.name, store.id)}
                      alt={store.name}
                      className="mini-store-thumb"
                      loading="lazy"
                    />
                    <div className="mini-card-content">
                      <div>
                        <div className="mini-card-header">
                          <h3 className="mini-card-name">{store.name}</h3>
                          <span className="mini-card-badge">
                            ★{' '}
                            {store.overallRating !== null
                              ? Number(store.overallRating).toFixed(1)
                              : '—'}
                          </span>
                        </div>
                        <p className="mini-card-address">{store.address}</p>
                      </div>

                      <div className="mini-card-footer">
                        <span className="my-score-pill">Your rating: {store.myRating} / 5</span>
                        <Link to="/stores" className="btn-card-action">
                          Modify
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-dash-state">
                <svg
                  className="empty-dash-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <p className="empty-dash-text">
                  You haven't rated any stores yet. Share your first rating to help shoppers and
                  local businesses!
                </p>
                <Link to="/stores" className="btn-empty-action">
                  Browse &amp; Rate Stores
                </Link>
              </div>
            )}
          </div>

          {/* Section: Top Community Favorites */}
          {topCommunityPicks.length > 0 && (
            <div className="dashboard-section">
              <div className="section-title-row">
                <h2 className="section-heading">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span>Top Community Favorites</span>
                </h2>
                <Link to="/stores?sort=rating-desc" className="section-view-all">
                  See highest rated →
                </Link>
              </div>

              <div className="mini-stores-grid">
                {topCommunityPicks.map((store) => (
                  <div key={store.id} className="mini-store-card">
                    <img
                      src={getStoreImage(store.name, store.id)}
                      alt={store.name}
                      className="mini-store-thumb"
                      loading="lazy"
                    />
                    <div className="mini-card-content">
                      <div>
                        <div className="mini-card-header">
                          <h3 className="mini-card-name">{store.name}</h3>
                          <span className="mini-card-badge">
                            ★{' '}
                            {store.overallRating !== null
                              ? Number(store.overallRating).toFixed(1)
                              : 'Unrated'}
                          </span>
                        </div>
                        <p className="mini-card-address">{store.address}</p>
                      </div>

                      <div className="mini-card-footer">
                        <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                          {store.ratingCount ?? (store.recentRatings?.length || 0)} ratings
                        </span>
                        <Link to="/stores" className="btn-card-action">
                          {store.myRating !== null ? 'View Your Rating' : 'Rate Store'}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Quick Links */}
          <div className="actions-row">
            <Link to="/stores" className="btn-action-primary" id="dashboard-browse-stores-btn">
              Browse All Stores
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
