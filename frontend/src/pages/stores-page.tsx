import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { StoresApi } from '../api/stores.api';
import type { Store } from '../types/store';

// Curated high quality storefront imagery
const STORE_IMAGE_COLLECTION = [
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
];

interface StoreCardItemProps {
  store: Store;
  index: number;
  isSubmitting: boolean;
  onRatingSubmit: (storeId: string, value: number) => Promise<void>;
}

function StoreCardItem({ store, index, isSubmitting, onRatingSubmit }: StoreCardItemProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number>(store.myRating ?? 0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  // Synchronize when store.myRating changes after refetch
  useEffect(() => {
    setSelectedRating(store.myRating ?? 0);
  }, [store.myRating]);

  const imageUrl = STORE_IMAGE_COLLECTION[index % STORE_IMAGE_COLLECTION.length];
  const displayRating = hoverRating || selectedRating;
  const hasRatingChanged = selectedRating > 0 && selectedRating !== (store.myRating ?? 0);

  const handleSubmit = () => {
    if (selectedRating >= 1 && selectedRating <= 5 && !isSubmitting) {
      void onRatingSubmit(store.id, selectedRating);
    }
  };

  return (
    <article className="store-booking-card">
      {/* Card Header with Image and Overlay */}
      <div className="card-header">
        <img
          src={imageUrl}
          alt={store.name}
          className="card-image"
          loading="lazy"
        />
        <div className="card-image-overlay" />

        {/* Favorite / Wishlist Button */}
        <button
          type="button"
          aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
          className={`favorite-btn ${isLiked ? 'is-liked' : ''}`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isLiked ? '#ef4444' : 'currentColor'}
            stroke={isLiked ? '#ef4444' : '#1f2937'}
            strokeWidth={isLiked ? '0' : '1.5'}
            className="favorite-icon"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </button>

        {/* Category Chip */}
        <span className="card-badge">Verified Store</span>
      </div>

      {/* Card Body */}
      <div className="card-body">
        {/* Title and Overall Rating */}
        <div className="card-title-row">
          <h2 className="card-title" title={store.name}>
            {store.name}
          </h2>
          <div className="card-rating-badge">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="star-icon"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            <span className="rating-value">
              {store.overallRating !== null ? Number(store.overallRating).toFixed(1) : 'New'}
            </span>
          </div>
        </div>

        {/* Address */}
        <p className="card-address">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="address-icon"
          >
            <path
              fillRule="evenodd"
              d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
          <span>{store.address}</span>
        </p>

        {/* Amenities / Feature Badges with Tooltips */}
        <div className="card-amenities">
          <div className="amenity-item" data-tooltip="Verified Store">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="amenity-icon"
            >
              <path
                fillRule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="amenity-item" data-tooltip="Free Wi-Fi">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="amenity-icon"
            >
              <path
                fillRule="evenodd"
                d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.062 0 8.25 8.25 0 00-11.667 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.204 3.182a6 6 0 018.486 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0 3.75 3.75 0 00-5.304 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182a1.5 1.5 0 012.122 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0l-.53-.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="amenity-item" data-tooltip="In-store Shopping">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="amenity-icon"
            >
              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.483a2.25 2.25 0 012.18-1.75h11.237a.75.75 0 00.728-.567l1.78-7.12A.75.75 0 0020.67 6H5.45l-.465-1.745A1.875 1.875 0 003.208 3H2.25zM7.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm9 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
            </svg>
          </div>

          <div className="amenity-item" data-tooltip="Accessible Access">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="amenity-icon"
            >
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg>
          </div>

          <div className="amenity-item amenity-counter" data-tooltip="Great Service & Support">
            +5
          </div>
        </div>

        {/* Rating Functionality Section */}
        <div className="user-rating-section">
          <div className="user-rating-header">
            <span className="user-rating-label">Your Rating</span>
            <span className="user-rating-status">
              {store.myRating !== null ? (
                <span className="rated-tag">Rated {store.myRating} ⭐</span>
              ) : (
                <span className="unrated-tag">Not rated yet</span>
              )}
            </span>
          </div>

          {/* Interactive Star Selection Bar */}
          <div className="stars-picker" role="radiogroup" aria-label="Rating Stars">
            {[1, 2, 3, 4, 5].map((starValue) => {
              const isFilled = starValue <= displayRating;
              return (
                <button
                  key={starValue}
                  type="button"
                  role="radio"
                  aria-checked={selectedRating === starValue}
                  aria-label={`${starValue} Star${starValue > 1 ? 's' : ''}`}
                  disabled={isSubmitting}
                  className={`star-pick-btn ${isFilled ? 'active' : ''}`}
                  onMouseEnter={() => setHoverRating(starValue)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => {
                    setSelectedRating(starValue);
                    void onRatingSubmit(store.id, starValue);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={isFilled ? '#f59e0b' : '#cbd5e1'}
                    className="star-svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Card Footer with Main Action Button */}
      <div className="card-footer">
        <button
          type="button"
          disabled={isSubmitting || (selectedRating === 0 && store.myRating === null)}
          className={`card-action-btn ${isSubmitting ? 'loading' : ''}`}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <span className="btn-loading-wrapper">
              <span className="loading-spinner" />
              <span>Saving Rating...</span>
            </span>
          ) : hasRatingChanged ? (
            `Submit Rating (${selectedRating} ⭐)`
          ) : store.myRating !== null ? (
            `Update Rating (${store.myRating} ⭐)`
          ) : selectedRating > 0 ? (
            `Submit Rating (${selectedRating} ⭐)`
          ) : (
            'Select Stars to Rate'
          )}
        </button>
      </div>
    </article>
  );
}

export function StoresPage(): React.JSX.Element {
  const [stores, setStores] = useState<Store[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [ratingError, setRatingError] = useState('');
  const [submittingStoreId, setSubmittingStoreId] = useState<string | null>(null);

  const handleRatingSubmit = async (storeId: string, value: number): Promise<void> => {
    try {
      setRatingError('');
      setSubmittingStoreId(storeId);

      const store = stores.find((item) => item.id === storeId);

      if (!store) {
        return;
      }

      if (store.myRating === null) {
        await StoresApi.createRating(storeId, { value });
      } else {
        await StoresApi.updateRating(storeId, { value });
      }

      // Re-fetch stores to get updated overall ratings and confirm user rating
      const updatedStores = await StoresApi.getStores(search);
      setStores(updatedStores);
    } catch (err: unknown) {
      if (isAxiosError(err) && err.response?.data?.message) {
        const msg = err.response.data.message;
        setRatingError(Array.isArray(msg) ? msg.join(', ') : String(msg));
      } else {
        setRatingError('Failed to submit rating.');
      }
    } finally {
      setSubmittingStoreId(null);
    }
  };

  useEffect(() => {
    const loadStores = async () => {
      try {
        setIsLoading(true);
        setError('');

        const data = await StoresApi.getStores(search);
        setStores(data);
      } catch {
        setError('Failed to load stores.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadStores();
  }, [search]);

  return (
    <div className="stores-container">
      <style>{`
        .stores-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem;
          color: #1e293b;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          box-sizing: border-box;
        }

        .stores-header-section {
          margin-bottom: 2.5rem;
          text-align: left;
        }

        .stores-title {
          font-size: 2.25rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.025em;
        }

        .stores-subtitle {
          color: #64748b;
          font-size: 1.05rem;
          margin: 0 0 1.75rem 0;
        }

        .search-wrapper {
          position: relative;
          max-width: 520px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          width: 1.25rem;
          height: 1.25rem;
          color: #94a3b8;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.85rem 2.8rem 0.85rem 2.85rem;
          border-radius: 9999px;
          border: 1.5px solid #e2e8f0;
          background: #ffffff;
          color: #1e293b;
          font-size: 0.975rem;
          outline: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }

        .search-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
        }

        .search-clear-btn {
          position: absolute;
          right: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          background: #f1f5f9;
          border: none;
          border-radius: 50%;
          width: 1.5rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #64748b;
          font-size: 0.8rem;
          padding: 0;
        }

        .search-clear-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .rating-alert {
          background: #fef2f2;
          border-left: 4px solid #ef4444;
          color: #b91c1c;
          padding: 0.875rem 1.25rem;
          border-radius: 0.5rem;
          margin-bottom: 2rem;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .stores-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
          justify-content: center;
        }

        /* Material Tailwind Booking Card Replication */
        .store-booking-card {
          width: 100%;
          max-width: 26rem;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 1rem;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border: 1px solid #f1f5f9;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          position: relative;
        }

        .store-booking-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.12), 0 10px 15px -5px rgba(0, 0, 0, 0.06);
        }

        .card-header {
          position: relative;
          height: 12.5rem;
          overflow: hidden;
          background-color: #334155;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .store-booking-card:hover .card-image {
          transform: scale(1.05);
        }

        .card-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top right, transparent 20%, rgba(0, 0, 0, 0.2) 60%, rgba(0, 0, 0, 0.65) 100%);
          pointer-events: none;
        }

        .card-badge {
          position: absolute;
          bottom: 0.85rem;
          left: 0.85rem;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(6px);
          color: #f8fafc;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          letter-spacing: 0.025em;
          text-transform: uppercase;
        }

        .favorite-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 9999px;
          border: none;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          color: #374151;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
          transition: transform 0.15s ease, background-color 0.2s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          z-index: 2;
        }

        .favorite-btn:hover {
          transform: scale(1.1);
          background: #ffffff;
        }

        .favorite-btn.is-liked {
          color: #ef4444;
        }

        .favorite-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .card-body {
          padding: 1.25rem 1.25rem 0.75rem 1.25rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-title-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .card-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
          line-height: 1.35;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .card-rating-badge {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: #fef3c7;
          color: #b45309;
          font-size: 0.875rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          border-radius: 9999px;
          flex-shrink: 0;
        }

        .star-icon {
          width: 1rem;
          height: 1rem;
          color: #d97706;
        }

        .card-address {
          display: flex;
          align-items: flex-start;
          gap: 0.4rem;
          color: #64748b;
          font-size: 0.875rem;
          line-height: 1.4;
          margin: 0 0 1.25rem 0;
        }

        .address-icon {
          width: 1.1rem;
          height: 1.1rem;
          color: #94a3b8;
          flex-shrink: 0;
          margin-top: 0.1rem;
        }

        .card-amenities {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .amenity-item {
          position: relative;
          cursor: pointer;
          border-radius: 9999px;
          border: 1px solid rgba(15, 23, 42, 0.08);
          background: rgba(15, 23, 42, 0.04);
          padding: 0.55rem;
          color: #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .amenity-item:hover {
          border-color: rgba(15, 23, 42, 0.15);
          background: rgba(15, 23, 42, 0.08);
          color: #0f172a;
        }

        .amenity-icon {
          width: 1.05rem;
          height: 1.05rem;
        }

        .amenity-counter {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.35rem 0.65rem;
        }

        /* Tooltip behavior */
        .amenity-item[data-tooltip]::after {
          content: attr(data-tooltip);
          position: absolute;
          bottom: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%) translateY(4px);
          background: #0f172a;
          color: #f8fafc;
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.35rem 0.65rem;
          border-radius: 0.375rem;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.15s ease, transform 0.15s ease;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }

        .amenity-item:hover[data-tooltip]::after {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .user-rating-section {
          background: #f8fafc;
          border-radius: 0.75rem;
          padding: 0.85rem 1rem;
          margin-top: auto;
        }

        .user-rating-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .user-rating-label {
          font-size: 0.825rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #475569;
        }

        .rated-tag {
          font-size: 0.8rem;
          font-weight: 600;
          color: #15803d;
          background: #dcfce7;
          padding: 0.2rem 0.5rem;
          border-radius: 9999px;
        }

        .unrated-tag {
          font-size: 0.8rem;
          color: #64748b;
        }

        .stars-picker {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .star-pick-btn {
          background: transparent;
          border: none;
          padding: 0.25rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .star-pick-btn:hover {
          transform: scale(1.25);
        }

        .star-pick-btn:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .star-svg {
          width: 1.6rem;
          height: 1.6rem;
          transition: fill 0.15s ease;
        }

        .card-footer {
          padding: 0 1.25rem 1.25rem 1.25rem;
        }

        .card-action-btn {
          width: 100%;
          border-radius: 0.625rem;
          background-color: #0f172a;
          color: #ffffff;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 0.75rem 1rem;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
          box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.12);
        }

        .card-action-btn:hover:not(:disabled) {
          background-color: #1e293b;
          box-shadow: 0 6px 12px -2px rgba(15, 23, 42, 0.2);
        }

        .card-action-btn:disabled {
          background-color: #cbd5e1;
          color: #64748b;
          cursor: not-allowed;
          box-shadow: none;
        }

        .btn-loading-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .loading-spinner {
          width: 1rem;
          height: 1rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .loading-state-container,
        .empty-state-container,
        .error-state-container {
          text-align: center;
          padding: 4rem 1rem;
        }

        .empty-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #334155;
          margin-bottom: 0.5rem;
        }

        .empty-desc {
          color: #64748b;
          font-size: 0.95rem;
        }
      `}</style>

      {/* Header and Search */}
      <div className="stores-header-section">
        <h1 className="stores-title">Explore Stores</h1>
        <p className="stores-subtitle">Discover top-rated local stores and submit your ratings.</p>

        <div className="search-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="search-icon"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search stores by name or address..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {search && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Error Alert */}
      {ratingError && (
        <div role="alert" className="rating-alert">
          <span>{ratingError}</span>
          <button
            type="button"
            onClick={() => setRatingError('')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#b91c1c' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Content States */}
      {isLoading ? (
        <div className="loading-state-container">
          <div className="loading-spinner" style={{ width: '2.5rem', height: '2.5rem', margin: '0 auto 1rem', borderColor: '#e2e8f0', borderTopColor: '#0f172a' }} />
          <p style={{ color: '#64748b' }}>Loading stores...</p>
        </div>
      ) : error ? (
        <div className="error-state-container">
          <p style={{ color: '#ef4444', fontWeight: 600 }}>{error}</p>
        </div>
      ) : stores.length === 0 ? (
        <div className="empty-state-container">
          <p className="empty-title">No stores found</p>
          <p className="empty-desc">
            {search ? `No stores matching "${search}". Try another search term.` : 'There are currently no stores available.'}
          </p>
        </div>
      ) : (
        <div className="stores-grid">
          {stores.map((store, index) => (
            <StoreCardItem
              key={store.id}
              store={store}
              index={index}
              isSubmitting={submittingStoreId === store.id}
              onRatingSubmit={handleRatingSubmit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
