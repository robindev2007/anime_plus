"use server";

import { getAnimeApi } from "@/lib/getAnime";
import { AnimeSearchResultRes } from "@/types/anime";

export const getAnimeSearchResult = async ({
  limit = 20,
  page = 1,
  query,
}: {
  query: string;
  page: number;
  limit: number;
}) => {
  try {
    const { data } = await getAnimeApi.get<AnimeSearchResultRes>("/search", {
      params: {
        q: query,
        p: page,
        limit,
      },
    });

    return { data };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
