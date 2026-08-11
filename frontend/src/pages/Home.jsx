import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import RecipeGrid from "../components/RecipeGrid";
import RecipeModal from "../components/RecipeModal";
import Loader from "../components/Loader";
import { searchMealsByName, filterByCategory, getCategories } from "../api/mealdb";
import { useFavorites } from "../context/FavoritesContext";

const DEFAULT_CATEGORY = "Chicken";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY);
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMealId, setOpenMealId] = useState(null);

  const { favoriteIds, toggleFavorite } = useFavorites();

  useEffect(() => {
    getCategories().then((cats) => setCategories(cats.map((c) => c.strCategory)));
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    const request = query
      ? searchMealsByName(query)
      : filterByCategory(activeCategory || DEFAULT_CATEGORY);

    request
      .then((results) => {
        if (active) setMeals(results);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [query, activeCategory]);

  function handleSearch(value) {
    setQuery(value);
    if (value) setActiveCategory(null);
    else setActiveCategory(DEFAULT_CATEGORY);
  }

  function handleSelectCategory(category) {
    setQuery("");
    setActiveCategory(category || DEFAULT_CATEGORY);
  }

  return (
    <div className="page">
      <div className="page__intro">
        <p className="eyebrow">What's in the pot today?</p>
        <h1>Find a recipe worth cooking.</h1>
      </div>

      <SearchBar key={activeCategory || "search"} onSearch={handleSearch} initialValue={query} />
      <CategoryFilter
        categories={categories}
        activeCategory={query ? null : activeCategory}
        onSelect={handleSelectCategory}
      />

      {error && <p className="form-error">{error}</p>}

      {loading ? (
        <Loader />
      ) : (
        <RecipeGrid
          meals={meals}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
          onOpen={setOpenMealId}
          emptyMessage={query ? `No recipes found for "${query}".` : "No recipes found."}
        />
      )}

      {openMealId && (
        <RecipeModal
          mealId={openMealId}
          isFavorite={favoriteIds.has(openMealId)}
          onToggleFavorite={() => toggleFavorite({ idMeal: openMealId, ...findMeal(meals, openMealId) })}
          onClose={() => setOpenMealId(null)}
        />
      )}
    </div>
  );
}

function findMeal(meals, id) {
  return meals.find((m) => m.idMeal === id) || {};
}
