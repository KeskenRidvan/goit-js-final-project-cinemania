import "./hero-movie.css";

import starFill from "/src/images/mobile/hero/star-fill.png";
import starHalf from "/src/images/mobile/hero/star-half.png";
import starEmpty from "/src/images/mobile/hero/star-empty.png";

const SPRITE_PATH = "/src/images/icons/sprite.svg";
const STAR_HALF = "/src/images/icons/sprite.svg#icon-star-half";
const STAR_EMPTY = "/src/images/icons/sprite.svg#icon-star-empty";

const clampTextByWords = (text, maxWords) => {
  if (!text) return "";

  const words = text.trim().split(/\s+/).filter(Boolean);

  if (words.length <= maxWords) return text.trim();

  return `${words.slice(0, maxWords).join(" ")}...`;
};

const getStarsMarkup = (voteAverage) => {
  const rating5 = Math.max(0, Math.min(5, (voteAverage || 0) / 2));
  const fullStars = Math.floor(rating5);
  const hasHalf = rating5 - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  const createStar = (iconId) => `
    <li class="hero-movie__star-item">
      <svg class="star">
        <use href="${SPRITE_PATH}#${iconId}"></use>
      </svg>
    </li>`;

  return [
    ...Array(fullStars).fill(createStar("icon-star-full")),
    ...(hasHalf ? [createStar("icon-star-half")] : []),
    ...Array(emptyStars).fill(createStar("icon-star-empty")),
  ].join("");
};

export const createHeroMovie = (movie) => {
  if (!movie) return;

  const containerEl = document.querySelector(".hero-movie__container");
  const titleEl = document.querySelector(".hero-movie__title");
  const descEl = document.querySelector(".hero-movie__description");
  const starEl = document.querySelector(".hero-movie__star-container");

  if (!containerEl || !titleEl || !descEl || !starEl) return;

  const baseUrl = import.meta.env.VITE_TMDB_API_IMAGE_BASE_URL;
  const fallback = "https://via.placeholder.com/1280x720?text=No+Image";

  const path = movie.backdrop_path || movie.poster_path;
  const imageUrl = path ? `${baseUrl}${path}` : fallback;

  containerEl.style.setProperty("--hero-bg-url", `url("${imageUrl}")`);

  titleEl.textContent = movie.title || "";
  descEl.textContent = clampTextByWords(movie.overview, 20);

  starEl.innerHTML = getStarsMarkup(movie.vote_average);
};
