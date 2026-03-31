"use client";
import { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiTag } from "react-icons/fi";
import toast from "react-hot-toast";
import { fetchPromoCodes, addPromoCode, updatePromoCode, deletePromoCode } from "@/lib/firestore";

export default function AdminPromotionsPage() {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editPromo, setEditPromo] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ code: "", type: "percentage", value: "", minPurchase: "", description: "", freeShipping: false });

  useEffect(() => {
    fetchPromoCodes()
      .then((data) => { setPromos(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const openAdd = () => {
    setEditPromo(null);
    setForm({ code: "", type: "percentage", value: "", minPurchase: "", description: "", freeShipping: false });
    setShowModal(true);
  };

  const openEdit = (promo) => {
    setEditPromo(promo);
    setForm({
      code: promo.code,
      type: promo.type,
      value: promo.value.toString(),
      minPurchase: (promo.minPurchase || 0).toString(),
      description: promo.description,
      freeShipping: promo.freeShipping || false,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.code || !form.description) {
      toast.error("Code and description are required");
      return;
    }
    setSaving(true);
    const data = {
      code: form.code.toUpperCase(),
      type: form.type,
      value: parseFloat(form.value) || 0,
      minPurchase: parseFloat(form.minPurchase) || 0,
      description: form.description,
      freeShipping: form.freeShipping,
      active: editPromo?.active !== undefined ? editPromo.active : true,
    };
    try {
      if (editPromo) {
        await updatePromoCode(editPromo.id, data);
        setPromos((prev) => prev.map((p) => p.id === editPromo.id ? { ...p, ...data } : p));
        toast.success("Promotion updated");
      } else {
        const result = await addPromoCode(data);
        setPromos((prev) => [...prev, result]);
        toast.success("Promotion created");
      }
    } catch {
      toast.error("Failed to save promotion");
    }
    setSaving(false);
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this promotion?")) return;
    try {
      await deletePromoCode(id);
      setPromos((prev) => prev.filter((p) => p.id !== id));
      toast.success("Promotion deleted");
    } catch {
      toast.error("Failed to delete promotion");
    }
  };

  const toggleActive = async (id) => {
    const promo = promos.find((p) => p.id === id);
    if (!promo) return;
    const newActive = !promo.active;
    try {
      await updatePromoCode(id, { active: newActive });
      setPromos((prev) => prev.map((p) => p.id === id ? { ...p, active: newActive } : p));
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (loading) return <div className="py-20 text-center text-sm text-gray-400">Loading promotions...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Promotions</h1>
          <p className="text-xs text-gray-500">{promos.length} promo codes</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-1.5 bg-black text-white px-4 py-2 text-xs font-medium hover:bg-gray-900">
          <FiPlus size={14} /> Create Promo
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white border border-gray-200 p-4 rounded-sm">
          <p className="text-xl font-semibold">{promos.length}</p>
          <p className="text-xs text-gray-500">Total Codes</p>
        </div>
        <div className="bg-green-50 border border-green-200 p-4 rounded-sm">
          <p className="text-xl font-semibold text-green-700">{promos.filter((p) => p.active).length}</p>
          <p className="text-xs text-green-600">Active</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-sm">
          <p className="text-xl font-semibold text-gray-400">{promos.filter((p) => !p.active).length}</p>
          <p className="text-xs text-gray-500">Inactive</p>
        </div>
      </div>

      {/* Promo list */}
      <div className="bg-white border border-gray-200 rounded-sm">
        {promos.length === 0 ? (
          <p className="text-sm text-gray-400 p-6 text-center">No promotions created yet</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {promos.map((promo) => (
              <div key={promo.id} className="p-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-sm flex items-center justify-center ${promo.active ? "bg-green-50" : "bg-gray-100"}`}>
                  <FiTag size={18} className={promo.active ? "text-green-600" : "text-gray-400"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-bold font-mono">{promo.code}</span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-sm ${promo.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {promo.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{promo.description}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded-sm">
                      {promo.type === "percentage" ? `${promo.value}% off` : `$${promo.value} off`}
                    </span>
                    {promo.minPurchase > 0 && (
                      <span className="text-[10px] text-gray-400">Min. ${promo.minPurchase}</span>
                    )}
                    {promo.freeShipping && (
                      <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-sm">Free Shipping</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => toggleActive(promo.id)}
                    className={`text-xs px-2 py-1 rounded-sm ${promo.active ? "text-gray-500 hover:bg-gray-100" : "text-green-600 hover:bg-green-50"}`}>
                    {promo.active ? "Deactivate" : "Activate"}
                  </button>
                  <button onClick={() => openEdit(promo)} className="p-1.5 text-gray-400 hover:text-black"><FiEdit2 size={14} /></button>
                  <button onClick={() => handleDelete(promo.id)} className="p-1.5 text-gray-400 hover:text-red-600"><FiTrash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative bg-white w-full max-w-md rounded-sm">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-lg font-semibold">{editPromo ? "Edit Promotion" : "Create Promotion"}</h2>
              <button onClick={() => setShowModal(false)}><FiX size={20} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1">Promo Code *</label>
                <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })}
                  placeholder="e.g. SAVE20"
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black uppercase font-mono" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Description *</label>
                <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="e.g. 20% off orders over $100"
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1">Discount Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-2 text-sm bg-white focus:border-black">
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount ($)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Value</label>
                  <input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })}
                    placeholder={form.type === "percentage" ? "e.g. 20" : "e.g. 10"}
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Minimum Purchase ($)</label>
                <input type="number" value={form.minPurchase} onChange={(e) => setForm({ ...form, minPurchase: e.target.value })}
                  placeholder="0 for no minimum"
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black" />
              </div>
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" checked={form.freeShipping} onChange={(e) => setForm({ ...form, freeShipping: e.target.checked })} className="accent-black" />
                Includes free shipping
              </label>
            </div>
            <div className="flex items-center justify-end gap-3 p-5 border-t">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-xs text-gray-500 hover:text-black">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-black text-white text-xs font-medium hover:bg-gray-900 disabled:opacity-50">
                {saving ? "Saving..." : editPromo ? "Save Changes" : "Create Promo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
