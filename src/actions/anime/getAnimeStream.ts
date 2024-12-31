"use server";

import { getAnimeApi } from "@/lib/getAnime";
import { AnimeStreamRes } from "@/types/anime";

export const getAnimeStream = async ({
  gogoId,
  epId,
}: {
  gogoId: string;
  epId: string;
}) => {
  try {
    const { data } = await getAnimeApi.get<AnimeStreamRes>(
      `/stream/${gogoId}/${epId}`,
    );

    return { data };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Something went wrong" };
  }
};
