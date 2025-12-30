import "./footer.css";
import footerTpl from "./footer.html?raw";

import { openTeamModal } from "../Modal/modal";

export const createFooter = () => {
  const footerRoot = document.querySelector("#footer");
  if (!footerRoot) return;

  footerRoot.innerHTML = footerTpl;

  const btn = footerRoot.querySelector("[data-open-team]");
  if (!btn) return;

  if (btn.dataset.bound === "true") return;
  btn.dataset.bound = "true";

  btn.addEventListener("click", openTeamModal);
};
