import { toneForLabel } from "../utils/spiceTones";
import FavoriteButton from "./FavoriteButton";

export default function RecipeCard({ meal, isFavorite, onToggleFavorite, onOpen }) {
  const tone = toneForLabel(meal.strCategory || meal.category || "");
  const category = meal.strCategory || meal.category;
  const area = meal.strArea || meal.area;

  return (
    <article
      className="recipe-card"
      style={{ "--card-tone": tone.hex }}
      onClick={() => onOpen(meal.idMeal || meal.mealId)}
    >
      <div className="recipe-card__perf" aria-hidden="true" />
      <div className="recipe-card__media">
        <img src={meal.strMealThumb || meal.image} alt={meal.strMeal || meal.name} loading="lazy" />
        <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
      </div>
      <div className="recipe-card__body">
        <h3>{meal.strMeal || meal.name}</h3>
        <div className="recipe-card__meta">
          {area && <span className="recipe-card__area">{area}</span>}
          {category && (
            <span className="recipe-card__tag">
              <span className="recipe-card__tag-dot" />
              {category}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
