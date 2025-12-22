import { axiosClient } from "../../services/axiosClient";

export const heroTrendingRandomMovie = async () => {
  try {
    const response = await axiosClient.get("/trending/movie/day");

    if (!response.data.results.length) return null;

    return response.data.results[
      Math.floor(Math.random() * response.data.results.length)
    ];
  } catch (error) {
    console.error("Film verisi çekilemedi:", error);
    return null;
  }
};
