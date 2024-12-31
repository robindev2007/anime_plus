"use server";

import { getAnimeApi } from "@/lib/getAnime";
import { TrendingAnimeRes } from "@/types/anime";

export const getTradingAnime = async (
  { limit }: { limit?: number } = { limit: 10 },
) => {
  const res = await getAnimeApi.get<TrendingAnimeRes>("/trending", {
    params: { limit },
  });

  return res.data;
};
