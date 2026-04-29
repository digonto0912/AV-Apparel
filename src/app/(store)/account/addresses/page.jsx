"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiChevronLeft, FiPlus, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function AddressesPage() {
  const router = useRouter();
  const { user, userProfile, loading, updateUserProfile } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", street: "", city: "", state: "", zip: "", country: "US", isDefault: false });

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [user, loading, router]);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">Loading...</div>;

  const addresses = userProfile?.addresses || [];

  const handleAdd = async () => {
    if (!form.name || !form.street || !form.city || !form.state || !form.zip) {
      toast.error("Please fill in all fields");
      return;
    }
    const newAddr = { ...form, id: Date.now().toString() };
    const updated = form.isDefault
      ? [...addresses.map((a) => ({ ...a, isDefault: false })), newAddr]
      : [...addresses, newAddr];
    await updateUserProfile({ addresses: updated });
    toast.success("Address added");
    setShowForm(false);
    setForm({ name: "", street: "", city: "", state: "", zip: "", country: "US", isDefault: false });
  };

  const handleDelete = async (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    await updateUserProfile({ addresses: updated });
    toast.success("Address removed");
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-8">
      <Link href="/account" className="flex items-center gap-1 text-xs text-gray-500 hover:text-black mb-4">
        <FiChevronLeft size={14} /> My Account
      </Link>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">Saved Addresses</h1>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1.5 text-xs font-medium bg-black text-white px-3 py-2">
          <FiPlus size={14} /> Add Address
        </button>
      </div>

      {showForm && (
        <div className="border border-gray-200 p-5 mb-6 max-w-lg animate-fade-in">
          <h3 className="text-sm font-medium mb-4">New Address</h3>
          <div className="space-y-3">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name"
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black" />
            <input value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} placeholder="Street Address"
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black" />
            <div className="flex gap-2">
              <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City"
                className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:border-black" />
              <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} placeholder="State"
                className="w-20 border border-gray-300 px-3 py-2 text-sm focus:border-black" />
              <input value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} placeholder="ZIP"
                className="w-24 border border-gray-300 px-3 py-2 text-sm focus:border-black" />
            </div>
            <label className="flex items-center gap-2 text-xs">
              <input type="checkbox" checked={form.isDefault} onChange={(e) => setForm({ ...form, isDefault: e.target.checked })} className="accent-black" />
              Set as default
            </label>
            <div className="flex gap-2">
              <button onClick={handleAdd} className="bg-black text-white px-4 py-2 text-xs font-medium">Save</button>
              <button onClick={() => setShowForm(false)} className="text-xs text-gray-500">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {addresses.length === 0 ? (
        <p className="text-sm text-gray-500 py-8">No saved addresses yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          {addresses.map((addr) => (
            <div key={addr.id} className="border border-gray-200 p-4 relative">
              {addr.isDefault && <span className="text-[10px] font-medium bg-black text-white px-1.5 py-0.5 absolute top-2 right-2">DEFAULT</span>}
              <p className="text-sm font-medium">{addr.name}</p>
              <p className="text-xs text-gray-600">{addr.street}</p>
              <p className="text-xs text-gray-600">{addr.city}, {addr.state} {addr.zip}</p>
              <button onClick={() => handleDelete(addr.id)} className="mt-3 flex items-center gap-1 text-xs text-red-500 hover:text-red-700">
                <FiTrash2 size={12} /> Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
