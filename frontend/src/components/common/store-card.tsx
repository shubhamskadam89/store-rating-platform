import { useEffect, useState } from 'react';
import type { Store, StoreRating } from '../../types/store';
import { StoresApi } from '../../api/stores.api';
import { getStoreImage } from '../../utils/store-image';

export interface StoreCardProps {
  store: Store;
  index?: number;
  isSubmitting?: boolean;
  onRatingSubmit: (storeId: string, value: number) => Promise<void>;
}

function getInitials(name: string): string {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getAvatarColor(name: string): { bg: string; text: string } {
  const colors = [
    { bg: '#e0e7ff', text: '#3730a3' }, // Indigo
    { bg: '#fef3c7', text: '#92400e' }, // Amber
    { bg: '#d1fae5', text: '#065f46' }, // Emerald
    { bg: '#e0f2fe', text: '#0369a1' }, // Sky
    { bg: '#fae8ff', text: '#86198f' }, // Fuchsia
    { bg: '#f1f5f9', text: '#334155' }, // Slate
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

function StarIcon({ filled, size = 16 }: { filled: boolean; size?: number }): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        color: filled ? '#f59e0b' : '#cbd5e1',
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function StoreCard({
  store,
  isSubmitting = false,
  onRatingSubmit,
}: StoreCardProps): React.JSX.Element {
  const [selectedRating, setSelectedRating] = useState<number>(store.myRating ?? 0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [allRatings, setAllRatings] = useState<StoreRating[]>([]);
  const [isLoadingAllRatings, setIsLoadingAllRatings] = useState<boolean>(false);

  useEffect(() => {
    setSelectedRating(store.myRating ?? 0);
  }, [store.myRating]);

  const displayRating = hoverRating || selectedRating;
  const hasRatingChanged = selectedRating > 0 && selectedRating !== (store.myRating ?? 0);
  const ratingCount = store.ratingCount ?? (store.recentRatings ? store.recentRatings.length : 0);
  const recentRatings = store.recentRatings || [];
  const storeImage = getStoreImage(store.name, store.id);

  const handleSave = () => {
    if (selectedRating >= 1 && selectedRating <= 5 && !isSubmitting) {
      void onRatingSubmit(store.id, selectedRating);
    }
  };

  const handleOpenModal = async () => {
    setModalOpen(true);
    try {
      setIsLoadingAllRatings(true);
      const ratings = await StoresApi.getStoreRatings(store.id);
      setAllRatings(ratings);
    } catch {
      setAllRatings(recentRatings);
    } finally {
      setIsLoadingAllRatings(false);
    }
  };

  return (
    <div className="customer-store-card" id={`store-card-${store.id}`}>
      <style>{`
        .customer-store-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.875rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
          box-sizing: border-box;
        }

        .customer-store-card:hover {
          border-color: #cbd5e1;
          transform: translateY(-3px);
          box-shadow: 0 10px 24px -4px rgba(15, 23, 42, 0.1);
        }

        /* Stock Image Header */
        .card-image-cover {
          position: relative;
          width: 100%;
          height: 165px;
          background: #f1f5f9;
          overflow: hidden;
        }

        .card-store-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease;
        }

        .customer-store-card:hover .card-store-img {
          transform: scale(1.05);
        }

        .card-image-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.05) 0%, rgba(15, 23, 42, 0.5) 100%);
          pointer-events: none;
        }

        .card-image-rating-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.6rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #0f172a;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          transition: transform 0.12s ease;
        }

        .card-image-rating-badge:hover {
          transform: scale(1.05);
        }

        .card-body-content {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: space-between;
        }

        /* 1. Store Identity Header */
        .store-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 0.35rem 0;
          letter-spacing: -0.015em;
          line-height: 1.35;
          word-break: break-word;
        }

        .store-address {
          font-size: 0.84rem;
          color: #64748b;
          line-height: 1.45;
          margin: 0 0 0.85rem 0;
          word-break: break-word;
        }

        /* 2. Reputation Strip */
        .reputation-strip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid #f1f5f9;
          margin-bottom: 1rem;
        }

        .reputation-score {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .reputation-dot {
          color: #cbd5e1;
          font-weight: bold;
        }

        .reputation-count {
          color: #64748b;
          font-weight: 600;
        }

        /* 3. Community Ratings Trigger Button */
        .community-trigger-wrap {
          margin-bottom: 1.15rem;
        }

        .community-ratings-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 0.85rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          font-size: 0.84rem;
          font-weight: 600;
          color: #1e293b;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
        }

        .community-ratings-btn:hover:not(:disabled) {
          background: #f1f5f9;
          border-color: #cbd5e1;
          color: #0f172a;
        }

        .community-ratings-btn:disabled {
          background: #f8fafc;
          color: #94a3b8;
          cursor: default;
          border-color: #f1f5f9;
        }

        .btn-inner-left {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .btn-inner-arrow {
          font-size: 0.95rem;
          color: #0284c7;
          transition: transform 0.12s ease;
        }

        .community-ratings-btn:hover:not(:disabled) .btn-inner-arrow {
          transform: translateX(2px);
        }

        /* 4. Personal Rating Interaction */
        .card-personal-rating {
          padding-top: 1rem;
          border-top: 1px solid #f1f5f9;
        }

        .personal-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .personal-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #475569;
        }

        .personal-status {
          font-size: 0.75rem;
          font-weight: 600;
          color: #059669;
        }

        .personal-status.unrated {
          color: #94a3b8;
        }

        .star-picker {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin-bottom: 0.75rem;
        }

        .star-button {
          background: none;
          border: none;
          padding: 4px;
          min-width: 34px;
          min-height: 34px;
          cursor: pointer;
          color: #cbd5e1;
          transition: transform 0.12s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
        }

        .star-button:hover:not(:disabled) {
          transform: scale(1.2);
        }

        .star-button:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }

        .submit-rating-btn {
          width: 100%;
          padding: 0.6rem 0.85rem;
          background: #0f172a;
          color: #ffffff;
          font-size: 0.8125rem;
          font-weight: 600;
          border: 1px solid #0f172a;
          border-radius: 0.5rem;
          cursor: pointer;
          min-height: 38px;
          transition: all 0.15s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
        }

        .submit-rating-btn:hover:not(:disabled) {
          background: #1e293b;
          border-color: #1e293b;
        }

        .submit-rating-btn:disabled {
          background: #f1f5f9;
          color: #94a3b8;
          border-color: #e2e8f0;
          cursor: not-allowed;
        }

        /* Modal Overlay & Drawer */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
          box-sizing: border-box;
        }

        .ratings-modal-card {
          background: #ffffff;
          border-radius: 1rem;
          width: 100%;
          max-width: 520px;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25);
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }

        .modal-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f8fafc;
        }

        .modal-title-wrap {
          min-width: 0;
        }

        .modal-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .modal-subtitle {
          font-size: 0.8125rem;
          color: #64748b;
          margin: 0.2rem 0 0;
        }

        .modal-close-btn {
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 0.4rem;
          border-radius: 0.375rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.12s ease;
        }

        .modal-close-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .modal-body {
          padding: 1.25rem 1.5rem;
          overflow-y: auto;
          flex: 1;
        }

        .modal-ratings-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .modal-rating-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem;
          border-radius: 0.625rem;
          border: 1px solid #f1f5f9;
          background: #f8fafc;
        }

        .reviewer-info {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          min-width: 0;
        }

        .reviewer-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          flex-shrink: 0;
          letter-spacing: 0.02em;
        }

        .reviewer-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1e293b;
        }

        .reviewer-stars {
          display: flex;
          align-items: center;
          gap: 0.15rem;
          flex-shrink: 0;
        }

        .modal-loading {
          text-align: center;
          padding: 2.5rem 1rem;
          color: #64748b;
          font-size: 0.875rem;
        }

        .modal-empty {
          text-align: center;
          padding: 2rem 1rem;
          color: #94a3b8;
          font-size: 0.875rem;
        }
      `}</style>

      {/* Stock Image Header */}
      <div className="card-image-cover">
        <img src={storeImage} alt={store.name} className="card-store-img" loading="lazy" />
        <div className="card-image-gradient" />
        <button
          type="button"
          className="card-image-rating-badge"
          onClick={() => {
            if (ratingCount > 0) void handleOpenModal();
          }}
          title={ratingCount > 0 ? 'Click to view customer ratings' : 'No ratings yet'}
        >
          <StarIcon filled={store.overallRating !== null} size={13} />
          <span>
            {store.overallRating !== null ? Number(store.overallRating).toFixed(1) : 'New'}
          </span>
        </button>
      </div>

      <div className="card-body-content">
        <div>
          <h3 className="store-title" title={store.name}>
            {store.name}
          </h3>
          <p className="store-address">{store.address}</p>

          {/* 2. Reputation Strip */}
          <div className="reputation-strip">
            <span className="reputation-score">
              <StarIcon filled={store.overallRating !== null} size={18} />
              {store.overallRating !== null ? Number(store.overallRating).toFixed(1) : '0.0'}
            </span>
            <span className="reputation-dot">•</span>
            <span className="reputation-count">
              {ratingCount} {ratingCount === 1 ? 'rating' : 'ratings'}
            </span>
          </div>

          {/* 3. Customer Ratings Trigger (Revealed upon clicking) */}
          <div className="community-trigger-wrap">
            <button
              type="button"
              className="community-ratings-btn"
              onClick={() => void handleOpenModal()}
              disabled={ratingCount === 0}
              id={`view-ratings-btn-${store.id}`}
              aria-label={
                ratingCount > 0
                  ? `View ${ratingCount} customer ratings for ${store.name}`
                  : `No customer ratings yet`
              }
            >
              <div className="btn-inner-left">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>
                  {ratingCount > 0
                    ? `Ratings from customers (${ratingCount})`
                    : 'No customer ratings yet'}
                </span>
              </div>
              {ratingCount > 0 && <span className="btn-inner-arrow">→</span>}
            </button>
          </div>
        </div>

        {/* 4. Your Rating Interaction */}
        <div className="card-personal-rating">
          <div className="personal-header-row">
            <span className="personal-label">Your rating</span>
            {store.myRating !== null ? (
              <span className="personal-status">Rated: {store.myRating} / 5</span>
            ) : (
              <span className="personal-status unrated">Not rated</span>
            )}
          </div>

          <div className="star-picker" role="radiogroup" aria-label={`Rate ${store.name}`}>
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = star <= displayRating;
              return (
                <button
                  key={star}
                  type="button"
                  role="radio"
                  aria-checked={selectedRating === star}
                  aria-label={`${star} star`}
                  disabled={isSubmitting}
                  className="star-button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setSelectedRating(star)}
                >
                  <StarIcon filled={isFilled} size={22} />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            disabled={
              isSubmitting || selectedRating === 0 || (!hasRatingChanged && store.myRating !== null)
            }
            className="submit-rating-btn"
            onClick={handleSave}
            id={`submit-rating-btn-${store.id}`}
          >
            {isSubmitting
              ? 'Saving...'
              : hasRatingChanged
                ? store.myRating !== null
                  ? `Update to ${selectedRating} / 5`
                  : `Submit ${selectedRating} / 5`
                : store.myRating !== null
                  ? 'Rating Saved'
                  : 'Select rating'}
          </button>
        </div>
      </div>

      {/* View All Ratings Modal (Opens on Click) */}
      {modalOpen && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Ratings for ${store.name}`}
        >
          <div className="ratings-modal-card">
            <div className="modal-header">
              <div className="modal-title-wrap">
                <h3 className="modal-title">{store.name}</h3>
                <p className="modal-subtitle">
                  {ratingCount} verified {ratingCount === 1 ? 'rating' : 'ratings'} •{' '}
                  {store.overallRating !== null
                    ? `${Number(store.overallRating).toFixed(1)} average`
                    : 'No score'}
                </p>
              </div>

              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setModalOpen(false)}
                aria-label="Close ratings modal"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="modal-body">
              {isLoadingAllRatings ? (
                <div className="modal-loading">Loading community ratings...</div>
              ) : allRatings.length === 0 ? (
                <div className="modal-empty">No ratings recorded for this store yet.</div>
              ) : (
                <div className="modal-ratings-list">
                  {allRatings.map((r, i) => {
                    const colors = getAvatarColor(r.userName);
                    const initials = getInitials(r.userName);

                    return (
                      <div key={r.id || `${r.userId}-${i}`} className="modal-rating-row">
                        <div className="reviewer-info">
                          <div
                            className="reviewer-avatar"
                            style={{ backgroundColor: colors.bg, color: colors.text }}
                          >
                            {initials}
                          </div>
                          <div>
                            <div className="reviewer-name">{r.userName}</div>
                            {r.createdAt && (
                              <div style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>
                                {new Date(r.createdAt).toLocaleDateString(undefined, {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="reviewer-stars" title={`${r.value} out of 5 stars`}>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <StarIcon key={s} filled={s <= r.value} size={16} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
