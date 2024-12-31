"use server";

import { getAnimeApiV1 } from "@/lib/getAnime";
import { AnimeEpisodeRes } from "@/types/anime";

export const getAnimeEpisodes = async ({ animeId }: { animeId: string }) => {
  try {
    const { data } = await getAnimeApiV1.get<AnimeEpisodeRes>(
      `/episode/${animeId}`,
    );

    return { data };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Something went wrong" };
  }
};
