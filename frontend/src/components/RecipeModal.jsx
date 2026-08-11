import { useEffect, useState } from "react";
import { lookupMealById, getIngredients } from "../api/mealdb";
import FavoriteButton from "./FavoriteButton";
import Loader from "./Loader";

export default function RecipeModal({ mealId, isFavorite, onToggleFavorite, onClose }) {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    lookupMealById(mealId).then((data) => {
      if (active) {
        setMeal(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [mealId]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={meal ? meal.strMeal : "Recipe details"}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {loading || !meal ? (
          <Loader label="Fetching recipe…" />
        ) : (
          <>
            <div className="modal__hero">
              <img src={meal.strMealThumb} alt={meal.strMeal} />
            </div>
            <div className="modal__content">
              <div className="modal__heading">
                <div>
                  <h2>{meal.strMeal}</h2>
                  <p className="modal__subtitle">
                    {meal.strArea && <span>{meal.strArea}</span>}
                    {meal.strCategory && <span> · {meal.strCategory}</span>}
                  </p>
                </div>
                <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} size="lg" />
              </div>

              <section className="modal__section">
                <h3>Ingredients</h3>
                <ul className="ingredient-list">
                  {getIngredients(meal).map((item, idx) => (
                    <li key={idx}>
                      <span className="ingredient-list__measure">{item.measure}</span>
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="modal__section">
                <h3>Instructions</h3>
                <p className="modal__instructions">{meal.strInstructions}</p>
              </section>

              {meal.strYoutube && (
                <a
                  className="modal__youtube"
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch on YouTube ↗
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
