import "./header.css";

import headerTemplate from "./header.html?raw";

export const createHeader = () => {
  const header = document.querySelector("#header");
  header.innerHTML = headerTemplate;

  const mobileMenu = document.querySelector(".header__nav-menu");
  const mobileMenuBtn = document.querySelector(".header__menu-btn");

  const backdrop = document.querySelector(".header__backdrop");

  const handleMobileMenuBtn = () => {
    mobileMenu.classList.toggle("header__nav-menu-active");
    backdrop.classList.toggle("header__backdrop-active");
  };

  mobileMenuBtn.addEventListener("click", handleMobileMenuBtn);
  backdrop.addEventListener("click", handleMobileMenuBtn);
};
