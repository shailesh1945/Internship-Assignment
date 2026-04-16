import { useEffect, useState } from 'react';
import {
  getStoresAPI,
  createStoreAPI,
} from '../../api/stores.api';

export default function ManageStores() {
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    name: '',
    sortBy: 'name',
    sortOrder: 'ASC',
  });

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
  });

  const [creating, setCreating] = useState(false);

  const fetchStores = async () => {
    try {
      setLoading(true);

      const res = await getStoresAPI(filters);

      setStores(res.data.entities || res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      setCreating(true);

      await createStoreAPI(form);

      setForm({
        name: '',
        email: '',
        address: '',
      });

      fetchStores();
    } catch (error) {
      console.error(error);
      alert('Could not create store');
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Manage Stores 🏬
          </h1>

          <p className="text-slate-500 mt-1">
            Create, search and monitor stores.
          </p>
        </div>

        {/* Create Store */}
        <div className="bg-white rounded-3xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-5">
            Add New Store
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            <input
              placeholder="Store Name"
              value={form.name}
              className="rounded-xl border border-slate-300 px-4 py-3"
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <input
              placeholder="Email"
              value={form.email}
              className="rounded-xl border border-slate-300 px-4 py-3"
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            <input
              placeholder="Address"
              value={form.address}
              className="rounded-xl border border-slate-300 px-4 py-3"
              onChange={(e) =>
                setForm({
                  ...form,
                  address: e.target.value,
                })
              }
            />

            <button
              onClick={handleCreate}
              disabled={creating}
              className="rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              {creating ? 'Creating...' : 'Create'}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-3xl shadow p-4 mb-8 grid md:grid-cols-3 gap-4">
          <input
            placeholder="Search stores"
            className="rounded-xl border border-slate-300 px-4 py-3"
            onChange={(e) =>
              setFilters({
                ...filters,
                name: e.target.value,
              })
            }
          />

          <select
            className="rounded-xl border border-slate-300 px-4 py-3"
            onChange={(e) =>
              setFilters({
                ...filters,
                sortBy: e.target.value,
              })
            }
          >
            <option value="name">Sort by Name</option>
            <option value="address">
              Sort by Address
            </option>
          </select>

          <button
            onClick={fetchStores}
            className="rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-900 transition"
          >
            Search
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20 text-slate-500">
            Loading stores...
          </div>
        ) : stores.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            No stores found.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <div
                key={store.id}
                className="bg-white rounded-3xl shadow hover:shadow-xl transition p-6"
              >
                <h2 className="text-xl font-semibold text-slate-800">
                  {store.name}
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  {store.email}
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  {store.address}
                </p>

                <div className="mt-5 flex justify-between items-center">
                  <span className="text-sm text-slate-500">
                    Rating
                  </span>

                  <span className="font-bold text-amber-500">
                    ★ {store.averageRating || 'N/A'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}