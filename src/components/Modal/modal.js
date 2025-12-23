import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";
import "./modal.css";

import trailerErrorTpl from "./templates/trailer-error.html?raw";
import movieDetailTpl from "./templates/movie-detail.html?raw";
import alertTpl from "./templates/alert.html?raw";
import trailerTpl from "./templates/trailer.html?raw";

import { axiosClient } from "../../services/axiosClient";

let instance = null;

const lockScroll = () => document.body.classList.add("is-modal-open");
const unlockScroll = () => document.body.classList.remove("is-modal-open");

const render = (template, data) =>
  template.replace(/\{\{(\w+)\}\}/g, (_, key) => data?.[key] ?? "");

export const openModal = (html) => {
  if (instance) instance.close();

  instance = basicLightbox.create(html, {
    onShow: (inst) => {
      lockScroll();

      const closeBtn = inst.element().querySelector("[data-modal-close]");
      closeBtn?.addEventListener("click", () => inst.close());

      const handleEscape = (e) => {
        if (e.key === "Escape") inst.close();
      };

      document.addEventListener("keydown", handleEscape);

      inst.onKeyDownRef = handleEscape;
    },
    onClose: (inst) => {
      unlockScroll();
      document.removeEventListener("keydown", inst.onKeyDownRef);
      instance = null;
    },
  });

  instance.show();
};

export const openTrailerModal = async (movieId) => {
  try {
    const { data } = await axiosClient.get(`/movie/${movieId}/videos`);
    const trailer = (data?.results || []).find(
      (v) =>
        v.site === "YouTube" &&
        (v.type === "Trailer" || v.type === "Teaser") &&
        v.key
    );

    if (!trailer) {
      const html = render(trailerErrorTpl);
      openModal(html);
      return;
    }

    const trailerHtml = render(trailerTpl, { trailer: trailer.key });
    openModal(trailerHtml);
  } catch (error) {
    console.error("Trailer Fetch Error:", error);
    const html = render(trailerErrorTpl);
    openModal(html);
  }
};

export const openMovieDetailModal = async (movieId) => {
  try {
    const { data: movie } = await axiosClient.get(`/movie/${movieId}`);
    const baseImg = import.meta.env.VITE_TMDB_API_IMAGE_BASE_URL;

    const html = render(movieDetailTpl, {
      title: movie.title || "No Title",
      overview: movie.overview || "No description available.",
      vote: movie.vote_average?.toFixed(1) || "0",
      votes: String(movie.vote_count || 0),
      popularity: movie.popularity?.toFixed(0) || "0",
      genre: movie.genres?.map((g) => g.name).join(", ") || "—",
      poster: movie.poster_path
        ? `${baseImg}${movie.poster_path}`
        : "https://via.placeholder.com/300x450",
    });
    openModal(html);
  } catch (error) {
    openModal(alertTpl);
  }
};
