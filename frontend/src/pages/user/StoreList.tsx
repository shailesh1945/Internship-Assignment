import { useEffect, useState } from 'react';
import { getStoresAPI } from '../../api/stores.api';
import StarRating from '../../components/StarRating';

export default function StoreList() {
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    name: '',
    address: '',
    sortBy: 'name',
    sortOrder: 'ASC',
  });

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

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Explore Stores 🏪
          </h1>
          <p className="text-slate-500 mt-1">
            Search, browse and rate stores.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow p-4 mb-8 grid md:grid-cols-4 gap-4">
          <input
            placeholder="Search by name"
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setFilters({ ...filters, name: e.target.value })
            }
          />

          <input
            placeholder="Search by address"
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setFilters({ ...filters, address: e.target.value })
            }
          />

          <select
            className="rounded-xl border border-slate-300 px-4 py-3"
            onChange={(e) =>
              setFilters({ ...filters, sortBy: e.target.value })
            }
          >
            <option value="name">Sort by Name</option>
            <option value="address">Sort by Address</option>
          </select>

          <button
            onClick={fetchStores}
            className="rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center text-slate-500 py-20">
            Loading stores...
          </div>
        ) : stores.length === 0 ? (
          <div className="text-center text-slate-500 py-20">
            No stores found.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store: any) => (
              <div
                key={store.id}
                className="bg-white rounded-3xl shadow hover:shadow-xl transition p-6"
              >
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-slate-800">
                    {store.name}
                  </h2>

                  <p className="text-slate-500 text-sm mt-1">
                    {store.address}
                  </p>
                </div>

                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm text-slate-500">
                    Average Rating
                  </span>

                  <span className="font-bold text-amber-500">
                    ★ {store.averageRating || 'N/A'}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-slate-500 mb-2">
                    Your Rating
                  </p>

                  <StarRating storeId={store.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}