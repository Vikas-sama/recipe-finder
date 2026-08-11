const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function getJson(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed (${res.status})`);
  }
  return res.json();
}

export async function getFavorites(clientId) {
  const res = await fetch(`${API_URL}/favorites?clientId=${encodeURIComponent(clientId)}`);
  return getJson(res);
}

export async function addFavorite(clientId, meal) {
  const res = await fetch(`${API_URL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clientId,
      mealId: meal.idMeal,
      name: meal.strMeal,
      image: meal.strMealThumb,
      category: meal.strCategory,
      area: meal.strArea,
    }),
  });
  return getJson(res);
}

export async function removeFavorite(clientId, mealId) {
  const res = await fetch(
    `${API_URL}/favorites/${encodeURIComponent(mealId)}?clientId=${encodeURIComponent(clientId)}`,
    { method: "DELETE" }
  );
  return getJson(res);
}
