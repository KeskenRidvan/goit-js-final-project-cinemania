import heroLandingTemplate from "./hero-landing/hero-landing.html?raw";
import heroMovieTemplate from "./hero-movie/hero-movie.html?raw";

import { createHeroLanding } from "./hero-landing/hero-landing";
import { createHeroMovie } from "./hero-movie/hero-movie";
import { heroTrendingRandomMovie } from "./hero.service";

import { openTrailerModal, openMovieDetailModal } from "../Modal/modal";

export const createHero = async () => {
  const heroRoot = document.querySelector("#hero");

  if (!heroRoot) return;

  const movie = await heroTrendingRandomMovie();

  if (movie) {
    heroRoot.innerHTML = heroMovieTemplate;
    createHeroMovie(movie);

    const trailerBtn = document.querySelector("#hero-movie__btn-trailer");
    const detailBtn = document.querySelector("#hero-movie__btn-detail");

    const handleTrailerBtn = (event) => {
      const id = event.currentTarget.dataset.movieId;

      id && openTrailerModal(id);
    };

    const handleDetailBtn = (event) => {
      const id = event.currentTarget.dataset.movieId;

      id && openMovieDetailModal(id);
    };

    trailerBtn?.addEventListener("click", (event) => handleTrailerBtn(event));
    detailBtn?.addEventListener("click", (event) => handleDetailBtn(event));

    return;
  }

  heroRoot.innerHTML = heroLandingTemplate;
  createHeroLanding();

  const startBtn = document.querySelector("#hero-landing__btn-start");

  const handleStartBtn = () => {
    window.location.href = "/catalog/";
  };

  startBtn?.addEventListener("click", handleStartBtn);
};
