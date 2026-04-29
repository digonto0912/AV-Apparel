"use client";
import { useState } from "react";
import { FiX } from "react-icons/fi";

const SIZE_GUIDE_DATA = {
  Men: {
    headers: ["Size", "Chest (in)", "Waist (in)", "Hip (in)"],
    rows: [
      ["XS", "34-36", "28-30", "34-36"],
      ["S", "36-38", "30-32", "36-38"],
      ["M", "38-40", "32-34", "38-40"],
      ["L", "40-42", "34-36", "40-42"],
      ["XL", "42-44", "36-38", "42-44"],
      ["XXL", "44-46", "38-40", "44-46"],
    ],
  },
  Women: {
    headers: ["Size", "Bust (in)", "Waist (in)", "Hip (in)"],
    rows: [
      ["XS", "31-32", "24-25", "34-35"],
      ["S", "33-34", "26-27", "36-37"],
      ["M", "35-36", "28-29", "38-39"],
      ["L", "37-39", "30-32", "40-42"],
      ["XL", "40-42", "33-35", "43-45"],
    ],
  },
  Jeans: {
    headers: ["Size", "Waist (in)", "Inseam (in)"],
    rows: [
      ["28", "28", "30-32"],
      ["30", "30", "30-32"],
      ["32", "32", "30-32"],
      ["34", "34", "30-32"],
      ["36", "36", "30-32"],
    ],
  },
};

export default function SizeGuideModal({ isOpen, onClose, gender = "Men", category = "" }) {
  const [activeTab, setActiveTab] = useState(
    category?.toLowerCase().includes("jean") ? "Jeans" : gender || "Men"
  );

  if (!isOpen) return null;

  const guide = SIZE_GUIDE_DATA[activeTab] || SIZE_GUIDE_DATA.Men;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-sm">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-semibold">Size Guide</h2>
          <button onClick={onClose}><FiX size={20} /></button>
        </div>

        <div className="flex gap-2 p-5 pb-0">
          {Object.keys(SIZE_GUIDE_DATA).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-medium border ${
                activeTab === tab ? "bg-black text-white border-black" : "border-gray-300 text-gray-600 hover:border-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                {guide.headers.map((h) => (
                  <th key={h} className="text-left py-2 pr-4 font-medium text-xs text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guide.rows.map((row, i) => (
                <tr key={i} className="border-b border-gray-100">
                  {row.map((cell, j) => (
                    <td key={j} className="py-2.5 pr-4 text-xs">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-400 mt-4">Measurements are approximate. For the best fit, compare your body measurements with those listed above.</p>
        </div>
      </div>
    </div>
  );
}
