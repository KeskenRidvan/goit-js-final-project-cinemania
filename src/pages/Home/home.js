import "../../styles/main.css";

import { createHeader } from "../../components/Header/header";
import { createHero } from "../../components/Hero/hero";
import { createFooter } from "../../components/Footer/footer";

document.addEventListener("DOMContentLoaded", () => {
  createHeader();
  createHero();
  createFooter();
});
