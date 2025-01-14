import { AnimeSearchRes } from "@/types/anime";
import React from "react";
import Dot from "../ui/dot";
import Link from "next/link";
import Image from "next/image";

function AnimeResults({
  animeList,
  setSearchActive,
}: {
  animeList: AnimeSearchRes["results"];
  setSearchActive: (active: boolean) => void;
}) {
  return (
    <div className="flex flex-col divide-y divide-dashed divide-muted-foreground/20">
      {animeList.map((anime) => (
        <SingleAnimeSearchResult
          key={anime.id}
          anime={anime}
          setSearchActive={setSearchActive}
        />
      ))}
    </div>
  );
}

export default AnimeResults;

const SingleAnimeSearchResult = ({
  anime,
  setSearchActive,
}: {
  anime: AnimeSearchRes["results"][0];
  setSearchActive: (active: boolean) => void;
}) => {
  const title = anime.title || anime.japaneseTitle || "";

  const coverImage = anime.image;

  return (
    <Link
      onClick={() => setSearchActive(false)}
      href={`/anime/${anime.id}`}
      className="flex items-center p-2 hover:bg-secondary"
    >
      <Image
        height={156}
        width={140}
        src={coverImage}
        alt={title}
        className="h-14 w-10 object-cover"
      />
      <div className="ml-2 space-y-0.5">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs font-semibold text-muted-foreground">{title}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <p>{anime.type}</p>
          <Dot />
          <p>{anime.id}</p>
        </div>
      </div>
    </Link>
  );
};
