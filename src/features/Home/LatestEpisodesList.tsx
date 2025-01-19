import AnimeList from "@/components/AnimeList";
import { LatestCompletedAnime } from "@/types/anime";
import React from "react";

function LatestEpisodesList({ animes }: { animes: LatestCompletedAnime[] }) {
  return (
    <div className="space-y-2">
      <AnimeList animeList={animes} sectionTitle="Latest Episodes" />
    </div>
  );
}

export default LatestEpisodesList;
