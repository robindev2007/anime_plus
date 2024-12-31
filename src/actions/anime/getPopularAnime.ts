"use server";

import { getAnimeApi } from "@/lib/getAnime";

export const getPopularAnime = async () => {
  const res = await getAnimeApi.get("/popular", {
    params: { limit: 10 },
  });

  return res.data;
};
