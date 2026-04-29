import Link from "next/link";
import { FiTruck, FiRotateCw, FiClock, FiDollarSign } from "react-icons/fi";

export default function ShippingReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-medium text-center mb-12">Shipping & Returns</h1>

      {/* Quick Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { icon: FiTruck, label: "Free Standard Shipping", sub: "On all orders" },
          { icon: FiClock, label: "3-5 Business Days", sub: "Standard delivery" },
          { icon: FiRotateCw, label: "Free Returns", sub: "Within 30 days" },
          { icon: FiDollarSign, label: "Full Refund", sub: "5-7 business days" },
        ].map((item) => (
          <div key={item.label} className="text-center p-4 bg-gray-50">
            <item.icon size={24} className="mx-auto mb-2" />
            <p className="text-xs font-medium">{item.label}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* Shipping */}
      <section className="mb-12">
        <h2 className="text-xl font-medium mb-6 pb-2 border-b border-gray-200">Shipping Policy</h2>
        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <div>
            <h3 className="font-medium text-black mb-2">Shipping Options</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 font-medium text-xs text-gray-600">Method</th>
                  <th className="text-left py-2 font-medium text-xs text-gray-600">Delivery Time</th>
                  <th className="text-left py-2 font-medium text-xs text-gray-600">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2.5 text-xs">Standard Shipping</td>
                  <td className="py-2.5 text-xs">3-5 business days</td>
                  <td className="py-2.5 text-xs text-green-700 font-medium">FREE</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2.5 text-xs">Express Shipping</td>
                  <td className="py-2.5 text-xs">1-2 business days</td>
                  <td className="py-2.5 text-xs">$15.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="font-medium text-black mb-2">Processing Time</h3>
            <p>Orders placed before 2:00 PM EST on business days are processed and shipped the same day. Orders placed after 2:00 PM EST or on weekends/holidays will be processed the next business day.</p>
          </div>
          <div>
            <h3 className="font-medium text-black mb-2">Tracking Your Order</h3>
            <p>Once your order ships, you will receive an email with tracking information. You can also view your order status anytime by visiting <Link href="/account/orders" className="underline">Order History</Link> in your account.</p>
          </div>
          <div>
            <h3 className="font-medium text-black mb-2">Shipping Restrictions</h3>
            <p>Currently, we ship to all 50 US states. International shipping is not available at this time. PO Boxes are accepted for standard shipping only.</p>
          </div>
        </div>
      </section>

      {/* Returns */}
      <section className="mb-12">
        <h2 className="text-xl font-medium mb-6 pb-2 border-b border-gray-200">Return Policy</h2>
        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <div>
            <h3 className="font-medium text-black mb-2">Return Window</h3>
            <p>Items may be returned within <strong>30 days</strong> of the delivery date. Items must be unworn, unwashed, and in their original condition with all tags attached.</p>
          </div>
          <div>
            <h3 className="font-medium text-black mb-2">How to Start a Return</h3>
            <ol className="list-decimal pl-5 space-y-1.5">
              <li>Log into your account and go to <Link href="/account/orders" className="underline">Order History</Link>.</li>
              <li>Find the order containing the item(s) you wish to return.</li>
              <li>Select the items and reason for return.</li>
              <li>Print the prepaid return shipping label.</li>
              <li>Pack items securely and drop off at your nearest carrier location.</li>
            </ol>
          </div>
          <div>
            <h3 className="font-medium text-black mb-2">Refund Processing</h3>
            <p>Once we receive and inspect your return, refunds are processed within <strong>5-7 business days</strong>. The refund will be applied to your original payment method. You will receive an email confirmation when the refund has been processed.</p>
          </div>
          <div>
            <h3 className="font-medium text-black mb-2">Non-Returnable Items</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Underwear and swimwear (for hygiene reasons)</li>
              <li>Items marked as &ldquo;Final Sale&rdquo;</li>
              <li>Gift cards</li>
              <li>Items without original tags</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-black mb-2">Exchanges</h3>
            <p>We do not currently offer direct exchanges. To get a different size or color, please return the original item and place a new order.</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <div className="bg-gray-50 p-6 text-center">
        <h3 className="text-lg font-medium mb-2">Need Help?</h3>
        <p className="text-sm text-gray-500 mb-4">Our customer service team is available to assist you.</p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/contact" className="bg-black text-white px-6 py-2.5 text-sm font-medium hover:bg-gray-900">
            Contact Us
          </Link>
          <Link href="/faq" className="border border-black px-6 py-2.5 text-sm font-medium hover:bg-black hover:text-white transition-colors">
            View FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}
