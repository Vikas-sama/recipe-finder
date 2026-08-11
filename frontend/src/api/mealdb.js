// TheMealDB free public API. "1" is the published test key — free at point
// of access for personal/educational projects, no signup required.
// Docs: https://www.themealdb.com/api.php
const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TheMealDB request failed (${res.status})`);
  return res.json();
}

export async function searchMealsByName(query) {
  const data = await getJson(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
  return data.meals || [];
}

export async function filterByCategory(category) {
  const data = await getJson(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
  return data.meals || [];
}

export async function filterByArea(area) {
  const data = await getJson(`${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`);
  return data.meals || [];
}

export async function lookupMealById(id) {
  const data = await getJson(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`);
  return data.meals ? data.meals[0] : null;
}

export async function getCategories() {
  const data = await getJson(`${BASE_URL}/categories.php`);
  return data.categories || [];
}

export async function getAreas() {
  const data = await getJson(`${BASE_URL}/list.php?a=list`);
  return (data.meals || []).map((m) => m.strArea);
}

// Pulls the ingredient/measurement pairs out of TheMealDB's flat
// strIngredient1..20 / strMeasure1..20 fields into a clean array.
export function getIngredients(meal) {
  if (!meal) return [];
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }
  return ingredients;
}
