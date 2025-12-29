const STORAGE_KEY = "my_library_movies";
const THEME_KEY = "cinemania_theme";

const normalizeMovie = (m) => ({
  id: m.id,
  title: m.title ?? m.name ?? "No Title",
  poster_path: m.poster_path ?? null,
  release_date: m.release_date ?? "",
  vote_average: m.vote_average ?? 0,
  genres: Array.isArray(m.genres) ? m.genres : [],
  genre_ids: Array.isArray(m.genre_ids) ? m.genre_ids : [],
});

export const getLibrary = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
};

export const addToLibrary = (movie) => {
  const currentList = getLibrary();
  const normalized = normalizeMovie(movie);

  const isExisting = currentList.find((item) => item.id === normalized.id);

  if (!isExisting) {
    currentList.push(normalized);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentList));
    return true;
  }
  return false;
};

export const removeFromLibrary = (movieId) => {
  const currentList = getLibrary();
  const newList = currentList.filter(
    (item) => String(item.id) !== String(movieId)
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
};

export const isInLibrary = (movieId) => {
  const currentList = getLibrary();
  return currentList.some((item) => String(item.id) === String(movieId));
};

export const saveTheme = (isLight) => {
  const theme = isLight ? "light" : "dark";
  localStorage.setItem(THEME_KEY, theme);
};

export const getSavedTheme = () => {
  return localStorage.getItem(THEME_KEY);
};
