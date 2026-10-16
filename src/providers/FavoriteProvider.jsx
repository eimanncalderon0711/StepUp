import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useMemo, useState } from "react";
import FavoritContext from "../contexts/FavoriteContext";
import { useUser } from "./UserProvider";

const FAVORITE_KEY = "favorites";

export default function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) {
      setFavorites([]);
      return;
    }

    let mounted = true;

    listFavorites();

    return () => (mounted = false);
  }, [user?.id]);

  async function listFavorites() {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITE_KEY);

      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      const filterOwnedFavorites = favorites.filter(
        (favorite) => String(favorite.userId) === String(user.id),
      );

      setFavorites(filterOwnedFavorites);
    } catch (error) {
      console.error(error);
    }
  }

  async function addFavorite(item) {
    if (!user?.id) return;

    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITE_KEY);
      const allFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      const newFavorite = { ...item, userId: user.id };

      const updatedFavorites = [...allFavorites, newFavorite];

      await AsyncStorage.setItem(
        FAVORITE_KEY,
        JSON.stringify(updatedFavorites),
      );

      setFavorites((prev) => [...prev, newFavorite]);
    } catch (error) {
      console.error(error);
    }
  }

  async function removeFavorite(item) {
    if (!user?.id) return;

    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITE_KEY);
      const allFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      const updatedFavorites = allFavorites.filter(
        (favorite) =>
          !(
            String(favorite.id) === String(item.id) &&
            String(favorite.userId) === String(user.id)
          ),
      );

      await AsyncStorage.setItem(
        FAVORITE_KEY,
        JSON.stringify(updatedFavorites),
      );

      setFavorites((prev) =>
        prev.filter(
          (favorite) =>
            !(
              String(favorite.id) === String(item.id) &&
              String(favorite.userId) === String(user.id)
            ),
        ),
      );
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
