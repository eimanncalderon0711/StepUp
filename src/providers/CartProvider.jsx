// providers/CartProvider.jsx
import { useCallback, useContext, useMemo, useState } from "react";
import CartContext from "../contexts/CartContext";

export default function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = useCallback((product, size = null, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id && i.size === size);
      if (found) {
        return prev.map((i) => (i === found ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { ...product, size, qty }];
    });
  }, []);

  const removeItem = useCallback((id, size = null) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  
  const parsePrice = (price) => {
    return Number(String(price).replace(/[₱,]/g, ""));
  };

  const cartTotal = items.reduce(
    (total, i) => total + parsePrice(i.price) * i.qty,
    0,
  );

  const value = useMemo(() => {
    return { items, count, cartTotal, addItem, removeItem, clearCart };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
