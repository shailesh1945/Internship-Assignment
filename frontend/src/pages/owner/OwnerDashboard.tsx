import { useEffect, useState } from 'react';
import { getOwnerDashboardAPI } from '../../api/stores.api';

export default function OwnerDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await getOwnerDashboardAPI();
      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center text-slate-500">
        Loading dashboard...
      </div>
    );
  }

  const stores = data?.stores || [];
  const ratings = data?.ratings || [];
  const average = data?.averageRating || 0;

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Owner Dashboard 🏪
          </h1>

          <p className="text-slate-500 mt-1">
            Track your store performance and customer ratings.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-sm text-slate-500">
              Average Rating
            </p>

            <h2 className="text-4xl font-bold text-amber-500 mt-2">
              ★ {Number(average).toFixed(1)}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-sm text-slate-500">
              Total Ratings
            </p>

            <h2 className="text-4xl font-bold text-slate-800 mt-2">
              {ratings.length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-sm text-slate-500">
              Stores Owned
            </p>

            <h2 className="text-4xl font-bold text-slate-800 mt-2">
              {stores.length}
            </h2>
          </div>
        </div>

        {/* Stores */}
        <div className="bg-white rounded-3xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-5">
            Your Stores
          </h2>

          {stores.length === 0 ? (
            <p className="text-slate-500">
              No stores assigned yet.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {stores.map((store: any) => (
                <div
                  key={store.id}
                  className="rounded-2xl border border-slate-200 p-5"
                >
                  <h3 className="font-semibold text-lg">
                    {store.name}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {store.address}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ratings List */}
        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-5">
            Recent Customer Ratings
          </h2>

          {ratings.length === 0 ? (
            <p className="text-slate-500">
              No ratings yet.
            </p>
          ) : (
            <div className="space-y-4">
              {ratings.map((item: any) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 rounded-2xl border border-slate-200 p-4"
                >
                  <div>
                    <p className="font-medium text-slate-800">
                      {item.user?.name || 'User'}
                    </p>

                    <p className="text-sm text-slate-500">
                      {item.store?.name || 'Store'}
                    </p>
                  </div>

                  <div className="text-amber-500 font-bold text-lg">
                    ★ {item.value}/5
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}