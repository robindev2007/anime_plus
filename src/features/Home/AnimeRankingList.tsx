import { MostFavoriteAnime } from "@/types/anime";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaChevronRight,
  FaClosedCaptioning,
  FaMicrophone,
} from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";

function AnimeRankingList({
  animeList,
  listTitle = "Animes",
}: {
  animeList: MostFavoriteAnime[];
  listTitle: string;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-primary">{listTitle}</h3>
      <div className="flex flex-col">
        {animeList.slice(0, 5).map((anime) => (
          <AnimeRankCard key={anime.id} anime={anime} />
        ))}
      </div>
      <Link
        href={"#"}
        className="flex items-center gap-1 text-xs transition-all ease-linear hover:gap-2 hover:text-primary"
      >
        View more <FaChevronRight />
      </Link>
    </div>
  );
}

export default AnimeRankingList;

const AnimeRankCard = ({ anime }: { anime: MostFavoriteAnime }) => {
  return (
    <div className="flex gap-2 border-b py-3">
      <Link href={`/anime/${anime.id}`}>
        <Image
          className="aspect-anime-poster h-full w-10 rounded-[2px]"
          src={anime.poster}
          height={200}
          width={200}
          alt={`Watch ${anime.name}`}
        />
      </Link>

      <div className="space-y-0.5">
        <Link href={`/anime/${anime.id}`}>
          <p className="line-clamp-1 text-xs transition-colors hover:text-primary">
            {anime.name}
          </p>
        </Link>
        <div className="flex flex-row items-center gap-2">
          <div className="flex w-fit gap-0.5 overflow-hidden rounded-sm text-xs">
            {/* Total sub */}
            {anime.episodes.sub > 0 && (
              <div className="flex w-fit items-center gap-0.5 bg-primary-2 p-2 py-1 font-bold text-primary-foreground-2">
                <FaClosedCaptioning />
                <p className="leading-[10px]">{anime.episodes.sub}</p>
              </div>
            )}

            {/* Total dub */}
            {anime.episodes.dub && anime.episodes.dub > 0 && (
              <div className="flex w-fit items-center gap-0.5 bg-primary-3 p-2 py-1 font-bold text-primary-foreground-3">
                <p className="leading-[10px]">{anime.episodes.dub}</p>
                <FaMicrophone className="-mt-0.5" />
              </div>
            )}
          </div>
          <GoDotFill size={10} className="text-muted-foreground" />
          <p className="text-xs text-foreground/60">{anime.type}</p>
        </div>
      </div>
    </div>
  );
};
