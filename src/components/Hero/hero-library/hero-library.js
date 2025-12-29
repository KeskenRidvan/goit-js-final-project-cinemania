import "./hero-library.css";
import heroLibraryTemplate from "./hero-library.html?raw";

export const createLibraryHero = () => {
  const libraryHero = document.querySelector("#library__hero");

  libraryHero && (libraryHero.innerHTML = heroLibraryTemplate);
};
