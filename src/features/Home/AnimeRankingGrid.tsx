import { HomePageAnimeRes } from "@/types/anime";
import React from "react";
import AnimeRankingList from "./AnimeRankingList";

function AnimeRankingGrid({ animeData }: { animeData?: HomePageAnimeRes }) {
  if (!animeData) return <div>No anime found</div>;

  return (
    <div className="grid grid-cols-1 gap-3 gap-y-7 sm:grid-cols-2 md:grid-cols-4">
      <AnimeRankingList
        animeList={animeData.topAiringAnimes}
        listTitle="Top Airing"
      />
      <AnimeRankingList
        animeList={animeData.mostPopularAnimes}
        listTitle="Most Popular"
      />
      <AnimeRankingList
        animeList={animeData.mostFavoriteAnimes}
        listTitle="Most Favorite"
      />
      <AnimeRankingList
        animeList={animeData.latestCompletedAnimes}
        listTitle="Latest Completed"
      />
    </div>
  );
}

export default AnimeRankingGrid;
