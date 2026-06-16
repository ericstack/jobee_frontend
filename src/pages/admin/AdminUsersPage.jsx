import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Users, Search, Trash2 } from "lucide-react";
import { getUsers, deleteUser } from "../../api/usersApi";

const ROLE_STYLES = {
  user:     "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  employer: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  admin:    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
};

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      const data = await getUsers({ limit: 1000 });
      setUsers(data.data || []);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (u) => {
    if (!window.confirm(`Delete ${u.name} (${u.email})? This cannot be undone.`)) return;
    setDeletingId(u._id);
    try {
      await deleteUser(u._id);
      setUsers((prev) => prev.filter((x) => x._id !== u._id));
      toast.success("User deleted");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  const q = query.toLowerCase();
  const filtered = users.filter(
    (u) => !q || u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q) || u.role?.toLowerCase().includes(q),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Users</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage all registered accounts</p>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-xl">
          {users.length} total
        </span>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="relative max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, or role…"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
              <Users size={22} className="text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {users.length === 0 ? "No users yet" : "No matches"}
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs">
              {users.length === 0 ? "Registered users will appear here." : "Try a different search."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">User</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {filtered.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">
                          {u.name?.[0]?.toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium capitalize ${ROLE_STYLES[u.role] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 dark:text-gray-500">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(u)}
                        disabled={deletingId === u._id}
                        className="inline-flex items-center gap-1 text-xs text-red-500 dark:text-red-400 hover:underline disabled:opacity-50"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;
