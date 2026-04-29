"use client";
import Link from "next/link";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import toast from "react-hot-toast";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductsContext";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();
  const { products } = useProducts();

  const handleAddToBag = (wishItem) => {
    const product = products.find((p) => p.id === wishItem.productId);
    if (!product) return;
    const firstVariant = product.variants.find((v) => v.stock > 0);
    if (!firstVariant) { toast.error("Out of stock"); return; }
    addItem(product, firstVariant.size, firstVariant.color);
    removeItem(wishItem.productId);
    toast.success("Added to bag");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-20 text-center">
        <FiHeart size={40} className="mx-auto text-gray-300 mb-4" />
        <h1 className="text-3xl font-medium mb-3">Your Wishlist is Empty</h1>
        <p className="text-sm text-gray-500 mb-8">Save your favorite items to come back to later</p>
        <Link href="/products" className="inline-block bg-black text-white px-8 py-3 text-sm font-medium">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl md:text-3xl font-medium mb-2">Wishlist</h1>
      <p className="text-sm text-gray-500 mb-8">{items.length} {items.length === 1 ? "item" : "items"}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((item) => (
          <div key={item.productId} className="group relative">
            <Link href={`/products/${item.slug}`} className="block aspect-[3/4] bg-gray-100 mb-3 overflow-hidden">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                />
              ) : null}
              <div className={`w-full h-full items-center justify-center text-center p-4 ${item.image ? "hidden" : "flex"}`}>
                <div>
                  <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-300">AV</div>
                  <p className="text-[11px] text-gray-400 line-clamp-2">{item.name}</p>
                </div>
              </div>
            </Link>
            <button
              onClick={() => { removeItem(item.productId); toast.success("Removed from wishlist"); }}
              className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:shadow-md"
            >
              <FiHeart size={16} className="fill-black text-black" />
            </button>
            <Link href={`/products/${item.slug}`}>
              <h3 className="text-sm font-medium mb-1 line-clamp-1">{item.name}</h3>
            </Link>
            <div className="flex items-center gap-2 mb-2">
              {item.salePrice ? (
                <>
                  <span className="text-sm text-gray-400 line-through">${item.price.toFixed(2)}</span>
                  <span className="text-sm font-medium">${item.salePrice.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-sm font-medium">${item.price.toFixed(2)}</span>
              )}
            </div>
            <button
              onClick={() => handleAddToBag(item)}
              className="w-full py-2 border border-black text-xs font-medium hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <FiShoppingBag size={12} /> Add to Bag
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
