import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardAPI } from '../../api/admin.api';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      const res = await getDashboardAPI();
      setStats(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center text-slate-500">
        Loading dashboard...
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Users',
      value: stats?.users || 0,
      icon: '👥',
    },
    {
      title: 'Total Stores',
      value: stats?.stores || 0,
      icon: '🏪',
    },
    {
      title: 'Total Ratings',
      value: stats?.ratings || 0,
      icon: '⭐',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Admin Dashboard 🛠️
          </h1>

          <p className="text-slate-500 mt-1">
            Manage platform users, stores and insights.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-3xl shadow hover:shadow-xl transition p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">
                  {card.icon}
                </span>

                <span className="text-sm text-slate-400">
                  Live
                </span>
              </div>

              <h2 className="text-slate-500 text-sm">
                {card.title}
              </h2>

              <p className="text-3xl font-bold text-slate-800 mt-2">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-5">
            Quick Actions
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/admin/users')}
              className="rounded-2xl bg-blue-600 text-white py-4 font-medium hover:bg-blue-700 transition"
            >
              Manage Users
            </button>

            <button
              onClick={() => navigate('/admin/stores')}
              className="rounded-2xl bg-slate-800 text-white py-4 font-medium hover:bg-slate-900 transition"
            >
              Manage Stores
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}