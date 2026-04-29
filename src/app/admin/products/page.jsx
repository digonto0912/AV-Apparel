"use client";
import { useState, useMemo, useEffect } from "react";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "@/lib/firestore";

const CATEGORIES = [
  { name: "Tops", subcategories: ["T-Shirts", "Sweatshirts", "Dress Shirts", "Dresses"] },
  { name: "Bottoms", subcategories: ["Jeans"] },
  { name: "Outerwear", subcategories: ["Jackets"] },
  { name: "Underwear", subcategories: ["Boxer Briefs", "Trunks", "Bralettes", "Bikinis", "Sleepwear"] },
];
const GENDERS = ["Men", "Women", "Kids"];

export default function AdminProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQ, setSearchQ] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(getEmptyForm());

  function getEmptyForm() {
    return {
      name: "", slug: "", category: "", subcategory: "", gender: "Men",
      description: "", details: "", materials: "",
      price: "", salePrice: "", discount: "",
      images: [""],
      isBestSeller: false, isNew: false,
      tags: "",
      variants: [{ size: "", color: "", colorHex: "#111111", stock: "" }],
    };
  }

  useEffect(() => {
    fetchProducts().then((data) => {
      setAllProducts(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let res = [...allProducts];
    if (searchQ) {
      const q = searchQ.toLowerCase();
      res = res.filter((p) => p.name.toLowerCase().includes(q) || p.id.includes(q));
    }
    if (filterCategory) res = res.filter((p) => p.category === filterCategory);
    if (filterGender) res = res.filter((p) => p.gender === filterGender);
    return res;
  }, [allProducts, searchQ, filterCategory, filterGender]);

  const openAdd = () => {
    setEditProduct(null);
    setForm(getEmptyForm());
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditProduct(product);
    setForm({
      name: product.name,
      slug: product.slug,
      category: product.category,
      subcategory: product.subcategory || "",
      gender: product.gender,
      description: product.description || "",
      details: product.details || "",
      materials: product.materials || "",
      price: product.price?.toString() || "",
      salePrice: product.salePrice ? product.salePrice.toString() : "",
      discount: product.discount ? product.discount.toString() : "",
      images: product.images?.length ? [...product.images] : [""],
      isBestSeller: product.isBestSeller || false,
      isNew: product.isNew || false,
      tags: (product.tags || []).join(", "),
      variants: (product.variants || []).map((v) => ({ ...v, stock: v.stock?.toString() || "0" })),
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.category || !form.gender || !form.price) {
      toast.error("Name, category, gender, and price are required");
      return;
    }
    setSaving(true);
    const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const productData = {
      slug,
      name: form.name,
      category: form.category,
      subcategory: form.subcategory,
      gender: form.gender,
      description: form.description,
      details: form.details,
      materials: form.materials,
      price: parseFloat(form.price) || 0,
      salePrice: form.salePrice ? parseFloat(form.salePrice) : null,
      discount: form.discount ? parseInt(form.discount) : 0,
      images: form.images.filter((i) => i.trim()),
      variants: form.variants
        .filter((v) => v.size && v.color)
        .map((v) => ({ ...v, stock: parseInt(v.stock) || 0 })),
      isBestSeller: form.isBestSeller,
      isNew: form.isNew,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      rating: editProduct?.rating || 0,
      reviewCount: editProduct?.reviewCount || 0,
      createdAt: editProduct?.createdAt || new Date().toISOString().split("T")[0],
    };

    try {
      if (editProduct) {
        await updateProduct(editProduct.id, productData);
        setAllProducts((prev) => prev.map((p) => p.id === editProduct.id ? { ...p, ...productData } : p));
        toast.success("Product updated in database");
      } else {
        const newProd = await addProduct(productData);
        setAllProducts((prev) => [newProd, ...prev]);
        toast.success("Product added to database");
      }
    } catch (err) {
      toast.error("Failed to save: " + err.message);
    }
    setSaving(false);
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product from the database?")) return;
    try {
      await deleteProduct(id);
      setAllProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted from database");
    } catch (err) {
      toast.error("Failed to delete: " + err.message);
    }
  };

  const addVariant = () => {
    setForm((f) => ({ ...f, variants: [...f.variants, { size: "", color: "", colorHex: "#111111", stock: "" }] }));
  };

  const updateVariant = (idx, field, value) => {
    setForm((f) => ({
      ...f,
      variants: f.variants.map((v, i) => i === idx ? { ...v, [field]: value } : v),
    }));
  };

  const removeVariant = (idx) => {
    setForm((f) => ({ ...f, variants: f.variants.filter((_, i) => i !== idx) }));
  };

  const addImageField = () => {
    setForm((f) => ({ ...f, images: [...f.images, ""] }));
  };

  const updateImage = (idx, value) => {
    setForm((f) => ({ ...f, images: f.images.map((img, i) => i === idx ? value : img) }));
  };

  const removeImage = (idx) => {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));
  };

  if (loading) return <div className="py-20 text-center text-sm text-gray-400">Loading products from database...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold">Products</h1>
          <p className="text-xs text-gray-500">{allProducts.length} products in database</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-1.5 bg-black text-white px-4 py-2 text-xs font-medium hover:bg-gray-900">
          <FiPlus size={14} /> Add Product
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={searchQ} onChange={(e) => setSearchQ(e.target.value)} placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2 border border-gray-300 text-xs focus:border-black" />
        </div>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
          className="border border-gray-300 px-3 py-2 text-xs bg-white">
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
        </select>
        <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)}
          className="border border-gray-300 px-3 py-2 text-xs bg-white">
          <option value="">All Genders</option>
          {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left p-3 font-medium text-gray-600">Product</th>
              <th className="text-left p-3 font-medium text-gray-600">Category</th>
              <th className="text-left p-3 font-medium text-gray-600">Price</th>
              <th className="text-left p-3 font-medium text-gray-600">Stock</th>
              <th className="text-left p-3 font-medium text-gray-600">Status</th>
              <th className="text-right p-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((product) => {
              const totalStock = (product.variants || []).reduce((s, v) => s + (v.stock || 0), 0);
              const colorCount = [...new Set((product.variants || []).map((v) => v.color))].length;
              return (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-sm flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] text-gray-400 font-bold">AV</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate max-w-[200px]">{product.name}</p>
                        <p className="text-[10px] text-gray-500">{product.gender} · {colorCount} color{colorCount > 1 ? "s" : ""}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-gray-600">{product.category}</td>
                  <td className="p-3">
                    {product.salePrice ? (
                      <div>
                        <span className="text-gray-400 line-through">${product.price}</span>
                        <span className="ml-1 font-medium">${product.salePrice}</span>
                      </div>
                    ) : (
                      <span className="font-medium">${product.price}</span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className={totalStock <= 10 ? "text-orange-600 font-medium" : ""}>{totalStock}</span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      {product.isNew && <span className="bg-black text-white px-1.5 py-0.5 text-[10px]">NEW</span>}
                      {product.isBestSeller && <span className="bg-gray-200 px-1.5 py-0.5 text-[10px]">BEST</span>}
                      {product.salePrice && <span className="bg-red-100 text-red-700 px-1.5 py-0.5 text-[10px]">SALE</span>}
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(product)} className="p-1.5 text-gray-400 hover:text-black"><FiEdit2 size={14} /></button>
                      <button onClick={() => handleDelete(product.id)} className="p-1.5 text-gray-400 hover:text-red-600"><FiTrash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative bg-white w-full max-w-2xl my-8 rounded-sm">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-lg font-semibold">{editProduct ? "Edit Product" : "Add New Product"}</h2>
              <button onClick={() => setShowModal(false)}><FiX size={20} /></button>
            </div>
            <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium mb-1">Product Name *</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Category *</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-2 text-sm bg-white focus:border-black">
                    <option value="">Select</option>
                    {CATEGORIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Subcategory</label>
                  <input value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Gender *</label>
                  <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-2 text-sm bg-white focus:border-black">
                    {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Slug</label>
                  <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated"
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3} className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black resize-none" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1">Price *</label>
                  <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Sale Price</label>
                  <input type="number" step="0.01" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Discount %</label>
                  <input type="number" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black" />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-xs">
                  <input type="checkbox" checked={form.isNew} onChange={(e) => setForm({ ...form, isNew: e.target.checked })} className="accent-black" /> New Arrival
                </label>
                <label className="flex items-center gap-2 text-xs">
                  <input type="checkbox" checked={form.isBestSeller} onChange={(e) => setForm({ ...form, isBestSeller: e.target.checked })} className="accent-black" /> Best Seller
                </label>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Tags (comma separated)</label>
                <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="spring, denim"
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black" />
              </div>
              {/* Image URLs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium">Product Images</label>
                  <button type="button" onClick={addImageField} className="text-xs text-gray-500 hover:text-black flex items-center gap-1"><FiPlus size={12} /> Add Image</button>
                </div>
                <div className="space-y-2">
                  {form.images.map((img, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        value={img}
                        onChange={(e) => updateImage(i, e.target.value)}
                        placeholder="Image URL (e.g. https://example.com/image.jpg)"
                        className="flex-1 border border-gray-300 px-3 py-2 text-xs focus:border-black"
                      />
                      {img && (
                        <div className="w-10 h-10 border border-gray-200 rounded-sm overflow-hidden flex-shrink-0">
                          <img src={img} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                        </div>
                      )}
                      {form.images.length > 1 && (
                        <button type="button" onClick={() => removeImage(i)} className="text-gray-400 hover:text-red-500 flex-shrink-0"><FiX size={14} /></button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Add image URLs for the product gallery. First image is the main product image.</p>
              </div>
              {/* Details & Materials */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1">Details</label>
                  <textarea value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })}
                    rows={3} placeholder="Product details..." className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Materials</label>
                  <textarea value={form.materials} onChange={(e) => setForm({ ...form, materials: e.target.value })}
                    rows={3} placeholder="Material composition..." className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black resize-none" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium">Variants</label>
                  <button onClick={addVariant} className="text-xs text-gray-500 hover:text-black flex items-center gap-1"><FiPlus size={12} /> Add</button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {form.variants.map((v, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input value={v.size} onChange={(e) => updateVariant(i, "size", e.target.value)} placeholder="Size"
                        className="w-16 border border-gray-300 px-2 py-1.5 text-xs focus:border-black" />
                      <input value={v.color} onChange={(e) => updateVariant(i, "color", e.target.value)} placeholder="Color"
                        className="flex-1 border border-gray-300 px-2 py-1.5 text-xs focus:border-black" />
                      <input type="color" value={v.colorHex} onChange={(e) => updateVariant(i, "colorHex", e.target.value)}
                        className="w-8 h-8 border border-gray-300 cursor-pointer p-0" />
                      <input type="number" value={v.stock} onChange={(e) => updateVariant(i, "stock", e.target.value)} placeholder="Stock"
                        className="w-16 border border-gray-300 px-2 py-1.5 text-xs focus:border-black" />
                      <button onClick={() => removeVariant(i)} className="text-gray-400 hover:text-red-500"><FiX size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-5 border-t">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-xs text-gray-500 hover:text-black">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-black text-white text-xs font-medium hover:bg-gray-900 disabled:opacity-50">
                {saving ? "Saving..." : editProduct ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
