"use client";
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchUserRecentlyViewed, saveUserRecentlyViewed } from "@/lib/firestore";

const RecentContext = createContext(null);
const RV_KEY = "ck_recent";
const MAX = 12;

function loadLocalRecent() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveLocalRecent(items) {
  if (typeof window === "undefined") return;
  localStorage.setItem(RV_KEY, JSON.stringify(items));
}

export function RecentlyViewedProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const savingRef = useRef(false);

  // Load: localStorage first, then merge from Firestore when user logs in
  useEffect(() => {
    async function initRecent() {
      const localItems = loadLocalRecent();

      if (user) {
        try {
          const dbItems = await fetchUserRecentlyViewed(user.uid);
          // Merge: local items on top, then DB items not already present
          const merged = [...localItems];
          for (const dbItem of dbItems) {
            if (!merged.find((m) => m.productId === dbItem.productId)) {
              merged.push(dbItem);
            }
          }
          const limited = merged.slice(0, MAX);
          setItems(limited);
          saveLocalRecent(limited);
          await saveUserRecentlyViewed(user.uid, limited);
        } catch {
          setItems(localItems);
        }
      } else {
        setItems(localItems);
      }
      setLoaded(true);
    }

    initRecent();
  }, [user]);

  // Save to localStorage and Firestore on every change
  useEffect(() => {
    if (!loaded || savingRef.current) return;
    saveLocalRecent(items);
    if (user) {
      savingRef.current = true;
      saveUserRecentlyViewed(user.uid, items).catch(() => {}).finally(() => { savingRef.current = false; });
    }
  }, [items, loaded, user]);

  const addProduct = useCallback((product) => {
    setItems((prev) => {
      const filtered = prev.filter((i) => i.productId !== product.id);
      const entry = {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        salePrice: product.salePrice,
        image: product.images?.[0] || "",
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
