import "../../styles/main.css";
import "./catalog.css";

import { createHeader } from "../../components/Header/header";
import { createHero } from "../../components/Hero/hero";
import { createFooter } from "../../components/Footer/footer";

import { axiosClient } from "../../services/axiosClient";
import { renderMovieGrid } from "../../components/Movie/movie-grid/movie-grid";
import { openMovieDetailModal } from "../../components/Modal/modal";
import { createCatalogFilter } from "../../components/Movie/catalog-filters/catalog-filters";
import { renderPagination } from "../../components/Movie/pagination/pagination";

const state = {
  film: "",
  year: "",
  page: 1,
  totalPages: 1,
};

const fetchCatalogMovies = async () => {
  try {
    const { film, year, page } = state;
    let endpoint = "/discover/movie";
    let params = {
      page,
      include_adult: false,
      sort_by: "popularity.desc",
    };

    if (film) {
      endpoint = "/search/movie";
      params = {
        query: film,
        page,
        include_adult: false,
      };
      if (year) params.year = year;
    } else if (year) {
      params.primary_release_year = year;
    }

    const { data } = await axiosClient.get(endpoint, { params });

    return {
      results: data?.results ?? [],
      totalPages: data?.total_pages ?? 1,
    };
  } catch (error) {
    console.error("Fetch Error:", error);
    return { results: [], totalPages: 1 };
  }
};

const render = async () => {
  const listEl = document.querySelector("#catalog-list");
  if (!listEl) return;

  listEl.innerHTML =
    '<div style="color:white; text-align:center;">Loading...</div>';

  const { results, totalPages } = await fetchCatalogMovies();

  state.totalPages = Math.max(1, Number(totalPages) || 1);

  if (results.length === 0) {
    listEl.innerHTML =
      '<div style="color:white; text-align:center;">No movies found.</div>';
  } else {
    renderMovieGrid(results, listEl);
  }

  renderPagination({
    containerSelector: "#pagination",
    currentPage: state.page,
    totalPages: state.totalPages,
    windowSize: 24,
    onPageChange: (next) => {
      state.page = next;

      window.scrollTo({ top: 0, behavior: "smooth" });
      render();
    },
  });
};

const initCatalog = () => {
  createHeader();
  createHero();
  createFooter();

  createCatalogFilter({
    containerSelector: "#catalog-filters",
    mode: state.film ? "active" : "idle",
    onSearch: ({ film, year }) => {
      state.film = film;
      state.year = year;
      state.page = 1;
      render();
    },
    onChange: ({ film, year }) => {
      state.film = film;
      state.year = year;
      state.page = 1;
      render();
    },
  });

  const listEl = document.querySelector("#catalog-list");
  listEl?.addEventListener("click", (e) => {
    const card = e.target.closest(".movie-card");
    if (card && card.dataset.id) {
      openMovieDetailModal(card.dataset.id);
    }
  });

  render();
};

document.addEventListener("DOMContentLoaded", initCatalog);
