"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FiGrid, FiPackage, FiShoppingCart, FiUsers, FiBox, FiTag, FiSpeaker, FiLogOut, FiMenu, FiX } from "react-icons/fi";

const NAV_ITEMS = [
  { icon: FiGrid, label: "Dashboard", href: "/admin" },
  { icon: FiPackage, label: "Products", href: "/admin/products" },
  { icon: FiShoppingCart, label: "Orders", href: "/admin/orders" },
  { icon: FiUsers, label: "Users", href: "/admin/users" },
  { icon: FiBox, label: "Inventory", href: "/admin/inventory" },
  { icon: FiTag, label: "Promotions", href: "/admin/promotions" },
  { icon: FiSpeaker, label: "Site Offers", href: "/admin/offers" },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, userProfile, loading, isAdmin, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push("/auth/login");
    }
  }, [user, loading, isAdmin, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-2">Access Denied</h1>
          <p className="text-sm text-gray-500 mb-4">Admin privileges required.</p>
          <Link href="/auth/login" className="text-sm underline">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-[240px] bg-black text-white flex flex-col z-50 transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-5 border-b border-gray-800">
          <Link href="/admin" className="text-lg font-bold tracking-[0.15em]">AV ADMIN</Link>
          <p className="text-[10px] text-gray-400 mt-0.5">Management Panel</p>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                  active ? "bg-white/10 text-white font-medium" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="text-xs text-gray-400 mb-2">
            Signed in as<br />
            <span className="text-white">{user.displayName || user.email}</span>
          </div>
          <div className="flex gap-2">
            <Link href="/" className="text-xs text-gray-500 hover:text-white">View Store</Link>
            <span className="text-gray-700">|</span>
            <button onClick={() => { signOut(); router.push("/"); }} className="text-xs text-gray-500 hover:text-white flex items-center gap-1">
              <FiLogOut size={10} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 h-14 flex items-center px-4 lg:px-6 sticky top-0 z-30">
          <button className="lg:hidden mr-3" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
          <span className="text-sm font-medium text-gray-700">
            {NAV_ITEMS.find((i) => pathname === i.href || (i.href !== "/admin" && pathname.startsWith(i.href)))?.label || "Dashboard"}
          </span>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
