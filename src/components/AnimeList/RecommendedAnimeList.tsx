import React from "react";
import AnimeList from ".";
import { RelatedAnime } from "@/types/anime";

async function RecommendedAnimeList({
  animeList,
}: {
  animeList: RelatedAnime[];
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
