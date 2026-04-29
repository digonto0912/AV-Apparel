"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiPackage, FiChevronLeft } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { fetchUserOrders } from "@/lib/firestore";

export default function OrdersPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [user, loading, router]);

  useEffect(() => {
    async function loadOrders() {
      if (!user) return;
      try {
        const dbOrders = await fetchUserOrders(user.uid);
        setOrders(dbOrders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setOrders([]);
      }
      setFetching(false);
    }
    if (user) loadOrders();
  }, [user]);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">Loading...</div>;

  const statusColors = {
    processing: "bg-yellow-100 text-yellow-800",
    shipped: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-8">
      <Link href="/account" className="flex items-center gap-1 text-xs text-gray-500 hover:text-black mb-4">
        <FiChevronLeft size={14} /> My Account
      </Link>
      <h1 className="text-2xl font-medium mb-6">Order History</h1>

      {fetching ? (
        <p className="text-sm text-gray-400">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-16">
          <FiPackage size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-lg font-medium mb-2">No orders yet</p>
          <p className="text-sm text-gray-500 mb-6">Start shopping to see your orders here</p>
          <Link href="/products" className="bg-black text-white px-6 py-2.5 text-sm font-medium">Shop Now</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-medium">Order #{order.id}</p>
                  <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                </div>
                <span className={`px-2.5 py-1 text-xs font-medium rounded-sm ${statusColors[order.status] || "bg-gray-100"}`}>
                  {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                </span>
              </div>
              <div className="space-y-2 mb-3">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover bg-gray-100 flex-shrink-0" onError={(e) => { e.target.style.display = "none"; }} />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-[8px] text-gray-400 font-bold">AV</span>
                      </div>
                    )}
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-gray-600">{item.name} — {item.color} / {item.size} × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-between pt-3 border-t border-gray-100 gap-2">
                <span className="text-sm font-medium">Total: ${order.total?.toFixed(2)}</span>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>Payment: {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod}</span>
                  <span>Shipping: {order.shippingMethod === "express" ? "Express" : "Standard"}</span>
                </div>
              </div>
              {order.shippingAddress && (
                <div className="mt-2 pt-2 border-t border-gray-50 text-xs text-gray-400">
                  Ship to: {order.shippingAddress.firstName} {order.shippingAddress.lastName}, {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
