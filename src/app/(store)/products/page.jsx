"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiChevronDown, FiX, FiFilter } from "react-icons/fi";
import { useProducts } from "@/context/ProductsContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/shared/ProductCard";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "best-selling", label: "Best Selling" },
];

const PRICE_RANGES = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 – $100", min: 50, max: 100 },
  { label: "$100 – $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Infinity },
];

function ProductsPage() {
  const searchParams = useSearchParams();
  const { toggleItem, isInWishlist } = useWishlist();
  const { products, loading: productsLoading } = useProducts();

  const qGender = searchParams.get("gender") || "";
  const qCategory = searchParams.get("category") || "";
  const qSubcategory = searchParams.get("subcategory") || "";
  const qSearch = searchParams.get("search") || "";
  const qTag = searchParams.get("tag") || "";
  const qSale = searchParams.get("sale") === "true";
  const qSort = searchParams.get("sort") || "featured";

  const [filterGender, setFilterGender] = useState(qGender);
  const [filterCategory, setFilterCategory] = useState(qCategory);
  const [filterSize, setFilterSize] = useState("");
  const [filterColor, setFilterColor] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [sortBy, setSortBy] = useState(qSort);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState("");

  useEffect(() => {
    setFilterGender(qGender);
    setFilterCategory(qCategory);
  }, [qGender, qCategory]);

  const allColors = useMemo(() => [...new Set(products.flatMap((p) => p.variants.map((v) => v.color)))].sort(), [products]);
  const allSizes = useMemo(() => [...new Set(products.flatMap((p) => p.variants.map((v) => v.size)))], [products]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (qSearch) {
      const q = qSearch.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q))
      );
    }

    if (filterGender) result = result.filter((p) => p.gender === filterGender);
    if (filterCategory) result = result.filter((p) => p.category === filterCategory);
    if (qSubcategory) result = result.filter((p) => p.subcategory === qSubcategory);
    if (qTag) {
      if (qTag === "new") result = result.filter((p) => p.isNew);
      else result = result.filter((p) => p.tags.includes(qTag));
    }
    if (qSale) result = result.filter((p) => p.salePrice);
    if (filterSize) result = result.filter((p) => p.variants.some((v) => v.size === filterSize));
    if (filterColor) result = result.filter((p) => p.variants.some((v) => v.color === filterColor));
    if (filterPrice) {
      const range = PRICE_RANGES.find((r) => r.label === filterPrice);
      if (range) {
        result = result.filter((p) => {
          const price = p.salePrice || p.price;
          return price >= range.min && price < range.max;
        });
      }
    }

    switch (sortBy) {
      case "newest": result.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); break;
      case "price-low": result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price)); break;
      case "price-high": result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price)); break;
      case "best-selling": result.sort((a, b) => b.reviewCount - a.reviewCount); break;
      default: break;
    }

    return result;
  }, [products, filterGender, filterCategory, filterSize, filterColor, filterPrice, sortBy, qSearch, qSubcategory, qTag, qSale]);

  const activeFilters = [
    filterGender && { label: filterGender, clear: () => setFilterGender("") },
    filterCategory && { label: filterCategory, clear: () => setFilterCategory("") },
    filterSize && { label: `Size: ${filterSize}`, clear: () => setFilterSize("") },
    filterColor && { label: filterColor, clear: () => setFilterColor("") },
    filterPrice && { label: filterPrice, clear: () => setFilterPrice("") },
  ].filter(Boolean);

  const clearAll = () => {
    setFilterGender("");
    setFilterCategory("");
    setFilterSize("");
    setFilterColor("");
    setFilterPrice("");
  };

  const pageTitle = qSearch
    ? `Search: "${qSearch}"`
    : filterGender
    ? `${filterGender}'s ${filterCategory || "Clothing + Accessories"}`
    : filterCategory || "All Products";

  const breadcrumbItems = [];
  if (filterGender) breadcrumbItems.push({ label: filterGender, href: `/products?gender=${filterGender}` });
  if (filterCategory) breadcrumbItems.push({ label: filterCategory });
  if (!filterGender && !filterCategory) breadcrumbItems.push({ label: "All Products" });

  const FilterDropdown = ({ label, options, value, onChange, renderOption }) => (
    <div className="relative">
      <button
        onClick={() => setOpenFilter(openFilter === label ? "" : label)}
        className="flex items-center gap-1.5 px-3 py-2 border border-gray-300 text-xs font-medium hover:border-black transition-colors"
      >
        {label} {value && <span className="text-gray-500">({typeof value === "string" ? 1 : value})</span>}
        <FiChevronDown size={14} className={`transition-transform ${openFilter === label ? "rotate-180" : ""}`} />
      </button>
      {openFilter === label && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg rounded-sm min-w-[180px] max-h-60 overflow-y-auto z-30 py-1">
          {options.map((opt) => (
            <button
              key={typeof opt === "string" ? opt : opt.label}
              onClick={() => { onChange(typeof opt === "string" ? opt : opt.value || opt.label); setOpenFilter(""); }}
              className={`block w-full text-left px-4 py-2 text-xs hover:bg-gray-50 ${
                value === (typeof opt === "string" ? opt : opt.value || opt.label) ? "font-bold bg-gray-50" : ""
              }`}
            >
              {renderOption ? renderOption(opt) : typeof opt === "string" ? opt : opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  if (productsLoading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-20 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 w-48 mx-auto mb-8 rounded" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="aspect-[3/4] bg-gray-100 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-6">
      <Breadcrumbs items={breadcrumbItems} />

      <h1 className="text-2xl md:text-3xl font-medium mb-6">{pageTitle}</h1>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-gray-200">
        {/* Mobile filter button */}
        <button
          className="md:hidden flex items-center gap-2 px-3 py-2 border border-gray-300 text-xs font-medium"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <FiFilter size={14} /> Filters
        </button>

        {/* Desktop filters */}
        <div className="hidden md:flex items-center gap-2 flex-wrap">
          <FilterDropdown
            label="Category"
            options={["Tops", "Bottoms", "Outerwear", "Underwear"]}
            value={filterCategory}
            onChange={setFilterCategory}
          />
          <FilterDropdown
            label="Price"
            options={PRICE_RANGES.map((r) => r.label)}
            value={filterPrice}
            onChange={setFilterPrice}
          />
          <FilterDropdown
            label="Color"
            options={allColors}
            value={filterColor}
            onChange={setFilterColor}
          />
          <FilterDropdown
            label="Size"
            options={allSizes}
            value={filterSize}
            onChange={setFilterSize}
          />
          {!filterGender && (
            <FilterDropdown
              label="Gender"
              options={["Men", "Women", "Kids"]}
              value={filterGender}
              onChange={setFilterGender}
            />
          )}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-gray-500">{filtered.length} Items</span>
          <span className="text-gray-300">|</span>
          <span className="text-xs text-gray-500">Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-medium border border-gray-300 px-2 py-1.5 bg-white cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {activeFilters.map((f) => (
            <button
              key={f.label}
              onClick={f.clear}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-xs font-medium rounded-sm hover:bg-gray-200"
            >
              {f.label} <FiX size={12} />
            </button>
          ))}
          <button onClick={clearAll} className="text-xs underline text-gray-500 hover:text-black">
            Clear all
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg font-medium mb-2">No products found</p>
          <p className="text-sm text-gray-500 mb-6">Try adjusting your filters or search terms</p>
          <Link href="/products" className="inline-block bg-black text-white px-6 py-2.5 text-sm font-medium">
            View All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-16">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onWishlistToggle={toggleItem}
              isWishlisted={isInWishlist(product.id)}
            />
          ))}
        </div>
      )}

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-semibold">Filters</span>
              <button onClick={() => setMobileFiltersOpen(false)}><FiX size={20} /></button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-xs font-medium block mb-2">Category</label>
                {["Tops", "Bottoms", "Outerwear", "Underwear"].map((c) => (
                  <button key={c} onClick={() => setFilterCategory(filterCategory === c ? "" : c)}
                    className={`block w-full text-left py-1.5 text-sm ${filterCategory === c ? "font-bold" : "text-gray-600"}`}
                  >{c}</button>
                ))}
              </div>
              <div>
                <label className="text-xs font-medium block mb-2">Gender</label>
                {["Men", "Women", "Kids"].map((g) => (
                  <button key={g} onClick={() => setFilterGender(filterGender === g ? "" : g)}
                    className={`block w-full text-left py-1.5 text-sm ${filterGender === g ? "font-bold" : "text-gray-600"}`}
                  >{g}</button>
                ))}
              </div>
              <div>
                <label className="text-xs font-medium block mb-2">Price</label>
                {PRICE_RANGES.map((r) => (
                  <button key={r.label} onClick={() => setFilterPrice(filterPrice === r.label ? "" : r.label)}
                    className={`block w-full text-left py-1.5 text-sm ${filterPrice === r.label ? "font-bold" : "text-gray-600"}`}
                  >{r.label}</button>
                ))}
              </div>
              <button
                onClick={() => { clearAll(); setMobileFiltersOpen(false); }}
                className="w-full bg-black text-white py-2.5 text-sm font-medium mt-4"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPageWrapper() {
  return (
    <Suspense fallback={<div className="max-w-[1440px] mx-auto px-4 md:px-6 py-12 text-center text-sm text-gray-400">Loading products...</div>}>
      <ProductsPage />
    </Suspense>
  );
}
