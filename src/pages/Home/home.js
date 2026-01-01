import "../../styles/main.css";

import { createHeader } from "../../components/Header/header";
import { createHero } from "../../components/Hero/hero";
import { createFooter } from "../../components/Footer/footer";
import { createWeeklyTrends } from "../../components/Movie/weekly-trends/weekly-trends";
import { createUpcomingThisMonth } from "../../components/Movie/upcoming-this-month/upcoming-this-month";

const initHome = () => {
  createHeader();
  createHero();
  createWeeklyTrends();
  createUpcomingThisMonth();
  createFooter();
};

document.addEventListener("DOMContentLoaded", initHome);
