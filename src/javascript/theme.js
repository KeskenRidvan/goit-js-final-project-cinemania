import { saveTheme, getSavedTheme } from "../services/storage";

export const initTheme = () => {
  const switchBtn = document.querySelector("#theme-switch");
  const body = document.body;

  const savedTheme = getSavedTheme();

  if (savedTheme === "light") {
    body.classList.add("themeLight");
    switchBtn?.classList.add("theme-light");
  } else {
    body.classList.remove("themeLight");
    switchBtn?.classList.remove("theme-light");
  }

  switchBtn?.addEventListener("click", () => {
    body.classList.toggle("themeLight");
    switchBtn.classList.toggle("theme-light");

    const isLight = body.classList.contains("themeLight");
    saveTheme(isLight);
  });
};
