import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useMemo, useState } from "react";
import FavoritContext from "../contexts/FavoriteContext";

const FAVORITE_KEY = "favorites";

export default function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    listFavorites();
  }, []);

  async function listFavorites() {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITE_KEY);

      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      setFavorites(favorites);
    } catch (error) {
      console.error(error);
    }
  }

  async function addFavorite(item) {
    try {
      const newFavorites = [...favorites, item];
      setFavorites(newFavorites);
      await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error(error);
    }
  }

  async function removeFavorite(item) {
    try {
      const newItems = favorites.filter(
        (f) => String(f.id) !== String(item.id),
      );
      setFavorites(newItems);
      await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(newItems));
    } catch (error) {
      console.error(error);
    }
  }

  const value = useMemo(
    () => ({
      favorites,
      removeFavorite,
      addFavorite,
    }),
    [favorites],
  );

  return (
    <FavoritContext.Provider value={value}>{children}</FavoritContext.Provider>
  );
}

export function useFavorite() {
  const ctx = useContext(FavoritContext);

  if (!ctx) {
    throw new Error("useProduct must be used within a ProductProvider");
  }

  return ctx;
}
