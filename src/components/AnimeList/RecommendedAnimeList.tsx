import React from "react";
import AnimeList from ".";
import { getRecommendedAnimeList } from "@/actions/anime/getRecommendedAnimeList";

async function RecommendedAnimeList({ animeId }: { animeId: string | number }) {
  const animeList = await getRecommendedAnimeList({ animeId });

  return (
    <div className="space-y-1">
      <p className="text-lg text-primary">
        <strong>Recommended Anime&apos;s for you</strong>
      </p>
      <AnimeList animeList={animeList.results ?? []} />
    </div>
  );
}

export default RecommendedAnimeList;
