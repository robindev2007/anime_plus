"use server";
import axios from "axios";

export const getAnimeApi = axios.create({
  baseURL: "https://api.amvstr.me/api/v2", // Update with the correct URL
});

export const getAnimeApiV1 = axios.create({
  baseURL: "https://api.amvstr.me/api/v1", // Update with the correct URL
});
