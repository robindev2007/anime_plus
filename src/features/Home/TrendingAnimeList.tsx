import { getTrendingAnime } from "@/actions/anime/getTrendingAnime";
import AnimeCard from "@/components/AnimeList/AnimeCard";
import React from "react";

async function TrendingAnimeList() {
  const { data: animeData } = await getTrendingAnime({
    page: 1,
  });

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {animeData?.results.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
}

export default TrendingAnimeList;
