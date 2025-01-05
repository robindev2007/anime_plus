import { AnimeT } from "@/types/anime";
import React from "react";
import Image from "next/image";
import { FaClosedCaptioning, FaMicrophone, FaPlay } from "react-icons/fa6";
import Link from "next/link";
import Dot from "../ui/dot";

function AnimeCard({ anime }: { anime: AnimeT }) {
  return (
    <Link href={`/anime/${anime.id}`} className="flex flex-col gap-1">
      <div className="group relative overflow-hidden">
        <Image
          src={anime.image}
          alt={anime.title || anime.japaneseTitle}
          height={300}
          width={200}
          className="-z-10 aspect-[167/237] w-full object-cover"
        />
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-card/70 opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100">
          <FaPlay size={45} className="text-primary-3 drop-shadow-xl" />
        </div>

        {/* image overlay */}
        <div className="absolute bottom-0 left-0 z-10 h-[15%] w-full bg-gradient-to-t from-background/90 to-transparent p-2" />

        {/* ep data */}
        <div className="absolute bottom-1 left-1 z-10 flex gap-0.5 overflow-hidden rounded-sm">
          {/* Total sub */}
          {anime.sub > 0 && (
            <div className="flex w-fit items-center gap-0.5 bg-primary-2 p-2 py-1 text-xs font-bold text-primary-foreground-2">
              <FaClosedCaptioning />
              <p className="leading-[10px]"> {anime.sub}</p>
            </div>
          )}

          {/* Total dub */}
          {anime.dub > 0 && (
            <div className="flex w-fit items-center gap-0.5 bg-primary-3 p-2 py-1 text-xs font-bold text-primary-foreground-3">
              <FaMicrophone className="-mt-0.5" />
              <p className="leading-[10px]">{anime.dub}</p>
            </div>
          )}

          {/* Total ep */}
          {anime.episodes > 0 && (
            <div className="flex w-fit items-center gap-0.5 bg-foreground/20 p-2 py-1 text-xs font-bold backdrop-blur">
              <p className="leading-[10px]">{anime.episodes}</p>
            </div>
          )}
        </div>
      </div>

      {/* title details */}
      <div className="space-y-1">
        <p className="line-clamp-1 text-sm font-bold hover:text-primary">
          {anime.title || anime.japaneseTitle}
        </p>
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <p>{anime.type}</p>
          <Dot />
          <p>{anime.duration}</p>
        </div>
      </div>
    </Link>
  );
}

export default AnimeCard;
