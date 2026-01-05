import "./weekly-trends.css";
import template from "./weekly-trends.html?raw";

import { axiosClient } from "../../../services/axiosClient";
import { renderMovieGrid } from "../movie-grid/movie-grid";
import { openMovieDetailModal } from "../../Modal/modal";

const getCountByViewport = () =>
  window.matchMedia("(min-width: 768px)").matches ? 3 : 1;

export const createWeeklyTrends = async () => {
  const root = document.querySelector("#weekly-trends");
  if (!root) return;

  root.innerHTML = template;

  const listContainer = root.querySelector(".weekly-trends__list");
  if (!listContainer) return;

  let allMovies = [];

  const render = () => {
    const count = getCountByViewport();
    const selected = allMovies.slice(0, count);

    if (!selected.length) return;

    renderMovieGrid(selected, listContainer);
  };

  try {
    const { data } = await axiosClient.get("/trending/movie/week");
    allMovies = Array.isArray(data?.results) ? data.results : [];

    if (!allMovies.length) return;

    render();

    const mq = window.matchMedia("(min-width: 768px)");
    mq.addEventListener("change", render);

    listContainer.addEventListener("click", (event) => {
      const card = event.target.closest(".movie-card");
      if (!card) return;

      const id = card.dataset.id;
      if (!id) return;

      openMovieDetailModal(id);
    });
  } catch (error) {
    console.error("Weekly trends error:", error);
  }
};
