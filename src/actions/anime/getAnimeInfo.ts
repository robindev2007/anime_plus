"use server";

import { getAnimeApi } from "@/lib/getAnime";
import { AnimeInfoResT } from "@/types/anime";

export const getAnimeInfo = async ({
  animeId,
}: {
  animeId: number | string;
}) => {
  try {
    const { data } = await getAnimeApi.get<AnimeInfoResT>(`/info/${animeId}`);

    return { data };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong", data: null };
  }
};
