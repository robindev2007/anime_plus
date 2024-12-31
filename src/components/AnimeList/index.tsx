import { AnimeT } from "@/types/anime";
import React from "react";
import AnimeCard from "./AnimeCard";

function AnimeList({ animeList }: { animeList: AnimeT[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {animeList?.map((anime) => <AnimeCard key={anime.id} anime={anime} />)}
    </div>
  );
}

export default AnimeList;
