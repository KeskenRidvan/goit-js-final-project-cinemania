import "./catalog-filters.css";
import template from "./catalog-filters.html?raw";

const buildYears = (fromYear = 2015) => {
  const now = new Date().getFullYear();
  const years = [];
  for (let y = now; y >= fromYear; y--) years.push(y);
  return years;
};

export const createCatalogFilter = ({
  containerSelector,
  fromYear = 2015,
  initial = { query: "", film: "", year: "" },
  mode = "idle",
  onSearch = () => {},
  onChange = () => {},
} = {}) => {
  const host = document.querySelector(containerSelector);
  if (!host) {
    console.warn(`CatalogFilter: container not found: ${containerSelector}`);
    return null;
  }

  host.innerHTML = template;

  const root = host.querySelector("[data-filters]");
  const searchInput = host.querySelector("[data-search-input]");
  const filmInput = host.querySelector("[data-film-input]");
  const yearSelect = host.querySelector("[data-year-select]");
  const searchBtn = host.querySelector("[data-search-btn]");

  const years = buildYears(fromYear);
  yearSelect.innerHTML =
    `<option value="">Year</option>` +
    years.map((y) => `<option value="${y}">${y}</option>`).join("");

  searchInput.value = initial.query ?? "";
  filmInput.value = initial.film ?? "";
  yearSelect.value = initial.year ?? "";

  const setMode = (nextMode) => {
    if (nextMode === "active") {
      root.classList.add("filters--active");
    } else {
      root.classList.remove("filters--active");
    }
  };

  const getValues = () => ({
    query: searchInput.value.trim(),
    film: filmInput.value.trim(),
    year: yearSelect.value,
  });

  const handleSearch = () => {
    const values = getValues();
    const isActive = root.classList.contains("filters--active");

    if (!isActive) {
      setMode("active");

      if (values.query && !values.film) {
        filmInput.value = values.query;
      }
    }

    const finalValues = getValues();
    onSearch({ film: finalValues.film, year: finalValues.year });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleChange = () => {
    const { film, year } = getValues();
    onChange({ film, year });
  };

  searchBtn.addEventListener("click", handleSearch);
  searchInput.addEventListener("keydown", handleEnter);
  filmInput.addEventListener("keydown", handleEnter);
  yearSelect.addEventListener("change", handleChange);

  setMode(mode);

  return {
    setMode,
    getValues,
    destroy: () => {
      searchBtn.removeEventListener("click", handleSearch);
      searchInput.removeEventListener("keydown", handleEnter);
      filmInput.removeEventListener("keydown", handleEnter);
      yearSelect.removeEventListener("change", handleChange);
      host.innerHTML = "";
    },
  };
};
