import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";
import "./modal.css";

import trailerErrorTpl from "./templates/trailer-error.html?raw";
import movieDetailTpl from "./templates/movie-detail.html?raw";
import alertTpl from "./templates/alert.html?raw";
import trailerTpl from "./templates/trailer.html?raw";

import teamModalTpl from "./templates/team-modal.html?raw";
import team from "../../data/team.json";

import { axiosClient } from "../../services/axiosClient";
import {
  addToLibrary,
  removeFromLibrary,
  isInLibrary,
} from "../../services/storage";
import spriteUrl from "../../images/icons/sprite.svg";

let instance = null;

const lockScroll = () => document.body.classList.add("is-modal-open");
const unlockScroll = () => document.body.classList.remove("is-modal-open");

const render = (template, data) =>
  template.replace(/\{\{(\w+)\}\}/g, (_, key) => data?.[key] ?? "");

const processTemplate = (html) => {
  return html.replace(/<use href="#/g, `<use href="${spriteUrl}#`);
};

export const openModal = (html, onShowCallback = null) => {
  instance && instance.close();

  const processedHtml = processTemplate(html);
  instance = basicLightbox.create(processedHtml, {
    onShow: (inst) => {
      lockScroll();

      const closeBtn = inst.element().querySelector("[data-modal-close]");
      closeBtn?.addEventListener("click", () => inst.close());

      const handleEscape = (event) => {
        event.key === "Escape" && inst.close();
      };
      document.addEventListener("keydown", handleEscape);
      inst.onKeyDownRef = handleEscape;

      onShowCallback && onShowCallback(inst);
    },
    onClose: (inst) => {
      unlockScroll();
      document.removeEventListener("keydown", inst.onKeyDownRef);
      instance = null;
    },
  });

  instance.show();
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

    openModal(html, (modalInstance) => {
      const modalElement = modalInstance.element();
      const libBtn = modalElement.querySelector(".btn-outline-2");

      if (!libBtn) return;

      const updateBtnText = () => {
        libBtn.textContent = isInLibrary(movie.id)
          ? "Remove from library"
          : "Add to my library";
      };

      updateBtnText();

      const handleLibBtn = () => {
        isInLibrary(movie.id)
          ? removeFromLibrary(movie.id)
          : addToLibrary(movie);

        updateBtnText();

        window.dispatchEvent(
          new CustomEvent("library:changed", { detail: { movieId: movie.id } })
        );
      };

      libBtn.addEventListener("click", handleLibBtn);
    });
  } catch (error) {
    console.error(error);
    openModal(alertTpl);
  }
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
      openModal(trailerErrorTpl);
      return;
    }

    const trailerHtml = render(trailerTpl, { trailer: trailer.key });
    openModal(trailerHtml);
  } catch (error) {
    console.error("Trailer Fetch Error:", error);
    openModal(trailerErrorTpl);
  }
};

const SPRITE_PATH = "/src/images/icons/sprite.svg";

const escapeHtml = (s = "") =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const githubIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.11 3.29 9.44 7.86 10.97.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.74-1.56 -2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18 .63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.25 5.69.42.36.79 1.08.79 2.18 0 1.57-.01 2.83-.01 3.22 0 .31.21.68.8.56 4.56-1.53 7.85-5.86 7.85-10.97C23.5 5.74 18.27.5 12 .5z"/></svg>`;
const linkedinIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zM8.98 8h4.37v1.91h.06 c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 6.99V22h-4.56v-6.57 c0-1.57-.03-3.59-2.19-3.59-2.19 0-2.52 1.71-2.52 3.48V22H8.98V8z"/></svg>`;

const createTeamMemberCard = (member) => {
  const name = escapeHtml(member?.name ?? "Unknown");
  const role = escapeHtml(member?.role ?? "");
  const avatar = escapeHtml(member?.avatar ?? "https://placehold.co/400");
  const gh = member?.github ? escapeHtml(member.github) : "";
  const li = member?.linkedin ? escapeHtml(member.linkedin) : "";

  return `
    <li class="team-card">
      <img class="team-card__avatar" src="${avatar}" alt="${name}" loading="lazy" />
      <p class="team-card__name">${name}</p>
      <p class="team-card__role">${role}</p>
      <div class="team-card__links">
        ${
          gh
            ? `<a class="team-card__icon" href="${gh}" target="_blank" rel="noreferrer" aria-label="GitHub">${githubIcon}</a>`
            : ""
        }
        ${
          li
            ? `<a class="team-card__icon" href="${li}" target="_blank" rel="noreferrer" aria-label="LinkedIn">${linkedinIcon}</a>`
            : ""
        }
      </div>
    </li>
  `.trim();
};

export const openTeamModal = () => {
  const membersItems = (Array.isArray(team) ? team : [])
    .map(createTeamMemberCard)
    .join("");

  const membersListMarkup = `<ul class="team-modal__grid">${membersItems}</ul>`;
  const html = render(teamModalTpl, { membersList: membersListMarkup });

  openModal(html);
};
