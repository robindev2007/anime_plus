"use server";

import { BASE_URL } from "@/lib/constance";
import { AnimeSearchRes } from "@/types/anime";
import axios from "axios";

export const getAnimeSearchResult = async ({
  search,
}: {
  search: string;
  page: number;
}) => {
  try {
    const { data } = await axios.get<AnimeSearchRes>(
      `${BASE_URL}/api/anime/search?searchQuery=${search}`,
    );

    return { data };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
