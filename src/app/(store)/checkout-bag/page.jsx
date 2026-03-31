"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMinus, FiPlus, FiX, FiHeart, FiArrowRight } from "react-icons/fi";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import { useProducts } from "@/context/ProductsContext";
import ProductCard from "@/components/shared/ProductCard";

export default function CheckoutBagPage() {
  const { items, updateQuantity, removeItem, subtotal, itemCount } = useCart();
  const { addItem: addToWishlist } = useWishlist();
  const { items: recentItems } = useRecentlyViewed();
  const { products } = useProducts();
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCodes, setPromoCodes] = useState([]);

  useEffect(() => {
    import("@/lib/firestore").then(({ fetchPromoCodes }) => {
      fetchPromoCodes().then(setPromoCodes).catch(() => setPromoCodes([]));
    });
  }, []);

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    const code = promoCodes.find((c) => c.code.toLowerCase() === promoCode.trim().toLowerCase());
    if (!code) {
      toast.error("Invalid promo code");
      return;
    }
    if (subtotal < code.minPurchase) {
      toast.error(`Minimum purchase of $${code.minPurchase} required`);
      return;
    }
    setAppliedPromo(code);
    toast.success(code.description);
  };

  const discount = appliedPromo
    ? appliedPromo.type === "percentage"
      ? subtotal * (appliedPromo.value / 100)
      : appliedPromo.value
    : 0;

  const estimatedTotal = subtotal - discount;

  const handleSaveForLater = (item) => {
    const product = products.find((p) => p.id === item.productId);
    if (product) addToWishlist(product);
    removeItem(item.key);
    toast.success("Saved to wishlist");
  };

  const recentProducts = recentItems
    .map((r) => products.find((p) => p.id === r.productId))
    .filter(Boolean)
    .slice(0, 6);

  const recommendedProducts = products
    .filter((p) => p.salePrice && !items.some((i) => i.productId === p.id))
    .slice(0, 7);

  if (items.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-20 text-center">
        <h1 className="text-3xl font-medium mb-4">Your Bag is Empty</h1>
        <p className="text-sm text-gray-500 mb-8">Add items to your bag to start checkout</p>
        <Link href="/products" className="inline-block bg-black text-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-gray-900">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="flex flex-col lg:flex-row">
        {/* Left Column - Cart Items */}
        <div className="flex-1 px-4 md:px-8 lg:border-r border-gray-200">
          <div className="py-5 border-b border-gray-200">
            <div className="flex items-baseline justify-between mb-2">
              <div className="flex items-baseline gap-1">
                <h1 className="text-2xl md:text-3xl font-medium">Shopping Bag</h1>
                <span className="text-xl md:text-2xl text-gray-500 font-medium">({itemCount} {itemCount === 1 ? "item" : "items"})</span>
              </div>
              <span className="text-xl md:text-2xl font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-600 flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#000" strokeWidth="1.2"/><path d="M7 4v3.5l2.5 1" stroke="#000" strokeWidth="1.2" strokeLinecap="round"/></svg>
              Items in bag are not reserved and may sell out. Order now.
            </p>
          </div>

          {items.map((item) => (
            <div key={item.key} className="flex gap-4 py-6 border-b border-gray-200">
              <Link href={`/products/${item.slug}`} className="w-[120px] md:w-[140px] h-[160px] md:h-[184px] flex-shrink-0 bg-gray-100 overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                ) : null}
                <div className={`w-full h-full items-center justify-center ${item.image ? 'hidden' : 'flex'}`}>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-gray-200 rounded flex items-center justify-center text-lg font-bold text-gray-300">CK</div>
                    <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{item.name}</p>
                  </div>
                </div>
              </Link>
              <div className="flex-1 flex flex-col min-h-[160px] md:min-h-[184px]">
                <div className="flex justify-between items-start mb-1">
                  <Link href={`/products/${item.slug}`} className="text-sm font-medium hover:underline">{item.name}</Link>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      {item.salePrice && <span className="text-xs text-gray-400 line-through">${item.price.toFixed(2)}</span>}
                      <span className="text-sm font-medium">${(item.salePrice || item.price).toFixed(2)}</span>
                    </div>
                    {/* Quantity */}
                    <div className="flex items-center gap-1 mt-2">
                      <button onClick={() => updateQuantity(item.key, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center border border-gray-200 hover:border-black">
                        <FiMinus size={12} />
                      </button>
                      <span className="w-6 h-6 flex items-center justify-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.key, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center border border-gray-200 hover:border-black">
                        <FiPlus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{item.color}</p>
                <p className="text-xs text-gray-500">Size: {item.size}</p>
                {item.salePrice && (
                  <p className="text-xs text-red-600 font-medium mt-1">
                    {Math.round((1 - item.salePrice / item.price) * 100)}% off
                  </p>
                )}
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <p className="text-xs text-green-700 font-medium">In Stock</p>
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleSaveForLater(item)} className="text-xs text-gray-500 hover:text-black">Save for Later</button>
                    <button onClick={() => { removeItem(item.key); toast.success("Removed from bag"); }} className="text-xs text-gray-500 hover:text-black">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="py-4 bg-gray-50 my-4 text-center">
            <span className="text-xs text-gray-500">Gift options available in checkout</span>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="w-full lg:w-[420px] flex-shrink-0 px-4 md:px-8">
          {/* Loyalty Banner */}
          <div className="bg-gradient-to-br from-gray-900 to-black text-white p-6 mt-0 lg:mt-0">
            <p className="text-sm font-medium mb-1">My Calvin Rewards</p>
            <p className="text-xs text-gray-300">You could earn {Math.round(subtotal * 10)} points on this order.</p>
            <p className="text-xs mt-2">
              <Link href="/auth/login" className="underline">Sign in</Link> or <Link href="/auth/register" className="underline">Join</Link> My Calvin Rewards now.
            </p>
          </div>

          <div className="py-6">
            <div className="flex items-baseline gap-1 mb-6">
              <h2 className="text-lg font-medium">Order Summary</h2>
              <span className="text-base text-gray-500">({itemCount} {itemCount === 1 ? "item" : "items"})</span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">Discount ({appliedPromo.code})</span>
                  <span className="text-green-700">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax</span>
                <span className="text-gray-500">Calculated in checkout</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Standard Shipping</span>
                <span className="text-green-700 font-medium">FREE</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="border-y border-gray-200 py-3 mb-4">
              <button onClick={() => setPromoOpen(!promoOpen)} className="flex items-center justify-between w-full text-sm text-gray-500">
                Have a promo code?
                <FiArrowRight size={14} className={`transition-transform ${promoOpen ? "rotate-90" : ""}`} />
              </button>
              {promoOpen && (
                <div className="flex gap-2 mt-3">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:border-black"
                  />
                  <button onClick={handleApplyPromo} className="px-4 py-2 bg-black text-white text-sm font-medium">
                    Apply
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mb-3">
              <span className="text-base font-medium">Estimated Total</span>
              <span className="text-base font-medium">${estimatedTotal.toFixed(2)}</span>
            </div>

            <p className="text-xs text-gray-500 mb-5">
              4 payments of ${(estimatedTotal / 4).toFixed(2)} with Klarna or Afterpay
            </p>

            <Link
              href="/checkout"
              className="block w-full bg-black text-white text-center py-3.5 text-sm font-medium tracking-wide hover:bg-gray-900 transition-colors mb-4"
            >
              Start Checkout
            </Link>

            <p className="text-xs text-gray-500 text-center mb-2">My Calvin Rewards members enjoy free returns.</p>
            <p className="text-xs text-gray-500 text-center">100% Authentic Calvin Klein</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Link href="/shipping-returns" className="text-xs text-gray-500 underline">Shipping Info</Link>
              <span className="text-gray-300">|</span>
              <Link href="/shipping-returns" className="text-xs text-gray-500 underline">Returns</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendedProducts.length > 0 && (
        <section className="border-t border-gray-200 px-4 md:px-8 py-8">
          <h2 className="text-xl font-medium mb-6">Before You Go</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {recommendedProducts.map((p) => (
              <div key={p.id} className="flex-shrink-0 w-48">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      {recentProducts.length > 0 && (
        <section className="border-t border-gray-200 px-4 md:px-8 py-8">
          <h2 className="text-xl font-medium mb-6">Recently Viewed</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {recentProducts.map((p) => (
              <div key={p.id} className="flex-shrink-0 w-48">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
