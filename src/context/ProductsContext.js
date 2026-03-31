"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchProducts as fetchProductsFromDB } from "@/lib/firestore";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductsFromDB();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products from Firestore:", err);
      setError(err.message);
      setProducts([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const getProductBySlug = useCallback(
    (slug) => products.find((p) => p.slug === slug) || null,
    [products]
  );

  const getProductById = useCallback(
    (id) => products.find((p) => p.id === id) || null,
    [products]
  );

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        reload: loadProducts,
        getProductBySlug,
        getProductById,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
};
