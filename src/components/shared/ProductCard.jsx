import Link from "next/link";
import { FiHeart } from "react-icons/fi";

export default function ProductCard({ product, onWishlistToggle, isWishlisted }) {
  const effectivePrice = product.salePrice || product.price;
  const colors = [...new Set(product.variants.map((v) => v.color))];

  return (
    <div className="group relative">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block aspect-[3/4] bg-gray-100 overflow-hidden mb-3 relative">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
        ) : null}
        <div className={`w-full h-full items-center justify-center text-gray-400 text-xs bg-gray-50 ${product.images && product.images.length > 0 ? 'hidden' : 'flex'}`}>
          <div className="text-center p-4">
            <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-300">AV</div>
            <p className="text-[11px] text-gray-400 line-clamp-2">{product.name}</p>
          </div>
        </div>
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-medium px-2 py-0.5 tracking-wide">NEW</span>
        )}
        {product.isBestSeller && (
          <span className="absolute top-2 left-2 bg-white text-black text-[10px] font-medium px-2 py-0.5 tracking-wide border">BEST SELLER</span>
        )}
      </Link>

      {/* Wishlist */}
      {onWishlistToggle && (
        <button
          onClick={() => onWishlistToggle(product)}
          className="absolute top-2 right-2 z-10 p-1.5 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FiHeart size={16} className={isWishlisted ? "fill-black text-black" : "text-gray-400"} />
        </button>
      )}

      {/* Info */}
      <Link href={`/products/${product.slug}`}>
        <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
      </Link>

      {/* Price */}
      <div className="flex items-center gap-2 mb-1.5">
        {product.salePrice ? (
          <>
            <span className="text-sm text-gray-400 line-through">${product.price.toFixed(2)}</span>
            <span className="text-sm font-medium text-black">${product.salePrice.toFixed(2)}</span>
            <span className="text-xs text-red-600 font-medium">{product.discount}% off</span>
          </>
        ) : (
          <span className="text-sm font-medium text-black">${product.price.toFixed(2)}</span>
        )}
      </div>

      {/* Colors */}
      {colors.length > 1 && (
        <div className="flex items-center gap-1.5">
          {colors.slice(0, 5).map((c) => {
            const hex = product.variants.find((v) => v.color === c)?.colorHex || "#ccc";
            return (
              <span
                key={c}
                className="w-3.5 h-3.5 rounded-full border border-gray-200"
                style={{ backgroundColor: hex }}
                title={c}
              />
            );
          })}
          {colors.length > 5 && (
            <span className="text-[10px] text-gray-500">+{colors.length - 5}</span>
          )}
        </div>
      )}

      {/* Rating */}
      {product.reviewCount > 0 && (
        <div className="flex items-center gap-1 mt-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} className={`w-3 h-3 ${s <= Math.round(product.rating) ? "text-black" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[10px] text-gray-500">({product.reviewCount})</span>
        </div>
      )}
    </div>
  );
}
