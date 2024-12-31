"use server";

import { getAnimeApi } from "@/lib/getAnime";

export const getPopularAnime = async () => {
  try {
    const { data } = await getAnimeApi.get("/popular", {
      params: { limit: 10 },
    });

    return { data };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
