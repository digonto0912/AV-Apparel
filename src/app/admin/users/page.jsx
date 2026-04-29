"use client";
import { useState, useEffect } from "react";
import { FiSearch, FiUserCheck, FiUserX, FiShield } from "react-icons/fi";
import toast from "react-hot-toast";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQ, setSearchQ] = useState("");
  const [filterRole, setFilterRole] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const snap = await getDocs(collection(db, "users"));
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setUsers(data.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || "")));
      } catch {
        setUsers([]);
      }
      setLoading(false);
    }
    fetchUsers();
  }, []);

  const filtered = users.filter((u) => {
    if (searchQ) {
      const q = searchQ.toLowerCase();
      if (!u.email?.toLowerCase().includes(q) && !u.displayName?.toLowerCase().includes(q)) return false;
    }
    if (filterRole && u.role !== filterRole) return false;
    return true;
  });

  const toggleDisable = async (userId, currentlyDisabled) => {
    const newStatus = !currentlyDisabled;
    try {
      await updateDoc(doc(db, "users", userId), { disabled: newStatus });
    } catch {
      // silent fail
    }
    setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, disabled: newStatus } : u));
    toast.success(newStatus ? "User account disabled" : "User account enabled");
  };

  if (loading) return <div className="py-20 text-center text-sm text-gray-400">Loading users...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Users</h1>
          <p className="text-xs text-gray-500">{users.length} registered users</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white border border-gray-200 p-4 rounded-sm">
          <p className="text-xl font-semibold">{users.length}</p>
          <p className="text-xs text-gray-500">Total Users</p>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-sm">
          <p className="text-xl font-semibold">{users.filter((u) => u.role === "admin").length}</p>
          <p className="text-xs text-gray-500">Admins</p>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-sm">
          <p className="text-xl font-semibold">{users.filter((u) => u.disabled).length}</p>
          <p className="text-xs text-gray-500">Disabled</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={searchQ} onChange={(e) => setSearchQ(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-3 py-2 border border-gray-300 text-xs focus:border-black" />
        </div>
        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}
          className="border border-gray-300 px-3 py-2 text-xs bg-white">
          <option value="">All Roles</option>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-sm overflow-x-auto">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 p-6 text-center">No users found</p>
        ) : (
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-3 font-medium text-gray-600">User</th>
                <th className="text-left p-3 font-medium text-gray-600">Email</th>
                <th className="text-left p-3 font-medium text-gray-600">Role</th>
                <th className="text-left p-3 font-medium text-gray-600">Joined</th>
                <th className="text-left p-3 font-medium text-gray-600">Status</th>
                <th className="text-right p-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-400">
                        {(user.displayName || user.email)?.[0]?.toUpperCase() || "?"}
                      </div>
                      <span className="font-medium">{user.displayName || "—"}</span>
                    </div>
                  </td>
                  <td className="p-3 text-gray-600">{user.email}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-medium ${
                      user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-700"
                    }`}>
                      {user.role === "admin" && <FiShield size={10} />}
                      {user.role || "customer"}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="p-3">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-sm ${
                      user.disabled ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                    }`}>
                      {user.disabled ? "Disabled" : "Active"}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => toggleDisable(user.id, user.disabled)}
                        className={`p-1.5 rounded-sm ${user.disabled ? "text-green-600 hover:bg-green-50" : "text-red-500 hover:bg-red-50"}`}
                        title={user.disabled ? "Enable account" : "Disable account"}
                      >
                        {user.disabled ? <FiUserCheck size={14} /> : <FiUserX size={14} />}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
