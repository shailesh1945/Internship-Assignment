import { useEffect, useState } from 'react';
import { getUsersAPI } from '../../api/users.api';

export default function ManageUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    name: '',
    role: '',
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await getUsersAPI(filters);

      setUsers(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const roleColor = (role: string) => {
    if (role === 'admin') return 'bg-blue-100 text-blue-700';
    if (role === 'store_owner')
      return 'bg-purple-100 text-purple-700';

    return 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Manage Users 👥
          </h1>

          <p className="text-slate-500 mt-1">
            Search, filter and manage platform users.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-3xl shadow p-4 mb-8 grid md:grid-cols-3 gap-4">
          <input
            placeholder="Search by name"
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
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
                role: e.target.value,
              })
            }
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="normal">Normal User</option>
            <option value="store_owner">
              Store Owner
            </option>
          </select>

          <button
            onClick={fetchUsers}
            className="rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Apply Filters
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20 text-slate-500">
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            No users found.
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-3xl shadow overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Address</th>
                    <th className="p-4">Role</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="p-4 font-medium">
                        {user.name}
                      </td>

                      <td className="p-4 text-slate-600">
                        {user.email}
                      </td>

                      <td className="p-4 text-slate-600">
                        {user.address}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${roleColor(
                            user.role
                          )}`}
                        >
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="bg-white rounded-3xl shadow p-5"
                >
                  <h2 className="font-semibold text-lg">
                    {user.name}
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    {user.email}
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    {user.address}
                  </p>

                  <span
                    className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${roleColor(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}