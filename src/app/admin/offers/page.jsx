"use client";
import { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSpeaker } from "react-icons/fi";
import toast from "react-hot-toast";
import { fetchSiteOffers, addSiteOffer, updateSiteOffer, deleteSiteOffer } from "@/lib/firestore";

export default function AdminOffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editOffer, setEditOffer] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    text: "",
    linkWomen: "/products?gender=Women&sale=true",
    linkMen: "/products?gender=Men&sale=true",
    discountType: "percentage",
    discountValue: "",
    discountScope: "sitewide",
    excludeCategories: "",
  });

  useEffect(() => {
    fetchSiteOffers()
      .then((data) => { setOffers(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const openAdd = () => {
    setEditOffer(null);
    setForm({
      text: "",
      linkWomen: "/products?gender=Women&sale=true",
      linkMen: "/products?gender=Men&sale=true",
      discountType: "percentage",
      discountValue: "",
      discountScope: "sitewide",
      excludeCategories: "",
    });
    setShowModal(true);
  };

  const openEdit = (offer) => {
    setEditOffer(offer);
    setForm({
      text: offer.text || "",
      linkWomen: offer.linkWomen || "",
      linkMen: offer.linkMen || "",
      discountType: offer.discountType || "percentage",
      discountValue: (offer.discountValue || "").toString(),
      discountScope: offer.discountScope || "sitewide",
      excludeCategories: (offer.excludeCategories || []).join(", "),
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.text.trim()) { toast.error("Offer text is required"); return; }
    setSaving(true);
    const data = {
      text: form.text,
      linkWomen: form.linkWomen,
      linkMen: form.linkMen,
      discountType: form.discountType,
      discountValue: parseFloat(form.discountValue) || 0,
      discountScope: form.discountScope,
      excludeCategories: form.excludeCategories.split(",").map((s) => s.trim()).filter(Boolean),
      active: editOffer?.active !== undefined ? editOffer.active : true,
      updatedAt: new Date().toISOString(),
    };
    try {
      if (editOffer) {
        await updateSiteOffer(editOffer.id, data);
        setOffers((prev) => prev.map((o) => o.id === editOffer.id ? { ...o, ...data } : o));
        toast.success("Offer updated");
      } else {
        data.createdAt = new Date().toISOString();
        const result = await addSiteOffer(data);
        setOffers((prev) => [...prev, result]);
        toast.success("Offer created");
      }
    } catch {
      toast.error("Failed to save offer");
    }
    setSaving(false);
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this offer?")) return;
    try {
      await deleteSiteOffer(id);
      setOffers((prev) => prev.filter((o) => o.id !== id));
      toast.success("Offer deleted");
    } catch {
      toast.error("Failed to delete offer");
    }
  };

  const toggleActive = async (id) => {
    const offer = offers.find((o) => o.id === id);
    if (!offer) return;
    const newActive = !offer.active;
    try {
      await updateSiteOffer(id, { active: newActive });
      setOffers((prev) => prev.map((o) => o.id === id ? { ...o, active: newActive } : o));
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (loading) return <div className="py-20 text-center text-sm text-gray-400">Loading offers...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Site Offers</h1>
          <p className="text-sm text-gray-500 mt-1">Manage announcement bar offers and auto-discounts</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-900 transition-colors">
          <FiPlus size={14} /> New Offer
        </button>
      </div>

      {/* Info box */}
      <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-6">
        <p className="text-xs text-gray-600">
          <strong>How it works:</strong> The first active offer appears in the announcement bar at the top of the site.
          If a discount value is set, it auto-applies to matching orders at checkout. Customers can dismiss the bar for their session.
        </p>
      </div>

      {offers.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded">
          <FiSpeaker size={32} className="mx-auto mb-3 text-gray-300" />
          <p className="text-sm text-gray-500 mb-4">No site offers yet</p>
          <button onClick={openAdd} className="text-sm underline">Create your first offer</button>
        </div>
      ) : (
        <div className="space-y-3">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white border border-gray-200 rounded p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${offer.active ? "bg-green-500" : "bg-gray-300"}`} />
                    <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      {offer.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-sm font-medium" dangerouslySetInnerHTML={{ __html: offer.text }} />
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    {offer.discountValue > 0 && (
                      <span>
                        Discount: {offer.discountType === "percentage" ? `${offer.discountValue}%` : `$${offer.discountValue}`}
                        {offer.discountScope === "sitewide" ? " sitewide" : ` on ${offer.discountScope}`}
                      </span>
                    )}
                    {offer.excludeCategories?.length > 0 && (
                      <span>Excludes: {offer.excludeCategories.join(", ")}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => toggleActive(offer.id)} className={`text-xs px-3 py-1 border rounded transition-colors ${
                    offer.active ? "bg-black text-white border-black" : "border-gray-300 hover:border-black"
                  }`}>
                    {offer.active ? "On" : "Off"}
                  </button>
                  <button onClick={() => openEdit(offer)} className="p-1.5 text-gray-400 hover:text-black">
                    <FiEdit2 size={14} />
                  </button>
                  <button onClick={() => handleDelete(offer.id)} className="p-1.5 text-gray-400 hover:text-red-600">
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-sm font-semibold">{editOffer ? "Edit Offer" : "New Offer"}</h2>
              <button onClick={() => setShowModal(false)}><FiX size={18} /></button>
            </div>
            <div className="p-4 space-y-4">
              {/* Offer text */}
              <div>
                <label className="block text-xs font-medium mb-1">Announcement Text *</label>
                <input
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black"
                  placeholder='<span class="font-bold">Friends + Family</span>&nbsp;&nbsp;40% off Sitewide* | 30% off Underwear*'
                />
                <p className="text-[10px] text-gray-400 mt-1">Supports HTML for bold, links, etc.</p>
              </div>

              {/* Links */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">Women Link</label>
                  <input
                    value={form.linkWomen}
                    onChange={(e) => setForm({ ...form, linkWomen: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black"
                    placeholder="/products?gender=Women&sale=true"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Men Link</label>
                  <input
                    value={form.linkMen}
                    onChange={(e) => setForm({ ...form, linkMen: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black"
                    placeholder="/products?gender=Men&sale=true"
                  />
                </div>
              </div>

              {/* Discount */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">Discount Type</label>
                  <select
                    value={form.discountType}
                    onChange={(e) => setForm({ ...form, discountType: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black bg-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed ($)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Discount Value</label>
                  <input
                    type="number"
                    value={form.discountValue}
                    onChange={(e) => setForm({ ...form, discountValue: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black"
                    placeholder="40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Discount Scope</label>
                <select
                  value={form.discountScope}
                  onChange={(e) => setForm({ ...form, discountScope: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black bg-white"
                >
                  <option value="sitewide">Sitewide</option>
                  <option value="Underwear">Underwear Only</option>
                  <option value="Tops">Tops Only</option>
                  <option value="Bottoms">Bottoms Only</option>
                  <option value="Outerwear">Outerwear Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Exclude Categories (comma-separated)</label>
                <input
                  value={form.excludeCategories}
                  onChange={(e) => setForm({ ...form, excludeCategories: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-black"
                  placeholder="Sale, Underwear"
                />
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm border border-gray-300 hover:border-black transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm bg-black text-white hover:bg-gray-900 disabled:opacity-50 transition-colors">
                {saving ? "Saving..." : editOffer ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
