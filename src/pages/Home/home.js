import "../../styles/main.css";

import { createHeader } from "../../components/Header/header";
import { createHero } from "../../components/Hero/hero";
import { createFooter } from "../../components/Footer/footer";
import { createWeeklyTrends } from "../../components/Movie/weekly-trends/weekly-trends";

const initHome = () => {
  createHeader();
  createHero();
  createWeeklyTrends();
  createFooter();
};

document.addEventListener("DOMContentLoaded", initHome);
