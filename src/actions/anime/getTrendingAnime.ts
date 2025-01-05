"use server";

import { BASE_URL, ONE_DAY_IN_SECONDS } from "@/lib/constance";
import { TrendingAnimeRes } from "@/types/anime";

export const getTrendingAnime = async ({ page = 1 }: { page?: number }) => {
  try {
    const req = await fetch(`${BASE_URL}/api/anime/trending?page=${page}`, {
      next: {
        revalidate: ONE_DAY_IN_SECONDS,
        tags: ["trending_anime"],
      },
    });

    const data = (await req.json()) as TrendingAnimeRes;

    return { data };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
