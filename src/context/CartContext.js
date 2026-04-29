"use client";
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchUserCart, saveUserCart } from "@/lib/firestore";

const CartContext = createContext(null);

const CART_KEY = "ck_cart";

function loadLocalCart() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveLocalCart(items) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);
  const [showMiniCart, setShowMiniCart] = useState(false);
  const miniCartTimerRef = useRef(null);
  const savingRef = useRef(false);
  const prevUserRef = useRef(null);

  // Load cart: on mount from localStorage, then merge from Firestore when user logs in
  useEffect(() => {
    async function initCart() {
      const localItems = loadLocalCart();

      if (user) {
        try {
          const dbItems = await fetchUserCart(user.uid);
          // Merge: DB items + any local items not already in DB
          const merged = [...dbItems];
          for (const localItem of localItems) {
            if (!merged.find((m) => m.key === localItem.key)) {
              merged.push(localItem);
            }
          }
          setItems(merged);
          // Save merged back to both
          saveLocalCart(merged);
          await saveUserCart(user.uid, merged);
        } catch {
          setItems(localItems);
        }
      } else {
        setItems(localItems);
      }
      setLoaded(true);
    }

    initCart();
    prevUserRef.current = user?.uid || null;
  }, [user]);

  // Save to localStorage and Firestore on every change (after initial load)
  useEffect(() => {
    if (!loaded || savingRef.current) return;
    saveLocalCart(items);
    if (user) {
      savingRef.current = true;
      saveUserCart(user.uid, items).catch(() => {}).finally(() => { savingRef.current = false; });
    }
  }, [items, loaded, user]);

  const addItem = useCallback((product, size, color, quantity = 1) => {
    const addedItem = {
      key: `${product.id}-${size}-${color}`,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      size,
      color,
      quantity,
      image: product.images?.[0] || "",
    };

    setItems((prev) => {
      const existing = prev.find((i) => i.key === addedItem.key);
      if (existing) {
        return prev.map((i) =>
          i.key === addedItem.key ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, addedItem];
    });

    // Trigger mini cart popup
    setLastAddedItem(addedItem);
    setShowMiniCart(true);
    if (miniCartTimerRef.current) clearTimeout(miniCartTimerRef.current);
    miniCartTimerRef.current = setTimeout(() => {
      setShowMiniCart(false);
    }, 5000);
  }, []);

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const updateQuantity = useCallback((key, quantity) => {
    if (quantity < 1) return;
    setItems((prev) => prev.map((i) => i.key === key ? { ...i, quantity } : i));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const closeMiniCart = useCallback(() => {
    setShowMiniCart(false);
    if (miniCartTimerRef.current) clearTimeout(miniCartTimerRef.current);
  }, []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => {
    const price = i.salePrice || i.price;
    return sum + price * i.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{
      items,
      loaded,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
      lastAddedItem,
      showMiniCart,
      closeMiniCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
