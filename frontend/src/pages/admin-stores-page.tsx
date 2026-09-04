import { useEffect, useState } from 'react';
import { StoresApi } from '../api/stores.api';
import type { AdminStore } from '../types/store';

type SortField = 'name' | 'email' | 'address' | 'rating';
type SortDirection = 'asc' | 'desc';

export function AdminStoresPage(): React.JSX.Element {
  const [stores, setStores] = useState<AdminStore[]>([]);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Store creation form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [createMessage, setCreateMessage] = useState('');
  const [createError, setCreateError] = useState('');

  const loadStores = async () => {
    try {
      setIsLoading(true);
      setError('');

      const data = await StoresApi.getAdminStores(search);
      setStores(data);
    } catch {
      setError('Failed to load stores.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleCreateStore = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    try {
      setCreateMessage('');
      setCreateError('');

      await StoresApi.createStore(form);

      setCreateMessage('Store created successfully.');
      setForm({
        name: '',
        email: '',
        address: '',
      });

      // Refresh stores list to display newly created store
      await loadStores();
    } catch {
      setCreateError('Failed to create store.');
    }
  };

  const handleSort = (field: SortField): void => {
    if (sortField === field) {
      setSortDirection((current) =>
        current === 'asc' ? 'desc' : 'asc',
      );
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

  if (isLoading && stores.length === 0) {
    return <div>Loading stores...</div>;
  }

  return (
    <div>
      <h1>Manage Stores</h1>

      {/* Create Store Form */}
      <form onSubmit={(event) => void handleCreateStore(event)}>
        <input
          placeholder="Store name"
          value={form.name}
          required
          onChange={(event) =>
            setForm({ ...form, name: event.target.value })
          }
        />

        <input
          type="email"
          placeholder="Store email"
          value={form.email}
          required
          onChange={(event) =>
            setForm({ ...form, email: event.target.value })
          }
        />

        <input
          placeholder="Address"
          value={form.address}
          required
          onChange={(event) =>
            setForm({ ...form, address: event.target.value })
          }
        />

        <button type="submit">Create Store</button>
      </form>

      {createMessage && <p>{createMessage}</p>}
      {createError && <p>{createError}</p>}

      <hr style={{ margin: '1.5rem 0', opacity: 0.2 }} />

      {/* Search & Stores Table */}
      <input
        type="text"
        placeholder="Search by name, email or address"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {error && <p>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>
              <button type="button" onClick={() => handleSort('name')}>
                Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
            </th>

            <th>
              <button type="button" onClick={() => handleSort('email')}>
                Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
            </th>

            <th>
              <button type="button" onClick={() => handleSort('address')}>
                Address {sortField === 'address' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
            </th>

            <th>
              <button type="button" onClick={() => handleSort('rating')}>
                Rating {sortField === 'rating' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedStores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.address}</td>
              <td>
                {store.rating !== null
                  ? `${store.rating} / 5`
                  : 'No ratings yet'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {sortedStores.length === 0 && <p>No stores found.</p>}
    </div>
  );
}
