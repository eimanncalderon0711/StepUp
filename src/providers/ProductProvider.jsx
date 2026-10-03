import { useContext, useMemo, useState } from "react";
import ProductContext from "../contexts/ProductContext";
import { PRODUCTS } from "../data/products";

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState(PRODUCTS);

  const updateProducts = (id, newProducts) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, ...newProducts } : product,
      ),
    );
  };

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const removeProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id),
    );
  };

  const data = useMemo(
    () => ({ products, updateProducts, addProduct, removeProduct }),
    [products],
  );

  return (
    <ProductContext.Provider value={data}>{children}</ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
}
