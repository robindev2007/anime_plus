"use server";
import axios from "axios";

const API_URL = process.env.API_URL;

export const getAnimeApi = axios.create({
  baseURL: `${API_URL}/api/v2`, // Update with the correct URL
});

export const getAnimeApiV1 = axios.create({
  baseURL: `${API_URL}/api/v1`, // Update with the correct URL
});

export const animeApi = axios.create({
  baseURL: "/api/anime",
});
