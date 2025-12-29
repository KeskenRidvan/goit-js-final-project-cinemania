import "./header.css";
import headerTemplate from "./header.html?raw";
import { initTheme } from "../../javascript/theme";

const setActiveNavLink = () => {
  const currentPath = window.location.pathname;

  const navLinks = document.querySelectorAll(".header__nav-link");

  navLinks.forEach((link) => {
    const linkPath = new URL(link.href).pathname;

    linkPath === currentPath
      ? link.classList.add("header__active-link")
      : link.classList.remove("header__active-link");
  });
};

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

  initTheme();
  setActiveNavLink();
};
