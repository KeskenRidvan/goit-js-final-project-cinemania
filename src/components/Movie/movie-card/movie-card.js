import "./movie-card.css";
import template from "./movie-card.html?raw";

const SPRITE_PATH = "/src/images/icons/sprite.svg";

const render = (tpl, data) =>
  tpl.replace(/\{\{(\w+)\}\}/g, (_, key) => data?.[key] ?? "");

const getStarsMarkup = (voteAverage) => {
  const rating5 = (voteAverage || 0) / 2;
  const fullStars = Math.floor(rating5);
  const hasHalf = rating5 - fullStars >= 0.5;

  const star = (id) => `
    <li class="movie-card__star-item">
      <svg class="movie-card__star">
        <use href="${SPRITE_PATH}#${id}"></use>
      </svg>
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

export const createMovieCardMarkup = (movie) => {
  const baseImg = import.meta.env.VITE_TMDB_API_IMAGE_BASE_URL;

  const title = movie.title ?? "No Title";
  const starsMarkup = getStarsMarkup(movie.vote_average);

  return render(template, {
    id: movie.id,
    title,
    poster: movie.poster_path
      ? `${baseImg}${movie.poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Image",
    year: movie.release_date?.slice(0, 4) ?? "N/A",
    genres: Array.isArray(movie.genres)
      ? movie.genres.map((g) => g.name).join(", ")
      : "Movie",
    starsList: `<ul class="movie-card__stars">${starsMarkup}</ul>`,
  });
};
