"use client";
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchUserWishlist, saveUserWishlist } from "@/lib/firestore";

const WishlistContext = createContext(null);
const WL_KEY = "ck_wishlist";

function loadLocalWishlist() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveLocalWishlist(items) {
  if (typeof window === "undefined") return;
  localStorage.setItem(WL_KEY, JSON.stringify(items));
}

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const savingRef = useRef(false);

  // Load wishlist: localStorage first, then merge from Firestore when user is logged in
  useEffect(() => {
    async function initWishlist() {
      const localItems = loadLocalWishlist();

      if (user) {
        try {
          const dbItems = await fetchUserWishlist(user.uid);
          // Merge: DB items + local items not in DB
          const merged = [...dbItems];
          for (const localItem of localItems) {
            if (!merged.find((m) => m.productId === localItem.productId)) {
              merged.push(localItem);
            }
          }
          setItems(merged);
          saveLocalWishlist(merged);
          await saveUserWishlist(user.uid, merged);
        } catch {
          setItems(localItems);
        }
      } else {
        setItems(localItems);
      }
      setLoaded(true);
    }

    initWishlist();
  }, [user]);

  // Save to localStorage and Firestore on every change
  useEffect(() => {
    if (!loaded || savingRef.current) return;
    saveLocalWishlist(items);
    if (user) {
      savingRef.current = true;
      saveUserWishlist(user.uid, items).catch(() => {}).finally(() => { savingRef.current = false; });
    }
  }, [items, loaded, user]);

  const addItem = useCallback((product) => {
    setItems((prev) => {
      if (prev.find((i) => i.productId === product.id)) return prev;
      return [...prev, {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        salePrice: product.salePrice,
        image: product.images?.[0] || "",
        category: product.category,
      }];
    });
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const isInWishlist = useCallback((productId) => {
    return items.some((i) => i.productId === productId);
  }, [items]);

  const toggleItem = useCallback((product) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  }, [isInWishlist, removeItem, addItem]);

  return (
    <WishlistContext.Provider value={{
      items,
      loaded,
      addItem,
      removeItem,
      isInWishlist,
      toggleItem,
      count: items.length,
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
