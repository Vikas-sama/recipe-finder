import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../api/favorites";
import { getClientId } from "../utils/clientId";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const clientId = useMemo(() => getClientId(), []);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFavorites(clientId);
      setFavorites(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const favoriteIds = useMemo(() => new Set(favorites.map((f) => f.mealId)), [favorites]);

  async function toggleFavorite(meal) {
    const mealId = meal.idMeal || meal.mealId;
    if (favoriteIds.has(mealId)) {
      setFavorites((prev) => prev.filter((f) => f.mealId !== mealId));
      try {
        await removeFavorite(clientId, mealId);
      } catch (err) {
        setError(err.message);
        refresh();
      }
    } else {
      const optimistic = {
        mealId,
        name: meal.strMeal || meal.name,
        image: meal.strMealThumb || meal.image,
        category: meal.strCategory || meal.category,
        area: meal.strArea || meal.area,
      };
      setFavorites((prev) => [optimistic, ...prev]);
      try {
        await addFavorite(clientId, meal);
      } catch (err) {
        setError(err.message);
        refresh();
      }
    }
  }

  const value = { favorites, favoriteIds, loading, error, toggleFavorite, refresh };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside a FavoritesProvider");
  return ctx;
}
