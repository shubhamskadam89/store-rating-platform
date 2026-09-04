import { useEffect, useState } from 'react';
import { StoresApi } from '../api/stores.api';
import { StoreCard } from '../components/common/store-card';
import { useNotification } from '../features/notifications';
import { getErrorMessage } from '../utils/error';
import type { Store } from '../types/store';

type StoreSortOption =
  'default' | 'most-rated' | 'rating-desc' | 'rating-asc' | 'name-asc' | 'name-desc';

export function StoresPage(): React.JSX.Element {
  const { notifySuccess, notifyError } = useNotification();
  const [stores, setStores] = useState<Store[]>([]);
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState<StoreSortOption>('default');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [submittingStoreId, setSubmittingStoreId] = useState<string | null>(null);

  const handleRatingSubmit = async (storeId: string, value: number): Promise<void> => {
    const targetStore = stores.find((item) => item.id === storeId);
    const storeName = targetStore?.name ?? 'Store';

    try {
      setSubmittingStoreId(storeId);

      if (!targetStore) {
        return;
      }

      if (targetStore.myRating === null) {
        await StoresApi.createRating(storeId, { value });
      } else {
        await StoresApi.updateRating(storeId, { value });
      }

      notifySuccess(`Rating of ${value}/5 saved for "${storeName}".`);

      const updatedStores = await StoresApi.getStores(search);
      setStores(updatedStores);
    } catch (err: unknown) {
      const msg = getErrorMessage(err, 'Failed to save rating.');
      notifyError(msg);
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
      } catch (err: unknown) {
        setError(getErrorMessage(err, 'Failed to load stores.'));
      } finally {
        setIsLoading(false);
      }
    };

    void loadStores();
  }, [search]);

  const sortedStores = [...stores].sort((a, b) => {
    switch (sortOption) {
      case 'most-rated': {
        const cA = a.ratingCount ?? (a.recentRatings ? a.recentRatings.length : 0);
        const cB = b.ratingCount ?? (b.recentRatings ? b.recentRatings.length : 0);
        return cB - cA;
      }
      case 'rating-desc': {
        const rA = a.overallRating ?? -1;
        const rB = b.overallRating ?? -1;
        return rB - rA;
      }
      case 'rating-asc': {
        const rA = a.overallRating ?? 99;
        const rB = b.overallRating ?? 99;
        return rA - rB;
      }
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="stores-container">
      <style>{`
        .stores-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 2rem 1.5rem 3rem 1.5rem;
          width: 100%;
          box-sizing: border-box;
        }

        .stores-header {
          margin-bottom: 1.75rem;
        }

        .stores-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #09090b;
          margin: 0 0 0.25rem 0;
          letter-spacing: -0.02em;
        }

        .stores-subtitle {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0;
        }

        .stores-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.75rem;
        }

        .search-field-wrap {
          flex: 1;
          min-width: 240px;
          max-width: 420px;
          position: relative;
        }

        .stores-search-input {
          width: 100%;
          padding: 0.55rem 0.85rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          color: #0f172a;
          outline: none;
          min-height: 38px;
          box-sizing: border-box;
          transition: border-color 0.12s, box-shadow 0.12s;
        }

        .stores-search-input:focus {
          border-color: #09090b;
          box-shadow: 0 0 0 1px #09090b;
        }

        .right-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .count-text {
          font-size: 0.8125rem;
          color: #64748b;
          white-space: nowrap;
        }

        .stores-sort-select {
          padding: 0.55rem 0.85rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          color: #334155;
          outline: none;
          cursor: pointer;
          min-height: 38px;
        }

        .stores-sort-select:focus {
          border-color: #09090b;
        }

        .stores-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
          gap: 1.25rem;
        }

        .state-banner {
          text-align: center;
          padding: 3.5rem 1rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          color: #64748b;
          font-size: 0.875rem;
        }

        .error-text {
          color: #ef4444;
          font-weight: 500;
        }

        @media (max-width: 640px) {
          .stores-container {
            padding: 1.5rem 1rem 2.5rem 1rem;
          }

          .stores-controls {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
          }

          .search-field-wrap {
            max-width: none;
            width: 100%;
            min-width: 0;
          }

          .right-controls {
            justify-content: space-between;
            width: 100%;
          }

          .stores-sort-select {
            flex: 1;
          }

          .stores-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="stores-header">
        <h1 className="stores-title">Stores</h1>
        <p className="stores-subtitle">Browse registered stores and submit your ratings.</p>
      </div>

      <div className="stores-controls">
        <div className="search-field-wrap">
          <input
            type="text"
            className="stores-search-input"
            placeholder="Search stores by name or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="right-controls">
          <span className="count-text">
            {stores.length} store{stores.length === 1 ? '' : 's'}
          </span>

          <select
            className="stores-sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as StoreSortOption)}
            aria-label="Sort stores"
          >
            <option value="default">Default order</option>
            <option value="most-rated">Most Rated</option>
            <option value="rating-desc">Highest Rated</option>
            <option value="rating-asc">Lowest Rated</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="state-banner">Loading registered stores...</div>
      ) : error ? (
        <div className="state-banner error-text">{error}</div>
      ) : sortedStores.length === 0 ? (
        <div className="state-banner">
          {search ? `No stores match "${search}".` : 'No stores currently available.'}
        </div>
      ) : (
        <div className="stores-grid">
          {sortedStores.map((store, index) => (
            <StoreCard
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
