import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/auth-context';
import { useDocumentTitle } from '../hooks/use-document-title';

export function LandingPage(): React.JSX.Element {
  useDocumentTitle('Real Feedback. Stronger Businesses.');
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="landing-root">
      <style>{`
        .landing-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          color: #0f172a;
          font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif;
          overflow-x: hidden;
        }

        /* Ambient Glow Backdrops */
        .ambient-glow-top {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1000px;
          height: 520px;
          background: radial-gradient(circle at 50% 20%, rgba(226, 232, 240, 0.6) 0%, rgba(248, 250, 252, 0) 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* Header / Navigation */
        .landing-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
        }

        .landing-nav-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .landing-brand {
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: opacity 0.15s ease;
        }

        .landing-brand:hover {
          opacity: 0.88;
        }

        .landing-brand-logo {
          height: 38px;
          width: auto;
          max-width: 180px;
          display: block;
          object-fit: contain;
        }

        .nav-center-links {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-center-link {
          color: #475569;
          font-size: 0.925rem;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .nav-center-link:hover {
          color: #0f172a;
        }

        .nav-action-buttons {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .btn-nav-outline {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #0f172a;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .btn-nav-outline:hover {
          background: #f8fafc;
          border-color: #94a3b8;
        }

        .btn-nav-primary {
          padding: 0.5rem 1.15rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #ffffff;
          background: #0f172a;
          border: 1px solid #0f172a;
          text-decoration: none;
          box-shadow: 0 1px 2px rgba(15, 23, 42, 0.12);
          transition: all 0.15s ease;
        }

        .btn-nav-primary:hover {
          background: #1e293b;
          border-color: #1e293b;
          transform: translateY(-1px);
        }

        .mobile-toggle-btn {
          display: none;
          background: none;
          border: none;
          color: #0f172a;
          cursor: pointer;
          padding: 0.5rem;
        }

        /* Mobile Drawer */
        .landing-mobile-drawer {
          display: none;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          padding: 1.25rem 1.5rem 1.75rem;
        }

        .landing-mobile-drawer.open {
          display: block;
        }

        .mobile-drawer-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .mobile-drawer-link {
          font-size: 1rem;
          font-weight: 600;
          color: #334155;
          text-decoration: none;
        }

        .mobile-drawer-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        /* Main Content */
        main {
          flex: 1;
          position: relative;
          z-index: 1;
        }

        /* Hero Section */
        .hero-section {
          padding: 4.5rem 1.5rem 3.5rem;
          max-width: 1240px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-badge-wrap {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 0.875rem;
          border-radius: 9999px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #334155;
          margin-bottom: 1.5rem;
        }

        .hero-badge-icon {
          width: 16px;
          height: 16px;
          color: #0f172a;
        }

        .hero-headline {
          font-size: 3.5rem;
          line-height: 1.12;
          font-weight: 800;
          letter-spacing: -0.035em;
          color: #0f172a;
          max-width: 820px;
          margin: 0 auto 1.25rem;
        }

        .hero-headline-gradient {
          background: linear-gradient(135deg, #0f172a 0%, #334155 50%, #0284c7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-description {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #64748b;
          max-width: 680px;
          margin: 0 auto 2.25rem;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2.25rem;
          flex-wrap: wrap;
        }

        .btn-hero-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 1.75rem;
          border-radius: 0.625rem;
          font-size: 1rem;
          font-weight: 700;
          color: #ffffff;
          background: #0f172a;
          border: 1px solid #0f172a;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.2);
          transition: all 0.2s ease;
        }

        .btn-hero-primary:hover {
          background: #1e293b;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(15, 23, 42, 0.25);
        }

        .btn-hero-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 1.6rem;
          border-radius: 0.625rem;
          font-size: 1rem;
          font-weight: 600;
          color: #0f172a;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-hero-secondary:hover {
          background: #f1f5f9;
          border-color: #94a3b8;
          transform: translateY(-2px);
        }

        .hero-trust-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.75rem;
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
          flex-wrap: wrap;
          margin-bottom: 3.5rem;
        }

        .hero-trust-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .hero-trust-icon {
          width: 16px;
          height: 16px;
          color: #10b981;
          flex-shrink: 0;
        }

        /* Hero Image Showcase Frame */
        .hero-showcase-container {
          position: relative;
          max-width: 1120px;
          margin: 0 auto;
        }

        .hero-showcase-backdrop {
          position: absolute;
          top: -20px;
          left: 5%;
          right: 5%;
          bottom: 20px;
          background: radial-gradient(ellipse at top, rgba(15, 23, 42, 0.15) 0%, rgba(51, 65, 85, 0.05) 50%, transparent 70%);
          filter: blur(40px);
          z-index: 0;
        }

        .hero-browser-mockup {
          position: relative;
          z-index: 1;
          background: #ffffff;
          border-radius: 1rem;
          border: 1px solid #e2e8f0;
          box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(15, 23, 42, 0.05);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hero-browser-mockup:hover {
          box-shadow: 0 30px 70px -15px rgba(15, 23, 42, 0.3), 0 0 0 1px rgba(15, 23, 42, 0.08);
        }

        .browser-mockup-header {
          height: 38px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          padding: 0 1rem;
          gap: 0.4rem;
        }

        .mockup-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .mockup-dot.red { background: #f87171; }
        .mockup-dot.yellow { background: #fbbf24; }
        .mockup-dot.green { background: #34d399; }

        .mockup-url-bar {
          margin-left: 0.75rem;
          flex: 1;
          max-width: 320px;
          height: 22px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          display: flex;
          align-items: center;
          padding: 0 0.5rem;
          font-size: 0.6875rem;
          color: #64748b;
          font-family: monospace;
        }

        .hero-image {
          width: 100%;
          height: auto;
          display: block;
          aspect-ratio: 1536 / 1024;
          object-fit: cover;
          object-position: top;
        }

        /* Stats Strip */
        .stats-strip-section {
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
          padding: 3rem 1.5rem;
          margin-top: 4rem;
        }

        .stats-grid {
          max-width: 1120px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          text-align: center;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-value {
          font-size: 2.25rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 0.35rem;
        }

        .stat-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Features Section */
        .features-section {
          padding: 5.5rem 1.5rem;
          max-width: 1240px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 3.5rem;
        }

        .section-pill {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          color: #1e40af;
          font-size: 0.8125rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 0.75rem;
        }

        .section-title {
          font-size: 2.4rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #0f172a;
          margin: 0 0 1rem;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }

        .feature-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.875rem;
          padding: 2rem;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
        }

        .feature-card:hover {
          border-color: #cbd5e1;
          transform: translateY(-4px);
          box-shadow: 0 12px 28px -6px rgba(15, 23, 42, 0.08);
        }

        .feature-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 0.625rem;
          background: #0f172a;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .feature-icon-wrap svg {
          width: 22px;
          height: 22px;
        }

        .feature-card-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 0.5rem;
        }

        .feature-card-text {
          font-size: 0.9375rem;
          line-height: 1.55;
          color: #64748b;
          margin: 0;
        }

        /* How It Works Section */
        .how-section {
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
          padding: 5.5rem 1.5rem;
        }

        .how-container {
          max-width: 1120px;
          margin: 0 auto;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          position: relative;
        }

        .step-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.875rem;
          padding: 2rem 1.75rem;
          position: relative;
        }

        .step-number-badge {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          color: #0f172a;
          font-size: 0.95rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .step-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 0.5rem;
        }

        .step-desc {
          font-size: 0.9rem;
          color: #64748b;
          line-height: 1.55;
          margin: 0;
        }

        /* Role Breakdown Section */
        .roles-section {
          padding: 5.5rem 1.5rem;
          max-width: 1240px;
          margin: 0 auto;
        }

        .roles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .role-card {
          border-radius: 1rem;
          border: 1px solid #e2e8f0;
          padding: 2.25rem 2rem;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.2s ease;
        }

        .role-card:hover {
          border-color: #94a3b8;
          box-shadow: 0 16px 36px -8px rgba(15, 23, 42, 0.09);
        }

        .role-header {
          margin-bottom: 1.5rem;
        }

        .role-tag {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0.2rem 0.6rem;
          border-radius: 0.375rem;
          margin-bottom: 0.75rem;
        }

        .role-tag.user { background: #eff6ff; color: #1e40af; }
        .role-tag.owner { background: #ecfdf5; color: #065f46; }
        .role-tag.admin { background: #fdf4ff; color: #86198f; }

        .role-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 0.5rem;
        }

        .role-summary {
          font-size: 0.925rem;
          color: #64748b;
          line-height: 1.5;
          margin: 0;
        }

        .role-feature-list {
          list-style: none;
          padding: 0;
          margin: 1.5rem 0 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .role-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #334155;
          line-height: 1.4;
        }

        .role-feature-icon {
          width: 16px;
          height: 16px;
          color: #0f172a;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .role-cta-btn {
          display: block;
          text-align: center;
          padding: 0.7rem 1.25rem;
          border-radius: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          background: #f1f5f9;
          color: #0f172a;
          border: 1px solid #cbd5e1;
          transition: all 0.15s ease;
        }

        .role-cta-btn:hover {
          background: #0f172a;
          color: #ffffff;
          border-color: #0f172a;
        }

        /* Final CTA Banner */
        .cta-banner-section {
          padding: 4.5rem 1.5rem;
          max-width: 1240px;
          margin: 0 auto 3rem;
          width: 100%;
          box-sizing: border-box;
        }

        .cta-banner-inner {
          background: #0f172a;
          border-radius: 1.25rem;
          padding: 3.5rem 2.5rem;
          text-align: center;
          color: #ffffff;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.3);
        }

        .cta-banner-glow {
          position: absolute;
          top: -50%;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 300px;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .cta-banner-title {
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: -0.025em;
          margin: 0 0 1rem;
          color: #ffffff;
        }

        .cta-banner-desc {
          font-size: 1.1rem;
          color: #94a3b8;
          max-width: 600px;
          margin: 0 auto 2rem;
          line-height: 1.55;
        }

        .btn-banner-action {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 2rem;
          border-radius: 0.625rem;
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
          background: #ffffff;
          border: 1px solid #ffffff;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }

        .btn-banner-action:hover {
          background: #f8fafc;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
        }

        /* Footer */
        .landing-footer {
          background: #ffffff;
          border-top: 1px solid #e2e8f0;
          padding: 3rem 1.5rem 2rem;
        }

        .footer-container {
          max-width: 1240px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .footer-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .footer-nav-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .footer-nav-link {
          font-size: 0.875rem;
          color: #64748b;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .footer-nav-link:hover {
          color: #0f172a;
        }

        .footer-bottom-row {
          border-top: 1px solid #f1f5f9;
          padding-top: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8125rem;
          color: #94a3b8;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .system-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .status-dot-active {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .features-grid,
          .roles-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .steps-grid {
            grid-template-columns: 1fr;
          }

          .hero-headline {
            font-size: 2.75rem;
          }
        }

        @media (max-width: 768px) {
          .nav-center-links,
          .nav-action-buttons {
            display: none;
          }

          .mobile-toggle-btn {
            display: inline-flex;
          }

          .hero-headline {
            font-size: 2.25rem;
          }

          .hero-description {
            font-size: 1.05rem;
          }

          .features-grid,
          .roles-grid,
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .hero-section {
            padding: 3rem 1rem 2rem;
          }

          .features-section,
          .roles-section,
          .how-section {
            padding: 3.5rem 1rem;
          }

          .cta-banner-inner {
            padding: 2.5rem 1.5rem;
          }

          .cta-banner-title {
            font-size: 1.75rem;
          }
        }

        @media (max-width: 480px) {
          .hero-headline {
            font-size: 1.85rem;
          }

          .hero-cta-group {
            flex-direction: column;
            width: 100%;
          }

          .btn-hero-primary,
          .btn-hero-secondary {
            width: 100%;
            justify-content: center;
          }

          .hero-trust-row {
            flex-direction: column;
            gap: 0.6rem;
            align-items: center;
          }
        }
      `}</style>

      {/* Ambient background illumination */}
      <div className="ambient-glow-top" aria-hidden="true" />

      {/* Sticky Header */}
      <header className="landing-nav">
        <div className="landing-nav-container">
          <Link to="/" className="landing-brand" aria-label="What They Say - Home">
            <img src="/logo.svg" alt="What They Say" className="landing-brand-logo" />
          </Link>

          <ul className="nav-center-links">
            <li>
              <a href="#features" className="nav-center-link">
                Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="nav-center-link">
                How It Works
              </a>
            </li>
            <li>
              <a href="#community" className="nav-center-link">
                Community Trust
              </a>
            </li>
          </ul>

          <div className="nav-action-buttons">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-nav-primary" id="landing-nav-dashboard-btn">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn-nav-outline" id="landing-nav-signin-btn">
                  Sign In
                </Link>
                <Link to="/register" className="btn-nav-primary" id="landing-nav-register-btn">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            id="landing-mobile-menu-btn"
          >
            {mobileMenuOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`landing-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-drawer-links">
            <a
              href="#features"
              className="mobile-drawer-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="mobile-drawer-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#community"
              className="mobile-drawer-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Community Trust
            </a>
          </div>
          <div className="mobile-drawer-actions">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-nav-primary" style={{ textAlign: 'center' }}>
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn-nav-outline" style={{ textAlign: 'center' }}>
                  Sign In
                </Link>
                <Link to="/register" className="btn-nav-primary" style={{ textAlign: 'center' }}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-badge-wrap">
            <svg
              className="hero-badge-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Modern Store Rating &amp; Feedback Platform</span>
          </div>

          <h1 className="hero-headline">
            Real Feedback. <span className="hero-headline-gradient">Stronger Businesses.</span>
          </h1>

          <p className="hero-description">
            Empower shoppers with authentic 1–5 star ratings, equip store owners with actionable
            performance metrics, and manage retail trust across your community.
          </p>

          <div className="hero-cta-group">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-hero-primary" id="hero-primary-dashboard-cta">
                <span>Go to Dashboard</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-hero-primary" id="hero-primary-register-cta">
                  <span>Start Rating Stores</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link to="/login" className="btn-hero-secondary" id="hero-secondary-login-cta">
                  <span>Sign In</span>
                </Link>
              </>
            )}
          </div>

          <div className="hero-trust-row">
            <div className="hero-trust-item">
              <svg
                className="hero-trust-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>1 to 5 Star Rating Precision</span>
            </div>
            <div className="hero-trust-item">
              <svg
                className="hero-trust-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Verified Customer Reviews</span>
            </div>
            <div className="hero-trust-item">
              <svg
                className="hero-trust-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Instant Score Recalculation</span>
            </div>
          </div>

          {/* Hero Showcase using dashbaord.png */}
          <div className="hero-showcase-container">
            <div className="hero-showcase-backdrop" aria-hidden="true" />
            <div className="hero-browser-mockup">
              <div className="browser-mockup-header">
                <div className="mockup-dot red" />
                <div className="mockup-dot yellow" />
                <div className="mockup-dot green" />
                <div className="mockup-url-bar">whattheysay.platform/dashboard</div>
              </div>
              <img
                src="/dashbaord.png"
                alt="What They Say Store Rating Dashboard Overview"
                className="hero-image"
                id="hero-dashboard-image"
              />
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="stats-strip-section">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">1–5</span>
              <span className="stat-label">Rating Scale</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">100%</span>
              <span className="stat-label">Verified Community</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">&lt; 1s</span>
              <span className="stat-label">Real-Time Sync</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">Zero</span>
              <span className="stat-label">Sponsored Bias</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section" id="features">
          <div className="section-header">
            <span className="section-pill">Core Platform</span>
            <h2 className="section-title">Built for Trust, Speed, and Clarity</h2>
            <p className="section-subtitle">
              Every feature is engineered to provide authentic community insight for shoppers and
              actionable performance visibility for business owners.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3 className="feature-card-title">Interactive Star Ratings</h3>
              <p className="feature-card-text">
                Browse stores and submit ratings on a calibrated 1 to 5 scale. Easily update or
                refine your score at any time.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>
              <h3 className="feature-card-title">Real-Time Score Aggregation</h3>
              <p className="feature-card-text">
                Average ratings and review counts update immediately upon every submission, ensuring
                store profiles stay accurate.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <h3 className="feature-card-title">Multi-Field Store Discovery</h3>
              <p className="feature-card-text">
                Search and sort by store name, address, or overall rating with responsive debounced
                filters.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="feature-card-title">Verified Customer Ratings</h3>
              <p className="feature-card-text">
                Every rating is linked to a verified user account, eliminating artificial bot
                reviews and review bombing.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="feature-card-title">Recent Community Previews</h3>
              <p className="feature-card-text">
                Store cards show recent ratings from fellow customers at a glance with instant
                reviewer initials.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                </svg>
              </div>
              <h3 className="feature-card-title">Empowering Local Stores</h3>
              <p className="feature-card-text">
                Honest feedback rewards outstanding service and gives neighborhood shops actionable
                guidance to grow.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-section" id="how-it-works">
          <div className="how-container">
            <div className="section-header">
              <span className="section-pill">Simple Workflow</span>
              <h2 className="section-title">How What They Say Works</h2>
              <p className="section-subtitle">
                A seamless path from discovering local stores to submitting verified ratings in
                seconds.
              </p>
            </div>

            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number-badge">1</div>
                <h3 className="step-title">Discover Stores</h3>
                <p className="step-desc">
                  Browse the comprehensive store catalog. Search by name, address, or sort by
                  current rating.
                </p>
              </div>

              <div className="step-card">
                <div className="step-number-badge">2</div>
                <h3 className="step-title">Submit Ratings</h3>
                <p className="step-desc">
                  Rate customer experiences on a clean 1 to 5 scale. You can modify your rating
                  anytime as service evolves.
                </p>
              </div>

              <div className="step-card">
                <div className="step-number-badge">3</div>
                <h3 className="step-title">Empower Growth</h3>
                <p className="step-desc">
                  Store owners monitor aggregated customer sentiment in real time, making
                  data-driven improvements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Trust Section */}
        <section className="roles-section" id="community">
          <div className="section-header">
            <span className="section-pill">Community Trust</span>
            <h2 className="section-title">Why Shoppers Trust What They Say</h2>
            <p className="section-subtitle">
              Engineered for genuine local discovery. No paid promotions, no opaque algorithms—just
              authentic ratings from real customers.
            </p>
          </div>

          <div className="roles-grid">
            <div className="role-card">
              <div>
                <div className="role-header">
                  <span className="role-tag user">Authentic</span>
                  <h3 className="role-title">Real Customer Experiences</h3>
                  <p className="role-summary">
                    Every score is submitted by verified shoppers, reflecting true service quality
                    and consistency.
                  </p>
                </div>
                <ul className="role-feature-list">
                  <li className="role-feature-item">
                    <svg
                      className="role-feature-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Clear 1 to 5 star rating system</span>
                  </li>
                  <li className="role-feature-item">
                    <svg
                      className="role-feature-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Recent customer rating previews</span>
                  </li>
                  <li className="role-feature-item">
                    <svg
                      className="role-feature-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Detailed full-history ratings drawer</span>
                  </li>
                </ul>
              </div>
              <Link to="/register" className="role-cta-btn">
                Start Exploring Stores
              </Link>
            </div>

            <div className="role-card">
              <div>
                <div className="role-header">
                  <span className="role-tag owner">Transparent</span>
                  <h3 className="role-title">Instant &amp; Unbiased Feedback</h3>
                  <p className="role-summary">
                    Ratings update dynamically in real time without delays or selective filtering.
                  </p>
                </div>
                <ul className="role-feature-list">
                  <li className="role-feature-item">
                    <svg
                      className="role-feature-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Rate any store in seconds</span>
                  </li>
                  <li className="role-feature-item">
                    <svg
                      className="role-feature-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Update your score as service evolves</span>
                  </li>
                  <li className="role-feature-item">
                    <svg
                      className="role-feature-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Sort by highest, lowest, or most rated</span>
                  </li>
                </ul>
              </div>
              <Link to="/register" className="role-cta-btn">
                Share Your Rating
              </Link>
            </div>

            <div className="role-card">
              <div>
                <div className="role-header">
                  <span className="role-tag admin">Community</span>
                  <h3 className="role-title">Strengthening Local Businesses</h3>
                  <p className="role-summary">
                    Help exceptional stores earn community reputation and support neighborhood
                    commerce.
                  </p>
                </div>
                <ul className="role-feature-list">
                  <li className="role-feature-item">
                    <svg
                      className="role-feature-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Highlight top-rated stores near you</span>
                  </li>
                  <li className="role-feature-item">
                    <svg
                      className="role-feature-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Actionable signals for store owners</span>
                  </li>
                  <li className="role-feature-item">
                    <svg
                      className="role-feature-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Community-driven trust and standards</span>
                  </li>
                </ul>
              </div>
              <Link to="/register" className="role-cta-btn">
                Join the Platform
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="cta-banner-section">
          <div className="cta-banner-inner">
            <div className="cta-banner-glow" aria-hidden="true" />
            <h2 className="cta-banner-title">Ready to Experience Transparent Feedback?</h2>
            <p className="cta-banner-desc">
              Join shoppers and business owners today on What They Say. Discover top-rated stores or
              track your store’s reputation in real time.
            </p>
            <Link to="/register" className="btn-banner-action" id="footer-cta-register-btn">
              <span>Create Free Account</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-top-row">
            <Link to="/" className="landing-brand" aria-label="What They Say">
              <img src="/logo.svg" alt="What They Say" className="landing-brand-logo" />
            </Link>
            <ul className="footer-nav-links">
              <li>
                <a href="#features" className="footer-nav-link">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="footer-nav-link">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#community" className="footer-nav-link">
                  Community Trust
                </a>
              </li>
              <li>
                <Link to="/login" className="footer-nav-link">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="footer-nav-link">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-bottom-row">
            <span>&copy; {new Date().getFullYear()} What They Say. All rights reserved.</span>
            <div className="system-status-badge">
              <span className="status-dot-active" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
