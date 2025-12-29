import "../../styles/main.css";
import "./library.css";

import { createHeader } from "../../components/Header/header";
import { createLibraryHero } from "../../components/Hero/hero-library/hero-library";
import { getLibrary } from "../../services/storage";
import { openMovieDetailModal } from "../../components/Modal/modal";
import { renderMovieGrid } from "../../components/Movie/movie-grid/movie-grid";
import { createGenreSelect } from "../../components/Movie/movie-genre-select/movie-genre-select";

const setListMode = (container, mode) => {
  container.classList.remove("library-list--grid", "library-list--empty");
  container.classList.add(
    mode === "empty" ? "library-list--empty" : "library-list--grid"
  );
};

const renderEmptyState = (container) => {
  setListMode(container, "empty");
  container.innerHTML = `
    <div class="library-empty">
      <div class="library-empty__content">
        <p class="library-empty__title">OOPS...</p>
        <p class="library-empty__text">We are very sorry!</p>
        <p class="library-empty__text">You don’t have any movies at your library.</p>
      </div>
      <a href="/catalog/" class="btn btn-orange library-empty__btn">
        Search movie
      </a>
    </div>
  `;
};

const renderNoResults = (container) => {
  setListMode(container, "empty");
  container.innerHTML = `
    <div class="library-empty">
      <div class="library-empty__content">
        <p class="library-empty__title">No movies</p>
        <p class="library-empty__text">No movies found for this genre.</p>
      </div>
    </div>
  `;
};

const getGenresFromLibrary = (movies) => {
  const set = new Set();
  movies.forEach((movie) => {
    if (Array.isArray(movie.genres)) {
      movie.genres.forEach((g) => g?.name && set.add(g.name));
    }
  });
  return Array.from(set).sort((a, b) => a.localeCompare(b));
};

const filterMoviesByGenre = (movies, genre) => {
  if (!genre || genre === "all") return movies;
  return movies.filter(
    (movie) =>
      Array.isArray(movie.genres) && movie.genres.some((g) => g?.name === genre)
  );
};

const initLibrary = () => {
  createHeader();
  createLibraryHero();

  const listContainer = document.querySelector("#library-list");
  const genreRoot = document.querySelector("#genre-filter");

  if (!listContainer) return;

  let genreSelectApi = null;
  let selectedGenre = "all";

  const destroyGenreSelect = () => {
    if (genreSelectApi) {
      genreSelectApi.destroy();
      genreSelectApi = null;
    }
    if (genreRoot) genreRoot.innerHTML = "";
    selectedGenre = "all";
  };

  const ensureGenreSelect = (allMovies) => {
    if (!genreRoot) return;

    const genres = getGenresFromLibrary(allMovies);

    if (!genreSelectApi) {
      genreSelectApi = createGenreSelect({
        containerSelector: "#genre-filter",
        genres,
        initialValue: selectedGenre,
        onChange: (selected) => {
          selectedGenre = selected;
          render();
        },
      });
      return;
    }

    genreSelectApi.updateGenres(genres);
  };

  const render = () => {
    const allMovies = getLibrary();

    if (!allMovies.length) {
      destroyGenreSelect();
      renderEmptyState(listContainer);
      return;
    }

    ensureGenreSelect(allMovies);

    const filtered = filterMoviesByGenre(allMovies, selectedGenre);

    if (!filtered.length) {
      renderNoResults(listContainer);
      return;
    }

    setListMode(listContainer, "grid");
    renderMovieGrid(filtered, listContainer);
  };

  listContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".movie-card");
    if (!card) return;

    const id = card.dataset.id;
    if (!id) return;

    openMovieDetailModal(id);
  });

  window.addEventListener("library:changed", render);

  render();
};

document.addEventListener("DOMContentLoaded", initLibrary);
