import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Dot from "@/components/ui/dot";
import { SingleAnimeInfoRes } from "@/types/anime";
import Image from "next/image";
import React from "react";
import { FaClosedCaptioning, FaMicrophone, FaPlus } from "react-icons/fa6";
import WatchNowButton from "./WatchNowButton";

function AnimePageData({ data }: { data: SingleAnimeInfoRes }) {
  const title = data.title || data.japaneseTitle;

  return (
    <Container className="space-y-2 p-0">
      <div className="flex h-full w-full flex-col flex-wrap space-y-6 md:flex-row md:flex-nowrap md:space-x-5 md:space-y-0">
        <div className="my-auto flex flex-col items-center gap-2 p-5 md:flex-row md:items-start md:gap-5 md:p-10">
          <div
            className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 opacity-35 grayscale"
            style={{
              backgroundImage: `url(${data.image})`,
              filter: "blur(40px)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          />
          <div className="z-10">
            <Image
              src={data.image}
              height={2000}
              width={2000}
              alt={data.title}
              className="aspect-[200/300] max-w-40 overflow-hidden object-cover md:max-w-[14rem]"
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-3 md:items-start md:space-y-5">
            <p className="text-center text-xl font-semibold md:max-w-[70%] md:text-start md:text-3xl">
              {title}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm font-semibold">
              <div className="flex gap-0.5 overflow-hidden rounded-sm">
                {/* Total sub */}
                <div className="flex w-fit items-center gap-0.5 bg-primary-2 p-2 py-1 text-xs font-bold text-primary-foreground-2">
                  <FaClosedCaptioning />
                  <p className="leading-[10px]"> {data.hasSub && "sub"}</p>
                </div>

                {/* Total dub */}
                <div className="flex w-fit items-center gap-0.5 bg-primary-3 p-2 py-1 text-xs font-bold text-primary-foreground-3">
                  <FaMicrophone className="-mt-0.5" />
                  <p className="leading-[10px]">{data.hasDub && "dub"}</p>
                </div>

                {/* Total ep */}
                {data.totalEpisodes > 0 && (
                  <div className="flex w-fit items-center gap-0.5 bg-foreground/20 p-2 py-1 text-xs font-bold backdrop-blur">
                    <p className="leading-[10px]">{data.totalEpisodes}</p>
                  </div>
                )}
              </div>
              <Dot />
              <div>{data.type}</div>
              <Dot />
            </div>

            <div className="flex flex-wrap gap-2">
              <WatchNowButton animeId={data.id as unknown as number} />
              <Button
                variant={"ghost"}
                className="rounded-full bg-white text-lg text-black hover:bg-white/80 hover:text-black"
              >
                <FaPlus />
                Add to List
              </Button>
            </div>
            <div className="hidden md:inline">
              <p
                tabIndex={1}
                className="prose-zinc line-clamp-6 focus:line-clamp-none"
                dangerouslySetInnerHTML={{
                  __html: data.description,
                }}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex-col justify-center space-y-1 bg-background/60 p-3 text-sm md:flex md:max-w-[30%] md:p-6">
          <div>
            <strong>Overview:</strong>
            <p className="text-muted-foreground">{title}</p>
          </div>
          <div>
            <strong>Japanese:</strong>
            <p className="text-muted-foreground">{data.japaneseTitle || "_"}</p>
          </div>

          <div className="flex gap-1">
            <strong>Episodes:</strong>
            <p className="text-muted-foreground">{data.totalEpisodes}</p>
          </div>

          <div className="md:hidden">
            <strong>Description:</strong>
            <p
              className="prose-zinc text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: data.description,
              }}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default AnimePageData;
