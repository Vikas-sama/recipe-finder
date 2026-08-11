import { useState } from "react";
import RecipeGrid from "../components/RecipeGrid";
import RecipeModal from "../components/RecipeModal";
import Loader from "../components/Loader";
import { useFavorites } from "../context/FavoritesContext";

export default function Favorites() {
  const { favorites, favoriteIds, loading, toggleFavorite } = useFavorites();
  const [openMealId, setOpenMealId] = useState(null);

  return (
    <div className="page">
      <div className="page__intro">
        <p className="eyebrow">Your recipe box</p>
        <h1>Saved favorites.</h1>
      </div>

      {loading ? (
        <Loader label="Loading your favorites…" />
      ) : (
        <RecipeGrid
          meals={favorites}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
          onOpen={setOpenMealId}
          emptyMessage="Nothing saved yet — tap the heart on any recipe to add it here."
        />
      )}

      {openMealId && (
        <RecipeModal
          mealId={openMealId}
          isFavorite={favoriteIds.has(openMealId)}
          onToggleFavorite={() => toggleFavorite({ idMeal: openMealId })}
          onClose={() => setOpenMealId(null)}
        />
      )}
    </div>
  );
}
