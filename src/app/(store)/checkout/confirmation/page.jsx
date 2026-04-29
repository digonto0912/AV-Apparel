"use client";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiCheck, FiPackage } from "react-icons/fi";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "N/A";

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
        <FiCheck size={32} className="text-green-600" />
      </div>

      <h1 className="text-3xl font-medium mb-3">Thank You!</h1>
      <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>

      <div className="bg-gray-50 p-6 rounded-sm mb-8 text-left">
        <div className="flex items-center gap-3 mb-4">
          <FiPackage size={20} />
          <div>
            <p className="text-sm font-medium">Order #{orderId}</p>
            <p className="text-xs text-gray-500">Confirmation email will be sent shortly</p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span className="font-medium text-green-700">Processing</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Estimated Delivery</span>
            <span>3-5 business days</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/account/orders"
          className="px-6 py-3 bg-black text-white text-sm font-medium hover:bg-gray-900"
        >
          Track Your Order
        </Link>
        <Link
          href="/products"
          className="px-6 py-3 border border-black text-sm font-medium hover:bg-black hover:text-white transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20 text-sm text-gray-400">Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
