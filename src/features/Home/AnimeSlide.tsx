import { Button } from "@/components/ui/button";
import { TrendingAnimeRes } from "@/types/anime";
import Image from "next/image";
import React from "react";
import { FaAngleRight, FaPlay } from "react-icons/fa6";

function AnimeSlide({ anime }: { anime: TrendingAnimeRes["results"][0] }) {
  const title =
    anime.title.english ||
    anime.title.romaji ||
    anime.title.userPreferred ||
    "";

  const coverImage =
    anime.coverImage.extraLarge ||
    anime.coverImage.large ||
    anime.coverImage.medium;

  return (
    <div className="h-[40vh] min-h-[15rem]">
      <Image
        src={anime.coverImage.large}
        alt={title}
        height={8000}
        width={8000}
        objectFit="cover"
        className="h-full w-full bg-left object-cover blur-xl brightness-50"
      />
      <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-row gap-4 p-3">
        <Image
          src={coverImage}
          height={800}
          width={700}
          alt={title}
          className="w-auto"
        />

        <div className="flex flex-col justify-center bg-opacity-50 p-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <div className="flex flex-wrap gap-2">
            <Button className="rounded-full text-lg">
              <FaPlay /> Watch now
            </Button>
            <Button variant={"secondary"} className="rounded-full text-lg">
              Details
              <FaAngleRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeSlide;
