"use server";

import { BASE_URL, ONE_DAY_IN_SECONDS } from "@/lib/constance";
import { AnimeStreamRes } from "@/types/anime";

export const getAnimeStream = async (epId: string) => {
  try {
    const req = await fetch(`${BASE_URL}/api/anime/episode/${epId}`, {
      next: {
        revalidate: ONE_DAY_IN_SECONDS,
        tags: ["trending_anime"],
      },
    });

    const data = (await req.json()) as AnimeStreamRes;

    return { data };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Something went wrong" };
  }
};
