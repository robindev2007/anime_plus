import { SearchSuggestion } from "@/types/anime";
import { delay } from "@/utils/wait";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoDotFill } from "react-icons/go";

function SingleSearchResult({
  anime,
  setSearchActive,
}: {
  anime: SearchSuggestion;
  setSearchActive: (value: boolean) => void;
}) {
  return (
    <Link
      href={`/anime/${anime.id}`}
      onClick={async () => {
        await delay(0.2);
        setSearchActive(false);
      }}
      className="flex gap-2 border-b border-dashed border-foreground/20 p-2 transition-colors odd:bg-secondary/10 hover:bg-secondary/20"
    >
      <Image
        src={anime.poster}
        height={500}
        width={500}
        alt={`Watch ${anime.name}`}
        className="aspect-anime-poster h-16 w-fit overflow-hidden rounded object-cover"
      />
      <div className="space-y-1">
        <p className="text-sm">{anime.name}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {anime.moreInfo.map((info) => (
            <>
              <p key={info}>{info}</p>
              <GoDotFill className="last:hidden" />
            </>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default SingleSearchResult;
