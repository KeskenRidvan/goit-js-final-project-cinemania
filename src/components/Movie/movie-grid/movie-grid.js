import "./movie-grid.css";
import { createMovieCardMarkup } from "../movie-card/movie-card";

export const renderMovieGrid = (movies, container) => {
  container.classList.add("movie-grid");
  container.innerHTML = movies.map(createMovieCardMarkup).join("");
};
