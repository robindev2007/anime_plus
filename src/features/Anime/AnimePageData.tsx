import Container from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Dot from "@/components/ui/dot";
import { AnimeInfoResT } from "@/types/anime";
import Image from "next/image";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import WatchNowButton from "./WatchNowButton";

function AnimePageData({ data }: { data: AnimeInfoResT }) {
  const title =
    data.title.english ||
    data.title.romaji ||
    data.title.userPreferred ||
    data.title.userPreferred;

  return (
    <Container className="space-y-2 p-0">
      <div className="flex h-full w-full flex-col flex-wrap space-y-6 md:flex-row md:flex-nowrap md:space-x-5 md:space-y-0">
        <div className="my-auto flex flex-col items-center gap-2 p-5 md:flex-row md:items-start md:gap-5 md:p-10">
          <div
            className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 opacity-35 grayscale"
            style={{
              backgroundImage: `url(${data.coverImage.large})`,
              filter: "blur(40px)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          />
          <div className="z-10">
            <Image
              src={
                data.coverImage.extraLarge ||
                data.coverImage.large ||
                data.coverImage.medium
              }
              height={2000}
              width={2000}
              alt={title}
              className="aspect-[200/300] max-w-40 overflow-hidden object-cover md:max-w-[14rem]"
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-3 md:items-start md:space-y-5">
            <p className="text-center text-xl font-semibold md:max-w-[70%] md:text-start md:text-3xl">
              {title} ({data.title.native})
            </p>
            <div className="flex items-center justify-center gap-2 text-sm font-semibold">
              <div className="flex gap-0.5 overflow-hidden rounded-sm">
                <div className="w-fit bg-foreground px-2 text-background">
                  {"HD"}
                </div>
                <div className="w-fit bg-primary-2 px-2 text-primary-foreground-2">
                  {data.dub ? "Dub" : "Sub"}
                </div>
              </div>
              <Dot />
              <div>{data.format}</div>
              <Dot />
              <p>{data.duration}m</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <WatchNowButton animeId={data.id} />
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
            <p className="text-muted-foreground">{data.title.native || "_"}</p>
          </div>
          <div className="flex gap-1">
            <strong>Status:</strong>
            <p className="text-muted-foreground">{data.status || "??"}</p>
          </div>
          <div className="flex gap-1">
            <strong>Episodes:</strong>
            <p className="text-muted-foreground">{data.episodes || "??"}</p>
          </div>
          <div className="flex gap-1">
            <strong>Average Score:</strong>
            <p className="text-muted-foreground">
              {data.score.averageScore / 100 || "??"}
            </p>
          </div>
          <div className="flex gap-1">
            <strong>Start In:</strong>
            <p className="text-muted-foreground">
              {data.startIn.year}/{data.startIn.month}/{data.startIn.day}
            </p>
          </div>
          <div className="flex gap-1">
            <strong>End In:</strong>
            <p className="text-muted-foreground">
              {data.endIn.year}/{data.endIn.month}/{data.endIn.day}
            </p>
          </div>
          <div className="flex gap-1">
            <strong>Year:</strong>
            <p className="text-muted-foreground">{data.year}</p>
          </div>
          <div className="flex gap-1">
            <strong>Popularity:</strong>
            <p className="text-muted-foreground">{data.popularity}</p>
          </div>
          <div className="flex gap-1">
            <strong>Tags:</strong>
            <div className="flex flex-wrap gap-1">
              {data.tags.length > 0 ? (
                data.tags.slice(0, 5).map((tag) => (
                  <Badge variant={"outline"} key={tag.id}>
                    {tag.name}
                  </Badge>
                ))
              ) : (
                <p>Unknown</p>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <strong>Season:</strong>
            <p className="text-muted-foreground">{data.season}</p>
          </div>
          <div className="flex gap-1">
            <strong>Genres:</strong>
            <div className="flex flex-wrap gap-1">
              {data.genres.map((genre) => (
                <Badge variant={"outline"} key={genre}>
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-1 pt-2">
            <strong>Studios:</strong>
            <div className="flex flex-wrap gap-1 text-muted-foreground">
              {data.studios.length > 0 ? (
                data.studios.slice(0, 4).map((studio) => (
                  <Badge variant={"outline"} key={studio.name}>
                    {studio.name}
                  </Badge>
                ))
              ) : (
                <p>Unknown</p>
              )}
            </div>
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
