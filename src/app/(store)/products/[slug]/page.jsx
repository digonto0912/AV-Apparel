"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { FiHeart, FiChevronDown, FiTruck, FiRotateCw, FiShield, FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";
import { useProducts } from "@/context/ProductsContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import SizeGuideModal from "@/components/shared/SizeGuideModal";
import ProductCard from "@/components/shared/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const { products, loading: productsLoading, getProductBySlug } = useProducts();
  const product = getProductBySlug(params.slug);
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { addProduct, items: recentItems } = useRecentlyViewed();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [sizeNudge, setSizeNudge] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const sizeRef = useRef(null);
  const addedTimerRef = useRef(null);

  useEffect(() => {
    if (product) {
      addProduct(product);
      const colors = [...new Set(product.variants.map((v) => v.color))];
      if (colors.length > 0 && !selectedColor) setSelectedColor(colors[0]);
    }
  }, [product]);

  // Clear nudge when a size is selected
  useEffect(() => {
    if (selectedSize) setSizeNudge(false);
  }, [selectedSize]);

  if (productsLoading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-20 text-center">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-[3/4] bg-gray-100 rounded" />
            <div className="space-y-4 pt-8">
              <div className="h-6 bg-gray-200 w-2/3 rounded" />
              <div className="h-4 bg-gray-200 w-1/3 rounded" />
              <div className="h-10 bg-gray-100 w-full rounded mt-8" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-20 text-center">
        <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
        <Link href="/products" className="text-sm underline">Browse all products</Link>
      </div>
    );
  }

  const colors = [...new Set(product.variants.map((v) => v.color))];
  const sizesForColor = product.variants
    .filter((v) => v.color === selectedColor)
    .map((v) => ({ size: v.size, stock: v.stock }));

  const selectedVariant = product.variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );

  const handleAddToBag = () => {
    if (!selectedSize) {
      // Gentle nudge — scroll to size section and highlight it
      setSizeNudge(true);
      sizeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      // Auto-dismiss nudge after 4 seconds
      setTimeout(() => setSizeNudge(false), 4000);
      return;
    }
    if (!selectedVariant || selectedVariant.stock === 0) {
      toast.error("Sorry, this size is currently out of stock");
      return;
    }
    // Clear any nudge
    setSizeNudge(false);
    addItem(product, selectedSize, selectedColor, quantity);

    // Show inline "Added!" confirmation
    setJustAdded(true);
    if (addedTimerRef.current) clearTimeout(addedTimerRef.current);
    addedTimerRef.current = setTimeout(() => setJustAdded(false), 3000);
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .slice(0, 4);

  const recentlyViewed = recentItems
    .filter((r) => r.productId !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-6">
      <Breadcrumbs items={[
        { label: product.gender, href: `/products?gender=${product.gender}` },
        { label: product.category, href: `/products?gender=${product.gender}&category=${product.category}` },
        { label: product.name },
      ]} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 pb-12">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="aspect-[3/4] bg-gray-100 overflow-hidden relative">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[selectedImageIndex || 0]}
                alt={`${product.name} - ${selectedColor}`}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
            ) : null}
            <div className={`w-full h-full items-center justify-center absolute inset-0 ${product.images && product.images.length > 0 ? 'hidden' : 'flex'}`}>
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center text-4xl font-bold text-gray-300">AV</div>
                <p className="text-sm text-gray-400">{product.name}</p>
                <p className="text-xs text-gray-300 mt-1">{selectedColor}</p>
              </div>
            </div>
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`aspect-square bg-gray-100 overflow-hidden border-2 ${(selectedImageIndex || 0) === i ? 'border-black' : 'border-transparent'}`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="lg:sticky lg:top-[120px] lg:self-start">
          {product.isNew && <span className="text-xs font-medium bg-black text-white px-2 py-0.5 mb-3 inline-block">NEW</span>}

          <h1 className="text-2xl md:text-3xl font-medium mb-2">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            {product.salePrice ? (
              <>
                <span className="text-lg text-gray-400 line-through">${product.price.toFixed(2)}</span>
                <span className="text-lg font-medium">${product.salePrice.toFixed(2)}</span>
                <span className="text-sm text-red-600 font-medium">{product.discount}% off</span>
              </>
            ) : (
              <span className="text-lg font-medium">${product.price.toFixed(2)}</span>
            )}
          </div>

          {product.salePrice && (
            <p className="text-xs text-red-600 font-medium mb-4">
              Friends + Family: Extra 20% off $125+
            </p>
          )}

          {/* Rating */}
          {product.reviewCount > 0 && (
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? "text-black" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500">({product.reviewCount} reviews)</span>
            </div>
          )}

          {/* Color Selector */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium">Color:</span>
              <span className="text-xs text-gray-500">{selectedColor}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => {
                const hex = product.variants.find((v) => v.color === color)?.colorHex;
                return (
                  <button
                    key={color}
                    onClick={() => { setSelectedColor(color); setSelectedSize(""); }}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                      selectedColor === color ? "border-black" : "border-gray-200 hover:border-gray-400"
                    }`}
                    title={color}
                  >
                    <span className="w-7 h-7 rounded-full" style={{ backgroundColor: hex || "#ccc" }} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selector */}
          <div
            ref={sizeRef}
            className={`mb-6 transition-all duration-300 ${
              sizeNudge ? "pt-0" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium uppercase tracking-wider">Size{selectedSize ? `: ${selectedSize}` : ''}</span>
                {sizeNudge && (
                  <span className="text-xs text-black font-medium">— Please select</span>
                )}
              </div>
              <button onClick={() => setSizeGuideOpen(true)} className="text-xs underline text-gray-500 hover:text-black">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizesForColor.map(({ size, stock }) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  disabled={stock === 0}
                  className={`min-w-[48px] h-10 px-3 border text-sm transition-all duration-200 ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : stock === 0
                      ? "border-gray-100 text-gray-300 cursor-not-allowed line-through bg-gray-50"
                      : sizeNudge
                      ? "border-black text-black hover:bg-black hover:text-white"
                      : "border-gray-300 text-gray-700 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedVariant && selectedVariant.stock <= 5 && selectedVariant.stock > 0 && (
              <p className="text-xs text-gray-500 mt-2">Only {selectedVariant.stock} left</p>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-medium">Qty:</span>
            <div className="flex items-center border border-gray-300">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center text-sm hover:bg-gray-50">−</button>
              <span className="w-8 h-8 flex items-center justify-center text-sm font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center text-sm hover:bg-gray-50">+</button>
            </div>
          </div>

          {/* Add to Bag */}
          <div className="mb-6">
            <div className="flex gap-3">
              <button
                onClick={handleAddToBag}
                className="flex-1 h-12 bg-black text-white text-sm font-medium tracking-wider uppercase hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
              >
                {justAdded ? (
                  <>
                    <FiCheck size={16} />
                    <span>Added</span>
                  </>
                ) : (
                  "Add to Bag"
                )}
              </button>
              <button
                onClick={() => toggleItem(product)}
                className={`w-12 h-12 border flex items-center justify-center transition-colors ${
                  isInWishlist(product.id) ? "border-black bg-black text-white" : "border-gray-300 hover:border-black"
                }`}
                aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <FiHeart size={18} className={isInWishlist(product.id) ? "fill-white" : ""} />
              </button>
            </div>

          </div>

          {/* Delivery info */}
          <div className="space-y-3 py-4 border-t border-gray-200">
            <div className="flex items-start gap-3">
              <FiTruck size={16} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium">Free Standard Shipping</p>
                <p className="text-xs text-gray-500">Estimated delivery: 3-5 business days</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiRotateCw size={16} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium">Free Returns</p>
                <p className="text-xs text-gray-500">Within 30 days of delivery</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiShield size={16} className="mt-0.5 flex-shrink-0" />
              <p className="text-xs font-medium">100% Authentic AV APPAREL</p>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-700 leading-relaxed mb-4">{product.description}</p>
          </div>

          {/* Accordions */}
          <div className="border-t border-gray-200">
            {[
              { id: "details", label: "Product Details", content: product.details },
              { id: "materials", label: "Materials & Care", content: product.materials },
              { id: "shipping", label: "Shipping & Returns", content: "Free standard shipping on orders. Express delivery available. Free returns within 30 days. Items must be unworn with tags attached." },
            ].map((acc) => (
              <div key={acc.id} className="border-b border-gray-200">
                <button
                  onClick={() => setOpenAccordion(openAccordion === acc.id ? "" : acc.id)}
                  className="w-full flex items-center justify-between py-4 text-sm font-medium"
                >
                  {acc.label}
                  <FiChevronDown size={16} className={`transition-transform ${openAccordion === acc.id ? "rotate-180" : ""}`} />
                </button>
                {openAccordion === acc.id && (
                  <p className="text-xs text-gray-600 leading-relaxed pb-4">{acc.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      {relatedProducts.length > 0 && (
        <section className="py-12 border-t border-gray-200">
          <h2 className="text-xl font-medium mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onWishlistToggle={toggleItem} isWishlisted={isInWishlist(p.id)} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="py-12 border-t border-gray-200">
          <h2 className="text-xl font-medium mb-6">Recently Viewed</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {recentlyViewed.map((item) => {
              const p = products.find((prod) => prod.id === item.productId);
              return p ? (
                <div key={p.id} className="flex-shrink-0 w-48">
                  <ProductCard product={p} />
                </div>
              ) : null;
            })}
          </div>
        </section>
      )}

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        gender={product.gender}
        category={product.subcategory}
      />
    </div>
  );
}
