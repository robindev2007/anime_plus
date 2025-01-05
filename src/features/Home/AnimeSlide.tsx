import { Button } from "@/components/ui/button";
import { TrendingAnimeRes } from "@/types/anime";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaAngleRight, FaPlay } from "react-icons/fa6";

function AnimeSlide({
  anime,
  spotlight,
}: {
  anime: TrendingAnimeRes["results"][0];
  spotlight: number;
}) {
  const title = anime.title || anime.japaneseTitle || "";

  const coverImage = anime.image;

  return (
    <div className="relative h-[40vh] min-h-[15rem]">
      <Image
        src={coverImage}
        fill
        alt={title}
        className="poster_image w-full bg-cover"
        objectFit="cover"
      />

      <div className="poster_image_container absolute left-0 top-0 z-10 flex h-full w-full flex-row gap-4 from-background/20 to-background p-3">
        <div className="flex max-w-[60%] flex-col justify-end gap-1 bg-opacity-50 p-0">
          <p className="text-sm font-semibold text-primary">
            #Spotlight {spotlight}
          </p>
          <h2 className="text-2xl font-bold leading-7">{title}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href={`/watch/${anime.id}`}>
              <Button className="rounded-full text-lg">
                <FaPlay /> Watch now
              </Button>
            </Link>
            <Link href={`/anime/${anime.id}`}>
              <Button variant={"secondary"} className="rounded-full text-lg">
                Details
                <FaAngleRight />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeSlide;
