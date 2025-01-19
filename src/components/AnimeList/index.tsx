import { TopAiringAnime } from "@/types/anime";
import React from "react";
import AnimeCard from "./AnimeCard";
import SectionHeading from "../SectionHeading";

function AnimeList({
  animeList = [],
  sectionTitle,
}: {
  animeList: TopAiringAnime[];
  sectionTitle?: string;
}) {
  return (
    <div className="space-y-2">
      {sectionTitle && <SectionHeading title={sectionTitle} />}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {animeList?.map((anime) => <AnimeCard key={anime.id} anime={anime} />)}
      </div>
    </div>
  );
}

export default AnimeList;
