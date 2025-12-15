export const initTheme = () => {
  const body = document.querySelector("body");

  const themeBtn = document.querySelector("#theme-switch");
  const theme = document.querySelector(".theme-switch-handle");

  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "light") {
    body.classList.add("themeLight");
    theme.classList.add("theme-light");
  }

  const handleThemeBtn = () => {
    body.classList.toggle("themeLight");
    themeBtn.classList.toggle("theme-light");

    body.classList.contains("themeLight")
      ? localStorage.setItem("theme", "light")
      : localStorage.setItem("theme", "dark");
  };

  themeBtn.addEventListener("click", handleThemeBtn);
};
