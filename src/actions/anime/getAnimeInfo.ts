"use server";

import { BASE_URL, ONE_DAY_IN_SECONDS } from "@/lib/constance";
import { SingleAnimeInfoRes } from "@/types/anime";

export const getAnimeInfo = async ({
  animeId,
}: {
  animeId: number | string;
}) => {
  try {
    const req = await fetch(`${BASE_URL}/api/anime/info/${animeId}`, {
      next: {
        revalidate: ONE_DAY_IN_SECONDS,
        tags: ["trending_anime"],
      },
    });

    const data = (await req.json()) as SingleAnimeInfoRes;

    return { data };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
