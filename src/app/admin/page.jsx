"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiDollarSign, FiShoppingCart, FiPackage, FiUsers, FiTrendingUp, FiAlertCircle } from "react-icons/fi";
import { fetchProducts, fetchOrders, fetchUsers } from "@/lib/firestore";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, totalUsers: 0, recentOrders: [] });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [orders, users, prods] = await Promise.all([
          fetchOrders(),
          fetchUsers(),
          fetchProducts(),
        ]);
        setProducts(prods);
        const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
        const recentOrders = orders.slice(0, 5);

        setStats({
          totalOrders: orders.length,
          totalRevenue,
          totalUsers: users.length,
          recentOrders,
        });
      } catch {
        const localOrders = JSON.parse(localStorage.getItem("ck_orders") || "[]");
        setStats({
          totalOrders: localOrders.length,
          totalRevenue: localOrders.reduce((s, o) => s + (o.total || 0), 0),
          totalUsers: 0,
          recentOrders: localOrders.slice(-5).reverse(),
        });
      }
      setLoading(false);
    }
    fetchStats();
  }, []);

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.variants.reduce((s, v) => s + v.stock, 0), 0);
  const lowStockProducts = products.filter((p) =>
    p.variants.some((v) => v.stock > 0 && v.stock <= 5)
  );
  const topProducts = [...products]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 5);

  const statusColors = {
    processing: "bg-yellow-100 text-yellow-800",
    shipped: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20 text-sm text-gray-400">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: FiShoppingCart, label: "Total Orders", value: stats.totalOrders, color: "text-blue-600", bg: "bg-blue-50" },
          { icon: FiDollarSign, label: "Total Revenue", value: `$${stats.totalRevenue.toFixed(2)}`, color: "text-green-600", bg: "bg-green-50" },
          { icon: FiPackage, label: "Products", value: totalProducts, color: "text-purple-600", bg: "bg-purple-50" },
          { icon: FiUsers, label: "Users", value: stats.totalUsers, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-sm border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-9 h-9 ${stat.bg} rounded-sm flex items-center justify-center`}>
                <stat.icon size={18} className={stat.color} />
              </div>
            </div>
            <p className="text-2xl font-semibold">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-sm border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs text-gray-500 underline hover:text-black">View All</Link>
          </div>
          {stats.recentOrders.length === 0 ? (
            <p className="text-sm text-gray-400 p-4">No orders yet</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium">#{order.id?.slice(0, 12)}</p>
                    <p className="text-[10px] text-gray-500">{order.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium">${order.total?.toFixed(2)}</p>
                    <span className={`inline-block px-1.5 py-0.5 text-[10px] font-medium rounded-sm ${statusColors[order.status] || "bg-gray-100"}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-sm border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold">Top Products</h2>
            <Link href="/admin/products" className="text-xs text-gray-500 underline hover:text-black">View All</Link>
          </div>
          <div className="divide-y divide-gray-100">
            {topProducts.map((p, i) => (
              <div key={p.id} className="p-4 flex items-center gap-3">
                <span className="text-xs font-medium text-gray-400 w-5">{i + 1}</span>
                <div className="w-10 h-10 bg-gray-100 rounded-sm flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] text-gray-400 font-bold">CK</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{p.name}</p>
                  <p className="text-[10px] text-gray-500">{p.category} · {p.gender}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium">${(p.salePrice || p.price).toFixed(2)}</p>
                  <p className="text-[10px] text-gray-500">{p.reviewCount} reviews</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="bg-white rounded-sm border border-gray-200">
          <div className="flex items-center gap-2 p-4 border-b border-gray-100">
            <FiAlertCircle size={16} className="text-orange-500" />
            <h2 className="text-sm font-semibold">Low Stock Alerts ({lowStockProducts.length})</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {lowStockProducts.slice(0, 5).map((p) => {
              const lowVariants = p.variants.filter((v) => v.stock > 0 && v.stock <= 5);
              return (
                <div key={p.id} className="p-4">
                  <p className="text-xs font-medium mb-1">{p.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {lowVariants.map((v, i) => (
                      <span key={i} className="text-[10px] bg-orange-50 text-orange-700 px-1.5 py-0.5 rounded-sm">
                        {v.color} / {v.size}: {v.stock} left
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <Link href="/admin/inventory" className="block text-center text-xs text-gray-500 underline p-3 border-t border-gray-100 hover:text-black">
            View All Inventory
          </Link>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 p-4 rounded-sm">
          <p className="text-[10px] text-gray-500 mb-1">Total Stock Units</p>
          <p className="text-xl font-semibold">{totalStock.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-sm">
          <p className="text-[10px] text-gray-500 mb-1">Avg Order Value</p>
          <p className="text-xl font-semibold">
            ${stats.totalOrders > 0 ? (stats.totalRevenue / stats.totalOrders).toFixed(2) : "0.00"}
          </p>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-sm">
          <p className="text-[10px] text-gray-500 mb-1">Categories</p>
          <p className="text-xl font-semibold">{[...new Set(products.map((p) => p.category))].length}</p>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-sm">
          <p className="text-[10px] text-gray-500 mb-1">On Sale</p>
          <p className="text-xl font-semibold">{products.filter((p) => p.salePrice).length}</p>
        </div>
      </div>
    </div>
  );
}
