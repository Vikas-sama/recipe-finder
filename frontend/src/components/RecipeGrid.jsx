import RecipeCard from "./RecipeCard";
import EmptyState from "./EmptyState";

export default function RecipeGrid({ meals, favoriteIds, onToggleFavorite, onOpen, emptyMessage }) {
  if (!meals.length) {
    return (
      <EmptyState
        title="Nothing here yet"
        message={emptyMessage || "Try a different search term or category."}
      />
    );
  }

  return (
    <div className="recipe-grid">
      {meals.map((meal) => {
        const id = meal.idMeal || meal.mealId;
        return (
          <RecipeCard
            key={id}
            meal={meal}
            isFavorite={favoriteIds.has(id)}
            onToggleFavorite={() => onToggleFavorite(meal)}
            onOpen={onOpen}
          />
        );
      })}
    </div>
  );
}
