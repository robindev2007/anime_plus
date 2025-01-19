import { SearchSuggestion } from "@/types/anime";
import React from "react";
import SingleSearchResult from "./SingleSearchResult";

function AnimeSearchResults({
  animes,
  setSearchActive,
}: {
  animes: SearchSuggestion[];
  setSearchActive: (value: boolean) => void;
}) {
  return (
    <div>
      {animes.length ? (
        animes.map((anime) => (
          <SingleSearchResult
            setSearchActive={setSearchActive}
            key={anime.id}
            anime={anime}
          />
        ))
      ) : (
        <div className="p-3 pt-0 text-center">
          <p className="text-xs text-muted-foreground">No anime found</p>
        </div>
      )}
    </div>
  );
}

export default AnimeSearchResults;
