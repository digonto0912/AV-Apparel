"use client";
import { useState, useEffect } from "react";
import { FiSearch, FiChevronDown, FiEye, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { fetchOrders, updateOrderStatus } from "@/lib/firestore";

const STATUS_OPTIONS = ["processing", "shipped", "delivered", "cancelled"];
const STATUS_COLORS = {
  processing: "bg-yellow-100 text-yellow-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQ, setSearchQ] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch {
        const local = JSON.parse(localStorage.getItem("ck_orders") || "[]");
        setOrders(local.reverse());
      }
      setLoading(false);
    }
    loadOrders();
  }, []);

  const filtered = orders.filter((o) => {
    if (searchQ) {
      const q = searchQ.toLowerCase();
      if (!o.id.toLowerCase().includes(q) && !o.email?.toLowerCase().includes(q)) return false;
    }
    if (filterStatus && o.status !== filterStatus) return false;
    return true;
  });

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch {
      const local = JSON.parse(localStorage.getItem("ck_orders") || "[]");
      const updated = local.map((o) => o.id === orderId ? { ...o, status: newStatus } : o);
      localStorage.setItem("ck_orders", JSON.stringify(updated));
    }
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrder?.id === orderId) setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
    toast.success(`Order status updated to ${newStatus}`);
  };

  if (loading) return <div className="py-20 text-center text-sm text-gray-400">Loading orders...</div>;

  const summaryStats = {
    total: orders.length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "All Orders", value: summaryStats.total, bg: "bg-gray-50" },
          { label: "Processing", value: summaryStats.processing, bg: "bg-yellow-50" },
          { label: "Shipped", value: summaryStats.shipped, bg: "bg-blue-50" },
          { label: "Delivered", value: summaryStats.delivered, bg: "bg-green-50" },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} border border-gray-200 p-4 rounded-sm`}>
            <p className="text-xl font-semibold">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={searchQ} onChange={(e) => setSearchQ(e.target.value)}
            placeholder="Search by order ID or email..."
            className="w-full pl-9 pr-3 py-2 border border-gray-300 text-xs focus:border-black" />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 px-3 py-2 text-xs bg-white">
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-sm overflow-x-auto">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 p-6 text-center">No orders found</p>
        ) : (
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-3 font-medium text-gray-600">Order ID</th>
                <th className="text-left p-3 font-medium text-gray-600">Customer</th>
                <th className="text-left p-3 font-medium text-gray-600">Date</th>
                <th className="text-left p-3 font-medium text-gray-600">Total</th>
                <th className="text-left p-3 font-medium text-gray-600">Status</th>
                <th className="text-right p-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-3 font-medium">#{order.id?.slice(0, 12)}</td>
                  <td className="p-3">
                    <p className="text-gray-600">{order.email}</p>
                    <p className="text-[10px] text-gray-400">{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
                  </td>
                  <td className="p-3 text-gray-600">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="p-3 font-medium">${order.total?.toFixed(2)}</td>
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`text-[10px] font-medium px-2 py-1 rounded-sm border-0 cursor-pointer ${STATUS_COLORS[order.status] || "bg-gray-100"}`}
                    >
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={() => setSelectedOrder(order)} className="p-1.5 text-gray-400 hover:text-black">
                      <FiEye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-white w-full max-w-lg my-8 rounded-sm">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-lg font-semibold">Order #{selectedOrder.id?.slice(0, 12)}</h2>
              <button onClick={() => setSelectedOrder(null)}><FiX size={20} /></button>
            </div>
            <div className="p-5 space-y-5">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Status</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-sm cursor-pointer ${STATUS_COLORS[selectedOrder.status] || "bg-gray-100"}`}
                >
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>

              {/* Customer */}
              <div>
                <h3 className="text-xs font-medium mb-2">Customer</h3>
                <p className="text-xs text-gray-600">{selectedOrder.email}</p>
                <p className="text-[10px] text-gray-400">User ID: {selectedOrder.userId}</p>
              </div>

              {/* Shipping */}
              <div>
                <h3 className="text-xs font-medium mb-2">Shipping Address</h3>
                <div className="text-xs text-gray-600">
                  <p>{selectedOrder.shippingAddress?.firstName} {selectedOrder.shippingAddress?.lastName}</p>
                  <p>{selectedOrder.shippingAddress?.address}{selectedOrder.shippingAddress?.apartment && `, ${selectedOrder.shippingAddress.apartment}`}</p>
                  <p>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.zip}</p>
                  <p>{selectedOrder.shippingAddress?.phone}</p>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="text-xs font-medium mb-2">Items ({selectedOrder.items?.length})</h3>
                <div className="space-y-2 border border-gray-100 rounded-sm divide-y divide-gray-100">
                  {selectedOrder.items?.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3">
                      <div>
                        <p className="text-xs font-medium">{item.name}</p>
                        <p className="text-[10px] text-gray-500">{item.color} / {item.size} × {item.quantity}</p>
                      </div>
                      <span className="text-xs font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1.5 pt-3 border-t border-gray-200 text-xs">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>${selectedOrder.subtotal?.toFixed(2)}</span></div>
                {selectedOrder.discount > 0 && <div className="flex justify-between"><span className="text-green-700">Discount</span><span className="text-green-700">-${selectedOrder.discount?.toFixed(2)}</span></div>}
                <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span>{selectedOrder.shippingCost ? `$${selectedOrder.shippingCost.toFixed(2)}` : "FREE"}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Tax</span><span>${selectedOrder.tax?.toFixed(2)}</span></div>
                <div className="flex justify-between font-medium pt-2 border-t"><span>Total</span><span>${selectedOrder.total?.toFixed(2)}</span></div>
              </div>

              {/* Meta */}
              <div className="text-[10px] text-gray-400 pt-2">
                <p>Order placed: {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : "—"}</p>
                {selectedOrder.promoCode && <p>Promo code: {selectedOrder.promoCode}</p>}
                <p>Shipping method: {selectedOrder.shippingMethod}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
