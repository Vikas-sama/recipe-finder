const STORAGE_KEY = "recipeFinderClientId";

// There's no login in this app, so favorites are scoped to a random ID
// generated once per browser and kept in localStorage.
export function getClientId() {
  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}
