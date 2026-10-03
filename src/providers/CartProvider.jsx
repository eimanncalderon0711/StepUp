// providers/CartProvider.jsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import CartContext from "../contexts/CartContext";

const CART_KEY = "cart";

export default function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const storedCartItems = await AsyncStorage.getItem(CART_KEY);
    if (!storedCartItems) {
      return;
    }

    setItems(JSON.parse(storedCartItems));
  };

  const addItem = useCallback(
    async (product, size = null, qty = 1) => {
      const found = items.find((i) => i.id === product.id && i.size === size);

      let updatedItems;

      if (found) {
        updatedItems = items.map((i) =>
          i === found ? { ...i, qty: i.qty + qty } : i,
        );
      } else {
        updatedItems = [...items, { ...product, size, qty }];
      }

      await AsyncStorage.setItem("cart", JSON.stringify(updatedItems));
      setItems(updatedItems);
    },
    [items],
  );

  const removeItem = useCallback((id, size = null) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  }, []);

  const clearCart = async () => {
    setItems([]);
    await AsyncStorage.removeItem(CART_KEY);
  };

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
