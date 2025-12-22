import "./hero-landing.css";

const DESCRIPTIONS = {
  mobile: `Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers.`,
  tablet: `Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.`,
};

export const createHeroLanding = () => {
  const descriptionEl = document.querySelector(".hero-landing__description");
  if (!descriptionEl) return;

  const mediaQuery = window.matchMedia("(min-width: 768px)");

  const updateDescription = (isTablet) => {
    descriptionEl.textContent = isTablet
      ? DESCRIPTIONS.tablet
      : DESCRIPTIONS.mobile;
  };

  updateDescription(mediaQuery.matches);

  mediaQuery.addEventListener("change", (event) => {
    updateDescription(event.matches);
  });
};
