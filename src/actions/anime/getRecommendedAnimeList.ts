"use server";

import { getAnimeApi } from "@/lib/getAnime";
import { TrendingAnimeRes } from "@/types/anime";

export const getRecommendedAnimeList = async ({
  animeId,
}: {
  animeId: string | number;
}) => {
  try {
    const { data } = await getAnimeApi.get<TrendingAnimeRes>(
      `/recommendations/${animeId}`,
      {
        params: { limit: 20 },
      },
    );

    return { data };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
