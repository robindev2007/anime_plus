import { TrendingAnime } from "@/types/anime";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function TrendingAnimeCard({ anime }: { anime: TrendingAnime }) {
  return (
    <Link
      href={`/anime/${anime.id}`}
      className="relative flex h-full overflow-hidden md:pl-7"
    >
      <div className="absolute right-0 top-0 bg-foreground px-2 text-background sm:hidden">
        {anime.rank}
      </div>

      {/* Title and rank */}
      <div className="absolute left-0 top-0 hidden h-full w-6 shrink-0 flex-col items-center justify-end gap-3 overflow-y-hidden truncate text-end text-sm md:flex">
        <p className="vertical-lr rotate-180 truncate">{anime.name}</p>
        <span className="font-semibold text-primary">
          {("0" + anime.rank).slice(-2)}
        </span>
      </div>
      <div className="aspect-anime-poster h-full overflow-hidden">
        <Image
          src={anime.poster}
          height={800}
          width={800}
          alt={`Watch ${anime.name}`}
          className="pointer-events-none h-full w-full object-cover"
        />
      </div>
    </Link>
  );
}

export default TrendingAnimeCard;
