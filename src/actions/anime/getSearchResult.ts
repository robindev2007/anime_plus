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
  const { data } = await getAnimeApi.get<AnimeSearchResultRes>("/search", {
    params: {
      q: query,
      p: page,
      limit,
    },
  });

  return data;
};
