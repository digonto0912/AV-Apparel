"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const RecentContext = createContext(null);
const RV_KEY = "ck_recent";
const MAX = 12;

function loadRecent() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveRecent(items) {
  if (typeof window === "undefined") return;
  localStorage.setItem(RV_KEY, JSON.stringify(items));
}

export function RecentlyViewedProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(loadRecent());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveRecent(items);
  }, [items, loaded]);

  const addProduct = useCallback((product) => {
    setItems((prev) => {
      const filtered = prev.filter((i) => i.productId !== product.id);
      const entry = {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        salePrice: product.salePrice,
        image: product.images[0],
      };
      return [entry, ...filtered].slice(0, MAX);
    });
  }, []);

  return (
    <RecentContext.Provider value={{ items, addProduct }}>
      {children}
    </RecentContext.Provider>
  );
}

export const useRecentlyViewed = () => {
  const ctx = useContext(RecentContext);
  if (!ctx) throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider");
  return ctx;
};
