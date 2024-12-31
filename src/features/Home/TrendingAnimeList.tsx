import { getTradingAnime } from "@/actions/anime/getTradingAnime";
import AnimeCard from "@/components/AnimeList/AnimeCard";
import React from "react";

async function TrendingAnimeList() {
  const { results } = await getTradingAnime();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {results.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
}

export default TrendingAnimeList;
