import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/auth-context';

export function AppLayout(): React.JSX.Element {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer when user navigates
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="app-layout">
      <style>{`
        .app-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #f8fafc;
          width: 100%;
        }

        .app-navbar {
          background-color: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .navbar-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.25rem;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
          transition: opacity 0.15s ease;
        }

        .brand-logo:hover {
          opacity: 0.88;
        }

        .brand-nav-logo {
          height: 36px;
          width: auto;
          max-width: 175px;
          display: block;
          object-fit: contain;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .nav-item {
          padding: 0.45rem 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #64748b;
          text-decoration: none;
          transition: color 0.12s ease, background-color 0.12s ease;
        }

        .nav-item:hover {
          color: #0f172a;
          background-color: #f1f5f9;
        }

        .nav-item.active {
          color: #0f172a;
          background-color: #f1f5f9;
          font-weight: 600;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .user-email {
          font-size: 0.8125rem;
          color: #334155;
          font-weight: 500;
          max-width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .role-pill {
          font-size: 0.6875rem;
          font-weight: 600;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          background-color: #f1f5f9;
          color: #475569;
          border: 1px solid #e2e8f0;
          letter-spacing: 0.02em;
          text-transform: capitalize;
          white-space: nowrap;
        }

        .logout-button {
          padding: 0.4rem 0.85rem;
          font-size: 0.8125rem;
          font-weight: 500;
          border-radius: 0.375rem;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #475569;
          cursor: pointer;
          transition: all 0.12s ease;
          min-height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .logout-button:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #0f172a;
        }

        /* Hamburger button for mobile */
        .hamburger-btn {
          display: none;
          background: transparent;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          padding: 0.4rem 0.5rem;
          cursor: pointer;
          color: #09090b;
          min-height: 38px;
          min-width: 38px;
          align-items: center;
          justify-content: center;
        }

        .hamburger-btn:hover {
          background-color: #f1f5f9;
        }

        /* Mobile drawer */
        .mobile-menu-drawer {
          display: none;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          padding: 1rem 1.25rem 1.25rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
        }

        .mobile-user-card {
          padding: 0.75rem;
          background: #f8fafc;
          border-radius: 0.375rem;
          border: 1px solid #e2e8f0;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin-bottom: 1rem;
        }

        .mobile-nav-link {
          padding: 0.65rem 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.925rem;
          font-weight: 500;
          color: #334155;
          text-decoration: none;
          transition: background-color 0.12s ease;
          display: flex;
          align-items: center;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          background-color: #f1f5f9;
          color: #09090b;
          font-weight: 600;
        }

        .mobile-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding-top: 0.75rem;
          border-top: 1px solid #f1f5f9;
        }

        .mobile-logout-btn {
          width: 100%;
          padding: 0.65rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 0.375rem;
          border: 1px solid #fee2e2;
          background: #fef2f2;
          color: #991b1b;
          cursor: pointer;
          text-align: center;
        }

        .app-main-content {
          flex: 1;
          width: 100%;
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .nav-links,
          .navbar-right {
            display: none;
          }

          .hamburger-btn {
            display: inline-flex;
          }

          .mobile-menu-drawer.open {
            display: block;
          }

          .navbar-container {
            padding: 0 1rem;
          }
        }

        @media (max-width: 480px) {
          .brand-nav-logo {
            height: 30px;
            max-width: 140px;
          }
        }
      `}</style>

      <header className="app-navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <Link to="/dashboard" className="brand-logo" id="nav-brand-logo" aria-label="What They Say">
              <img src="/logo.svg" alt="What They Say" className="brand-nav-logo" />
            </Link>

            <nav className="nav-links">
              <Link
                to="/dashboard"
                className={`nav-item ${location.pathname === '/dashboard' || location.pathname === '/owner' ? 'active' : ''}`}
              >
                Dashboard
              </Link>

              {user?.role === 'NORMAL_USER' && (
                <Link
                  to="/stores"
                  className={`nav-item ${location.pathname === '/stores' ? 'active' : ''}`}
                >
                  Stores
                </Link>
              )}

              {user?.role === 'SYSTEM_ADMIN' && (
                <>
                  <Link
                    to="/admin/users"
                    className={`nav-item ${location.pathname.startsWith('/admin/users') ? 'active' : ''}`}
                  >
                    Users
                  </Link>
                  <Link
                    to="/admin/stores"
                    className={`nav-item ${location.pathname.startsWith('/admin/stores') ? 'active' : ''}`}
                  >
                    Stores
                  </Link>
                </>
              )}
            </nav>
          </div>

          <div className="navbar-right">
            <Link
              to="/update-password"
              className={`nav-item ${location.pathname === '/update-password' ? 'active' : ''}`}
              title="Change Password"
              id="nav-change-password"
            >
              Change Password
            </Link>
            <div className="user-info">
              <span className="user-email" title={user?.email}>
                {user?.email}
              </span>
              <span className="role-pill">{user?.role?.replace('_', ' ').toLowerCase()}</span>
            </div>
            <button type="button" className="logout-button" onClick={logout} id="nav-logout-btn">
              Sign out
            </button>
          </div>

          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            id="nav-mobile-toggle"
          >
            {mobileMenuOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu dropdown drawer */}
        <div
          className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}
          id="nav-mobile-drawer"
        >
          <div className="mobile-user-card">
            <span className="user-email">{user?.email}</span>
            <span className="role-pill">{user?.role?.replace('_', ' ').toLowerCase()}</span>
          </div>

          <nav className="mobile-nav-links">
            <Link
              to="/dashboard"
              className={`mobile-nav-link ${location.pathname === '/dashboard' || location.pathname === '/owner' ? 'active' : ''}`}
            >
              Dashboard
            </Link>

            {user?.role === 'NORMAL_USER' && (
              <Link
                to="/stores"
                className={`mobile-nav-link ${location.pathname === '/stores' ? 'active' : ''}`}
              >
                Stores
              </Link>
            )}

            {user?.role === 'SYSTEM_ADMIN' && (
              <>
                <Link
                  to="/admin/users"
                  className={`mobile-nav-link ${location.pathname.startsWith('/admin/users') ? 'active' : ''}`}
                >
                  Users
                </Link>
                <Link
                  to="/admin/stores"
                  className={`mobile-nav-link ${location.pathname.startsWith('/admin/stores') ? 'active' : ''}`}
                >
                  Stores
                </Link>
              </>
            )}
          </nav>

          <div className="mobile-actions">
            <Link
              to="/update-password"
              className={`mobile-nav-link ${location.pathname === '/update-password' ? 'active' : ''}`}
              id="mobile-nav-change-password"
            >
              Change Password
            </Link>
            <button
              type="button"
              className="mobile-logout-btn"
              onClick={logout}
              id="mobile-nav-logout-btn"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="app-main-content">
        <Outlet />
      </main>
    </div>
  );
}
