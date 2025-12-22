import heroLandingTemplate from "./hero-landing/hero-landing.html?raw";
import heroMovieTemplate from "./hero-movie/hero-movie.html?raw";

import { createHeroLanding } from "./hero-landing/hero-landing";
import { createHeroMovie } from "./hero-movie/hero-movie";
import { heroTrendingRandomMovie } from "./hero.service";

export const createHero = async () => {
  const heroRoot = document.querySelector("#hero");

  const movie = await heroTrendingRandomMovie();

  if (movie) {
    heroRoot.innerHTML = heroMovieTemplate;
    createHeroMovie(movie);
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
