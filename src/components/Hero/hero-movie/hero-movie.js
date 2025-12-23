import "./hero-movie.css";

const SPRITE_PATH = "/src/images/icons/sprite.svg";

const clampTextByWords = (text, maxWords) => {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  return words.length <= maxWords
    ? text
    : `${words.slice(0, maxWords).join(" ")}...`;
};

const getStarsMarkup = (voteAverage) => {
  const rating5 = (voteAverage || 0) / 2;
  const fullStars = Math.floor(rating5);
  const hasHalf = rating5 - fullStars >= 0.5;

  const star = (id) => `
    <li class="hero-movie__star-item">
      <svg class="star"><use href="${SPRITE_PATH}#${id}"></use></svg>
    </li>`;

  let markup = "";
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      markup += star("icon-star-full");
    } else if (i === fullStars && hasHalf) {
      markup += star("icon-star-half");
    } else {
      markup += star("icon-star-empty");
    }
  }
  return markup;
};

export const createHeroMovie = (movie) => {
  if (!movie) return;

  const selectors = {
    container: ".hero-movie__container",
    title: ".hero-movie__title",
    desc: ".hero-movie__description",
    stars: ".hero-movie__star-container",
    trailerBtn: "#hero-movie__btn-trailer",
    detailBtn: "#hero-movie__btn-detail",
  };

  const elements = {};
  for (const [key, selector] of Object.entries(selectors)) {
    elements[key] = document.querySelector(selector);
  }

  const { container, title, desc, stars, trailerBtn, detailBtn } = elements;

  if (!container) return;

  const baseUrl = import.meta.env.VITE_TMDB_API_IMAGE_BASE_URL;
  const imageUrl = movie.backdrop_path
    ? `${baseUrl}${movie.backdrop_path}`
    : "";

  container.style.setProperty("--hero-bg-url", `url("${imageUrl}")`);

  title && (title.textContent = movie.title);
  desc && (desc.textContent = clampTextByWords(movie.overview, 20));
  stars && (stars.innerHTML = getStarsMarkup(movie.vote_average));

  [trailerBtn, detailBtn].forEach((btn) =>
    btn?.setAttribute("data-movie-id", movie.id)
  );
};
