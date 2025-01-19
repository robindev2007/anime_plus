import axios from "axios";

export const AnimeAPi = axios.create({
  baseURL: process.env.ANIME_API,
});
