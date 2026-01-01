import "./upcoming-this-month.css";
import template from "./upcoming-this-month.html?raw";

import { axiosClient } from "../../../services/axiosClient";
import { openMovieDetailModal } from "../../Modal/modal";
import {
  addToLibrary,
  removeFromLibrary,
  isInLibrary,
} from "../../../services/storage";

const toDateStr = (d) => d.toISOString().slice(0, 10);

const getMonthRange = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { start: toDateStr(start), end: toDateStr(end) };
};

const clamp = (text, maxWords) => {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  return words.length <= maxWords
    ? text
    : `${words.slice(0, maxWords).join(" ")}...`;
};

export const createUpcomingThisMonth = async () => {
  const root = document.querySelector("#upcoming-this-month");
  if (!root) return;

  root.innerHTML = template;

  const imgEl = root.querySelector(".upcoming__image");
  const titleEl = root.querySelector(".upcoming__title");
  const releaseEl = root.querySelector(".upcoming__release");
  const voteEl = root.querySelector(".upcoming__vote");
  const popularityEl = root.querySelector(".upcoming__popularity");
  const genreEl = root.querySelector(".upcoming__genre");
  const overviewEl = root.querySelector(".upcoming__overview");
  const btnEl = root.querySelector(".upcoming__btn");
  const openTargets = root.querySelectorAll("[data-upcoming-open]");

  try {
    const { start, end } = getMonthRange();

    const { data } = await axiosClient.get("/discover/movie", {
      params: {
        "primary_release_date.gte": start,
        "primary_release_date.lte": end,
        sort_by: "popularity.desc",
        include_adult: false,
        page: 1,
      },
    });

    const movie = data?.results?.[0];
    if (!movie) {
      root.innerHTML = "";
      return;
    }

    const { data: detail } = await axiosClient.get(`/movie/${movie.id}`);
    const baseImg = import.meta.env.VITE_TMDB_API_IMAGE_BASE_URL;

    const poster =
      (detail.backdrop_path && `${baseImg}${detail.backdrop_path}`) ||
      (detail.poster_path && `${baseImg}${detail.poster_path}`) ||
      "";

    if (poster) {
      imgEl.src = poster;
      imgEl.alt = detail.title || "Movie";
    } else {
      imgEl.remove();
    }

    titleEl.textContent = detail.title || "No Title";
    releaseEl.innerHTML = `<span>${detail.release_date || "—"}</span>`;
    voteEl.innerHTML = `<span>${
      detail.vote_average?.toFixed(1) || "0"
    }</span> / <span>${detail.vote_count || 0}</span>`;
    popularityEl.textContent = detail.popularity?.toFixed(1) || "0";
    genreEl.textContent = detail.genres?.map((g) => g.name).join(", ") || "—";
    overviewEl.textContent =
      clamp(detail.overview, 45) || "No description available.";

    const updateBtn = () => {
      btnEl.textContent = isInLibrary(detail.id)
        ? "Remove from library"
        : "Add to my library";
    };
    updateBtn();

    openTargets.forEach((el) =>
      el.addEventListener("click", () => openMovieDetailModal(detail.id))
    );

    btnEl.addEventListener("click", () => {
      if (isInLibrary(detail.id)) removeFromLibrary(detail.id);
      else addToLibrary(detail);

      updateBtn();

      window.dispatchEvent(
        new CustomEvent("library:changed", { detail: { movieId: detail.id } })
      );
    });
  } catch (err) {
    console.error("Upcoming this month error:", err);
  }
};
