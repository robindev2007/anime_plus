import React from "react";
import AnimeList from ".";
import { Recommendation } from "@/types/anime";

async function RecommendedAnimeList({
  animeList,
}: {
  animeList: Recommendation[];
}) {
  return (
    <div className="space-y-1">
      <p className="text-lg text-primary">
        <strong>Recommended Anime&apos;s for you</strong>
      </p>
      <AnimeList animeList={animeList} />
    </div>
  );
}

export default RecommendedAnimeList;
