"use client";
import { useState, useEffect, useMemo } from "react";
import { FiSearch, FiAlertTriangle, FiPackage } from "react-icons/fi";
import toast from "react-hot-toast";
import { fetchProducts, updateProductStock } from "@/lib/firestore";

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQ, setSearchQ] = useState("");
  const [filterStock, setFilterStock] = useState("all");
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [saving, setSaving] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setInventory(data.map((p) => ({ ...p, variants: (p.variants || []).map((v) => ({ ...v })) })));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalUnits = useMemo(
    () => inventory.reduce((sum, p) => sum + (p.variants || []).reduce((s, v) => s + (v.stock || 0), 0), 0),
    [inventory]
  );
  const lowStockCount = useMemo(
    () => inventory.filter((p) => (p.variants || []).some((v) => v.stock > 0 && v.stock <= 5)).length,
    [inventory]
  );
  const outOfStockCount = useMemo(
    () => inventory.filter((p) => (p.variants || []).every((v) => (v.stock || 0) === 0)).length,
    [inventory]
  );

  const filtered = useMemo(() => {
    let res = [...inventory];
    if (searchQ) {
      const q = searchQ.toLowerCase();
      res = res.filter((p) => p.name?.toLowerCase().includes(q) || p.id?.includes(q));
    }
    if (filterStock === "low") res = res.filter((p) => (p.variants || []).some((v) => v.stock > 0 && v.stock <= 5));
    if (filterStock === "out") res = res.filter((p) => (p.variants || []).every((v) => (v.stock || 0) === 0));
    return res;
  }, [inventory, searchQ, filterStock]);

  const updateStock = async (productId, variantIdx, newStock) => {
    const stock = Math.max(0, parseInt(newStock) || 0);
    const product = inventory.find((p) => p.id === productId);
    if (!product) return;
    const newVariants = product.variants.map((v, i) => (i === variantIdx ? { ...v, stock } : v));
    setInventory((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, variants: newVariants } : p))
    );
  };

  const saveProductStock = async (productId) => {
    const product = inventory.find((p) => p.id === productId);
    if (!product) return;
    setSaving(productId);
    try {
      await updateProductStock(productId, product.variants);
      toast.success("Stock updated in database");
    } catch {
      toast.error("Failed to save stock");
    }
    setSaving(null);
  };

  const bulkUpdateStock = (productId, amount) => {
    setInventory((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, variants: p.variants.map((v) => ({ ...v, stock: Math.max(0, (v.stock || 0) + amount) })) }
          : p
      )
    );
    toast.success(`Stock ${amount > 0 ? "increased" : "decreased"} by ${Math.abs(amount)} (save to persist)`);
  };

  if (loading) return <div className="py-20 text-center text-sm text-gray-400">Loading inventory...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Inventory</h1>
          <p className="text-xs text-gray-500">Manage stock levels for all products (connected to database)</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white border border-gray-200 p-4 rounded-sm">
          <div className="flex items-center gap-2 mb-1">
            <FiPackage size={16} className="text-gray-500" />
            <p className="text-xs text-gray-500">Total Units</p>
          </div>
          <p className="text-2xl font-semibold">{totalUnits.toLocaleString()}</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-sm cursor-pointer" onClick={() => setFilterStock("low")}>
          <div className="flex items-center gap-2 mb-1">
            <FiAlertTriangle size={16} className="text-orange-500" />
            <p className="text-xs text-orange-600">Low Stock</p>
          </div>
          <p className="text-2xl font-semibold text-orange-700">{lowStockCount}</p>
        </div>
        <div className="bg-red-50 border border-red-200 p-4 rounded-sm cursor-pointer" onClick={() => setFilterStock("out")}>
          <div className="flex items-center gap-2 mb-1">
            <FiAlertTriangle size={16} className="text-red-500" />
            <p className="text-xs text-red-600">Out of Stock</p>
          </div>
          <p className="text-2xl font-semibold text-red-700">{outOfStockCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={searchQ} onChange={(e) => setSearchQ(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2 border border-gray-300 text-xs focus:border-black" />
        </div>
        <div className="flex gap-1">
          {[
            { value: "all", label: "All" },
            { value: "low", label: "Low Stock" },
            { value: "out", label: "Out of Stock" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilterStock(opt.value)}
              className={`px-3 py-1.5 text-xs font-medium border ${
                filterStock === opt.value ? "bg-black text-white border-black" : "border-gray-300 hover:border-black"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-12">No products found. Seed products first from the Seed page.</p>
      )}

      {/* Inventory List */}
      <div className="space-y-2">
        {filtered.map((product) => {
          const totalStock = (product.variants || []).reduce((s, v) => s + (v.stock || 0), 0);
          const hasLow = (product.variants || []).some((v) => v.stock > 0 && v.stock <= 5);
          const allOut = (product.variants || []).every((v) => (v.stock || 0) === 0);
          const isExpanded = expandedProduct === product.id;

          return (
            <div key={product.id} className="bg-white border border-gray-200 rounded-sm">
              <button
                onClick={() => setExpandedProduct(isExpanded ? null : product.id)}
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-sm flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] text-gray-400 font-bold">CK</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{product.name}</p>
                  <p className="text-[10px] text-gray-500">{product.category} · {product.gender} · {(product.variants || []).length} variants</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${allOut ? "text-red-600" : hasLow ? "text-orange-500" : ""}`}>
                      {totalStock}
                    </p>
                    <p className="text-[10px] text-gray-500">units</p>
                  </div>
                  {hasLow && !allOut && (
                    <span className="bg-orange-100 text-orange-700 text-[10px] font-medium px-1.5 py-0.5 rounded-sm">LOW</span>
                  )}
                  {allOut && (
                    <span className="bg-red-100 text-red-700 text-[10px] font-medium px-1.5 py-0.5 rounded-sm">OUT</span>
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-gray-100 p-4 animate-fade-in">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-xs font-medium">Quick adjust all:</span>
                    <button onClick={() => bulkUpdateStock(product.id, 10)} className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-sm hover:bg-green-200">+10</button>
                    <button onClick={() => bulkUpdateStock(product.id, 5)} className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-sm hover:bg-green-200">+5</button>
                    <button onClick={() => bulkUpdateStock(product.id, -5)} className="text-[10px] bg-red-100 text-red-700 px-2 py-1 rounded-sm hover:bg-red-200">-5</button>
                    <button
                      onClick={() => saveProductStock(product.id)}
                      disabled={saving === product.id}
                      className="ml-auto text-[10px] bg-black text-white px-3 py-1 rounded-sm hover:bg-gray-900 disabled:opacity-50"
                    >
                      {saving === product.id ? "Saving..." : "Save to DB"}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {(product.variants || []).map((v, i) => (
                      <div key={i} className="flex items-center gap-2 bg-gray-50 p-2 rounded-sm">
                        <span className="w-4 h-4 rounded-full flex-shrink-0 border border-gray-200" style={{ backgroundColor: v.colorHex }} />
                        <span className="text-[10px] text-gray-600 flex-1 truncate">{v.color} / {v.size}</span>
                        <input
                          type="number"
                          value={v.stock || 0}
                          onChange={(e) => updateStock(product.id, i, e.target.value)}
                          className={`w-16 text-center text-xs border py-1 focus:border-black ${
                            (v.stock || 0) === 0 ? "border-red-300 bg-red-50" : v.stock <= 5 ? "border-orange-300 bg-orange-50" : "border-gray-300 bg-white"
                          }`}
                          min="0"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
