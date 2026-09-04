import type { Store } from '../../types/store';

interface StoreCardProps {
  store: Store;
  onRatingSubmit: (storeId: string, value: number) => Promise<void>;
}

export function StoreCard({ store, onRatingSubmit }: StoreCardProps): React.JSX.Element {
  const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);

    if (value >= 1 && value <= 5) {
      void onRatingSubmit(store.id, value);
    }
  };

  return (
    <article>
      <h2>{store.name}</h2>

      <p>{store.address}</p>

      <p>
        Overall Rating:{' '}
        {store.overallRating !== null ? `${store.overallRating} / 5` : 'No ratings yet'}
      </p>

      <p>Your Rating: {store.myRating !== null ? `${store.myRating} / 5` : 'Not rated'}</p>

      <select value={store.myRating ?? ''} onChange={handleRatingChange}>
        <option value="">Select rating</option>
        <option value="1">1 ⭐</option>
        <option value="2">2 ⭐</option>
        <option value="3">3 ⭐</option>
        <option value="4">4 ⭐</option>
        <option value="5">5 ⭐</option>
      </select>
    </article>
  );
}
