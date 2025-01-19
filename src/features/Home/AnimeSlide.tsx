import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Dot from "@/components/ui/dot";
import { SpotlightAnime } from "@/types/anime";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaAngleRight,
  FaClosedCaptioning,
  FaMicrophone,
  FaPlay,
} from "react-icons/fa6";

function AnimeSlide({ anime }: { anime: SpotlightAnime }) {
  const title = anime.name || anime.jname || "";

  const coverImage = anime.poster;

  return (
    <Container className="relative h-[50vh] shrink-0 p-0 md:h-[65vh]">
      <div className="poster-image-container relative ml-auto h-full w-full max-w-[95%] object-cover lg:max-w-[80%]">
        <Image
          src={coverImage}
          fill
          alt={title}
          className="poster-image object-cover"
        />
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-background/0 via-transparent via-[40%] to-background md:from-background" />
      </div>

      <div className="poster_image_container absolute left-0 top-0 z-10 flex h-full w-full flex-row gap-4 from-background/20 to-background p-3">
        <div className="flex flex-col justify-end gap-4 bg-opacity-50 p-0">
          <p className="text-sm font-semibold text-primary">
            #Spotlight {anime.rank}
          </p>
          <h2 className="text-2xl font-bold leading-7">{title}</h2>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 text-xs font-semibold md:flex">
              {anime.otherInfo.map((info) => (
                <div key={info} className="flex items-center gap-2">
                  <p key={info}>{info}</p>
                  <Dot />
                </div>
              ))}
            </div>
            <div className="flex w-fit gap-0.5 overflow-hidden rounded-sm">
              {/* Total sub */}
              {anime.episodes.sub > 0 && (
                <div className="flex w-fit items-center gap-0.5 bg-primary-2 p-2 py-1 text-xs font-bold text-primary-foreground-2">
                  <FaClosedCaptioning />
                  <p className="leading-[10px]">{anime.episodes.sub}</p>
                </div>
              )}

              {/* Total dub */}
              {anime.episodes.dub && anime.episodes.dub > 0 && (
                <div className="flex w-fit items-center gap-0.5 bg-primary-3 p-2 py-1 text-xs font-bold text-primary-foreground-3">
                  <FaMicrophone className="-mt-0.5" />
                  <p className="leading-[10px]">{anime.episodes.dub}</p>
                </div>
              )}
            </div>
          </div>
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
    </Container>
  );
}

export default AnimeSlide;
