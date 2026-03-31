"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const WishlistContext = createContext(null);
const WL_KEY = "ck_wishlist";

function loadWishlist() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveWishlist(items) {
  if (typeof window === "undefined") return;
  localStorage.setItem(WL_KEY, JSON.stringify(items));
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(loadWishlist());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveWishlist(items);
  }, [items, loaded]);

  const addItem = useCallback((product) => {
    setItems((prev) => {
      if (prev.find((i) => i.productId === product.id)) return prev;
      return [...prev, {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        salePrice: product.salePrice,
        image: product.images[0],
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
