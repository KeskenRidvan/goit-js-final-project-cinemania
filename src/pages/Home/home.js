import "../../styles/main.css";

import { createHeader } from "../../components/Header/header";
import { createHero } from "../../components/Hero/hero";

document.addEventListener("DOMContentLoaded", () => {
  createHeader();
  createHero();
});
