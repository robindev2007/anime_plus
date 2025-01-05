import Dot from "@/components/ui/dot";
import { SingleAnimeInfoRes } from "@/types/anime";
import Image from "next/image";
import React from "react";

function AnimeDetails({ animeInfo }: { animeInfo: SingleAnimeInfoRes }) {
  const animeTitle = animeInfo.title || animeInfo.japaneseTitle;

  return (
    <div className="h-full flex-col gap-5 overflow-y-auto p-3 md:flex lg:py-0">
      <div>
        <Image
          src={animeInfo.image}
          height={800}
          width={800}
          alt={animeTitle}
          className="mx-auto max-w-28 overflow-hidden rounded lg:mx-0 lg:max-w-[40%]"
        />
      </div>
      <div className="col-span-3 space-y-2">
        <h2 className="text-lg font-semibold">{animeTitle}</h2>
        <div className="flex items-center gap-2 text-sm font-semibold">
          <div className="flex gap-0.5 overflow-hidden rounded-sm">
            <div className="w-fit bg-foreground px-2 text-background">
              {"HD"}
            </div>
            <div className="w-fit bg-primary-2 px-2 text-primary-foreground-2">
              {animeInfo.hasDub ? "Dub" : "Sub"}
            </div>
          </div>
          <Dot />
          <div>{animeInfo.type}</div>
        </div>

        <div className="">
          <p
            tabIndex={1}
            className="prose-zinc max-h-32 overflow-y-auto text-xs"
            dangerouslySetInnerHTML={{
              __html: animeInfo.description,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AnimeDetails;
