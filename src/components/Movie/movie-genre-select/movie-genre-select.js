import "./movie-genre-select.css";
import template from "./movie-genre-select.html?raw";

export const createGenreSelect = ({
  containerSelector,
  genres,
  onChange,
  initialValue = "all",
}) => {
  const root = document.querySelector(containerSelector);
  if (!root) return null;

  root.innerHTML = template;

  const wrapper = root.querySelector("[data-genre-select]");
  const btn = root.querySelector("[data-genre-btn]");
  const label = root.querySelector("[data-genre-label]");
  const menu = root.querySelector("[data-genre-menu]");

  if (!wrapper || !btn || !label || !menu) return null;

  let currentValue = initialValue;
  let currentGenres = Array.isArray(genres) ? genres : [];

  const buildItems = () => ["all", ...currentGenres];

  const renderMenu = () => {
    const items = buildItems();
    menu.innerHTML = items
      .map((item) => {
        const text = item === "all" ? "Genre" : item;
        const activeClass =
          item === currentValue ? "genre-select__item--active" : "";
        return `<li class="genre-select__item ${activeClass}" data-value="${item}">${text}</li>`;
      })
      .join("");
  };

  const setValue = (value, { silent = false } = {}) => {
    currentValue = value;
    label.textContent = value === "all" ? "Genre" : value;
    renderMenu();
    if (!silent && typeof onChange === "function") onChange(currentValue);
  };

  const close = () => wrapper.classList.remove("is-open");
  const toggle = () => wrapper.classList.toggle("is-open");

  setValue(currentValue, { silent: true });

  btn.addEventListener("click", toggle);

  menu.addEventListener("click", (event) => {
    const item = event.target.closest("[data-value]");
    if (!item) return;

    const value = item.dataset.value;
    setValue(value);
    close();
  });

  const onDocClick = (event) => {
    if (!root.contains(event.target)) close();
  };

  const onEsc = (event) => {
    if (event.key === "Escape") close();
  };

  document.addEventListener("click", onDocClick);
  document.addEventListener("keydown", onEsc);

  return {
    getValue: () => currentValue,

    setValue: (value) => setValue(value, { silent: true }),

    updateGenres: (genresNext) => {
      currentGenres = Array.isArray(genresNext) ? genresNext : [];

      if (currentValue !== "all" && !currentGenres.includes(currentValue)) {
        currentValue = "all";
        label.textContent = "Genre";
      }

      renderMenu();
    },

    destroy: () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    },
  };
};
