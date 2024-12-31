"use server";

import { getAnimeApi } from "@/lib/getAnime";
import { TrendingAnimeRes } from "@/types/anime";

export const getRecommendedAnimeList = async ({
  animeId,
}: {
  animeId: string | number;
}) => {
  const res = await getAnimeApi.get<TrendingAnimeRes>(
    `/recommendations/${animeId}`,
    {
      params: { limit: 20 },
    },
  );

  return res.data;
};
