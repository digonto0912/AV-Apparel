"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiUser, FiPackage, FiMapPin, FiHeart, FiSettings, FiLogOut } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function AccountPage() {
  const router = useRouter();
  const { user, userProfile, loading, signOut, updateUserProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ displayName: "", email: "", phone: "" });

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (userProfile) {
      setForm({
        displayName: userProfile.displayName || "",
        email: userProfile.email || "",
        phone: userProfile.phone || "",
      });
    }
  }, [userProfile]);

  const handleSave = async () => {
    try {
      await updateUserProfile({ displayName: form.displayName, phone: form.phone });
      toast.success("Profile updated");
      setEditing(false);
    } catch {
      toast.error("Failed to update profile");
    }
  };

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">Loading...</div>;

  const NAV_ITEMS = [
    { icon: FiUser, label: "Profile", href: "/account", active: true },
    { icon: FiPackage, label: "Order History", href: "/account/orders" },
    { icon: FiMapPin, label: "Addresses", href: "/account/addresses" },
    { icon: FiHeart, label: "Wishlist", href: "/wishlist" },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl md:text-3xl font-medium mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
        {/* Side Nav */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-sm ${
                item.active ? "bg-black text-white" : "hover:bg-gray-50"
              }`}
            >
              <item.icon size={16} /> {item.label}
            </Link>
          ))}
          <button
            onClick={() => { signOut(); router.push("/"); }}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-500 hover:text-black w-full"
          >
            <FiLogOut size={16} /> Sign Out
          </button>
        </nav>

        {/* Content */}
        <div>
          <div className="bg-gray-50 p-6 rounded-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Personal Information</h2>
              {!editing ? (
                <button onClick={() => setEditing(true)} className="text-xs underline text-gray-500 hover:text-black">Edit</button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setEditing(false)} className="text-xs text-gray-500">Cancel</button>
                  <button onClick={handleSave} className="text-xs bg-black text-white px-3 py-1">Save</button>
                </div>
              )}
            </div>

            {editing ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-1">Name</label>
                  <input value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Email</label>
                  <input value={form.email} disabled className="w-full border border-gray-200 px-3 py-2 text-sm bg-gray-100 text-gray-500" />
                  <p className="text-[10px] text-gray-400 mt-1">Email cannot be changed here</p>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Phone</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black" />
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-500 w-20 inline-block">Name:</span> {userProfile?.displayName || "—"}</p>
                <p><span className="text-gray-500 w-20 inline-block">Email:</span> {userProfile?.email || "—"}</p>
                <p><span className="text-gray-500 w-20 inline-block">Phone:</span> {userProfile?.phone || "—"}</p>
                <p><span className="text-gray-500 w-20 inline-block">Member since:</span> {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : "—"}</p>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/account/orders" className="border border-gray-200 p-5 hover:border-black transition-colors text-center">
              <FiPackage size={24} className="mx-auto mb-2" />
              <p className="text-sm font-medium">Order History</p>
              <p className="text-xs text-gray-500 mt-1">Track & manage orders</p>
            </Link>
            <Link href="/account/addresses" className="border border-gray-200 p-5 hover:border-black transition-colors text-center">
              <FiMapPin size={24} className="mx-auto mb-2" />
              <p className="text-sm font-medium">Addresses</p>
              <p className="text-xs text-gray-500 mt-1">Manage shipping addresses</p>
            </Link>
            <Link href="/wishlist" className="border border-gray-200 p-5 hover:border-black transition-colors text-center">
              <FiHeart size={24} className="mx-auto mb-2" />
              <p className="text-sm font-medium">Wishlist</p>
              <p className="text-xs text-gray-500 mt-1">Items you saved</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
