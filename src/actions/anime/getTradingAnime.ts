"use server";

import { getAnimeApi } from "@/lib/getAnime";
import { TrendingAnimeRes } from "@/types/anime";

export const getTradingAnime = async (
  { limit }: { limit?: number } = { limit: 10 },
) => {
  try {
    const { data } = await getAnimeApi.get<TrendingAnimeRes>("/trending", {
      params: { limit },
    });

    return { data };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
