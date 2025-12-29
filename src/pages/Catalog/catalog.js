import "../../styles/main.css";

import { createHeader } from "../../components/Header/header";

const initLibrary = () => {
  createHeader();
};

document.addEventListener("DOMContentLoaded", initLibrary);
