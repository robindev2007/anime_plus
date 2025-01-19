import { Button } from "@/components/ui/button";
import { Anime } from "@/types/anime";
import Image from "next/image";
import React from "react";
import { FaClosedCaptioning, FaMicrophone, FaPlus } from "react-icons/fa6";
import WatchNowButton from "./WatchNowButton";
import Container from "@/components/Container";
import Dot from "@/components/ui/dot";
import { WEBSITE_DATA } from "@/lib/constance";

function AnimePageData({ data }: { data: Anime }) {
  return (
    <Container className="flex flex-col items-center gap-3 p-0 md:flex-row">
      <div className="flex flex-col items-center gap-3 py-6 pl-4 md:flex-row md:items-start">
        <Image
          src={data.info.poster}
          height={200}
          width={200}
          alt={`Watch ${data.info.name}`}
          className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 opacity-70 blur-xl grayscale"
        />

        <div className="z-10">
          <Image
            src={data.info.poster}
            height={2000}
            width={2000}
            alt={data.info.name}
            className="aspect-[200/300] max-w-32 overflow-hidden object-cover md:max-w-[10rem]"
          />
        </div>

        <div className="flex flex-col items-center space-y-3 md:items-start">
          <p className="text-center text-2xl font-bold md:text-start">
            {data.info.name}
          </p>

          <AnimeInfoTabs data={data} />

          <WatchAndDescription data={data} />
        </div>
      </div>
      <SideInfo data={data} />
    </Container>
  );
}

export default AnimePageData;

const WatchAndDescription = ({ data }: { data: Anime }) => {
  return (
    <div className="mt-3 flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <WatchNowButton animeId={data.info.id as unknown as number} />
        <Button
          variant={"ghost"}
          className="h-auto flex-wrap rounded-full bg-white text-lg text-black hover:bg-white/80 hover:text-black"
        >
          <FaPlus />
          Add to List
        </Button>
      </div>
      <div className="mt-4 hidden md:inline">
        <p
          className="prose-zinc max-h-44 overflow-y-auto text-sm text-foreground/80"
          dangerouslySetInnerHTML={{
            __html: data.info.description,
          }}
        />
      </div>
    </div>
  );
};

const AnimeInfoTabs = ({ data }: { data: Anime }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex w-fit items-center gap-0.5 overflow-hidden rounded-sm">
        {/* Total sub */}
        {data.info.stats.episodes.sub > 0 && (
          <div className="flex w-fit items-center gap-0.5 bg-primary-2 p-2 py-1 text-xs font-bold text-primary-foreground-2">
            <FaClosedCaptioning />
            <p className="leading-[10px]">{data.info.stats.episodes.sub}</p>
          </div>
        )}

        {/* Total dub */}
        {data.info.stats.episodes.dub && data.info.stats.episodes.dub > 0 && (
          <div className="flex w-fit items-center gap-0.5 bg-primary-3 p-2 py-1 text-xs font-bold text-primary-foreground-3">
            <FaMicrophone className="-mt-0.5" />
            <p className="leading-[10px]">{data.info.stats.episodes.dub}</p>
          </div>
        )}
        <div className="flex w-fit items-center gap-0.5 bg-indigo-300 p-2 py-1 text-xs font-bold text-primary-foreground-3">
          <p className="leading-[10px]">{data.info.stats.quality}</p>
        </div>
        <div className="flex w-fit items-center gap-0.5 bg-emerald-200 p-2 py-1 text-xs font-bold text-primary-foreground-3">
          <p className="leading-[10px]">{data.info.stats.type}</p>
          <p className="text-nowrap leading-[10px]">{data.info.stats.rating}</p>
        </div>
      </div>
      <Dot />
      <p className="text-sm">{data.moreInfo.duration}</p>
      <Dot />
      <p className="text-sm">{data.info.stats.type}</p>
    </div>
  );
};

const SideInfo = ({ data }: { data: Anime }) => {
  return (
    <div className="flex h-full shrink-0 flex-grow flex-col gap-3 overflow-y-auto bg-background/60 p-3 text-xs md:w-[25%] md:gap-1">
      <div className="flex flex-col gap-0 md:hidden">
        <strong>Overview:</strong>
        <p
          className="prose-zinc max-h-28 overflow-y-auto text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: data.info.description,
          }}
        />
      </div>
      <div className="flex gap-2">
        <strong>Japanese:</strong>
        <p className="text-muted-foreground">{data.moreInfo.japanese}</p>
      </div>
      <div className="flex gap-2">
        <strong>Aired:</strong>
        <p className="text-muted-foreground">{data.moreInfo.aired}</p>
      </div>
      <div className="flex gap-2">
        <strong>Premiered:</strong>
        <p className="text-muted-foreground">{data.moreInfo.premiered}</p>
      </div>
      <div className="flex gap-2">
        <strong>Duration:</strong>
        <p className="text-muted-foreground">{data.moreInfo.duration}</p>
      </div>
      <div className="flex gap-2">
        <strong>Status:</strong>
        <p className="text-muted-foreground">{data.moreInfo.status}</p>
      </div>
      <div className="flex gap-2">
        <strong>MAL Score:</strong>
        <p className="text-muted-foreground">{data.moreInfo.malscore}</p>
      </div>
      <div className="flex gap-2">
        <strong>Genres:</strong>
        <div className="flex flex-wrap gap-1.5 text-sm text-muted-foreground">
          {data.moreInfo.genres.map((genre) => (
            <p
              className="rounded-full border border-foreground/40 px-2"
              key={genre}
            >
              {genre}
            </p>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <strong>Studios:</strong>
        <p className="text-muted-foreground">{data.moreInfo.studios}</p>
      </div>
      <div className="flex items-start gap-2">
        <strong>Producers:</strong>
        <div className="flex flex-wrap gap-2 gap-y-0 text-sm text-muted-foreground">
          {data.moreInfo.producers?.map((producer) => (
            <p className="" key={producer}>
              {producer},
            </p>
          ))}
        </div>
      </div>

      <p className="mt-6 font-light text-foreground/80">
        <strong className="text-foreground">{WEBSITE_DATA.TITLE}</strong> is the
        best site to watch{" "}
        <strong className="text-foreground">{data.info.name}</strong> SUB
        online, or you can even watch Bleach DUB in HD quality. You can also
        find{" "}
        <strong className="text-foreground">{data.moreInfo.studios}</strong>{" "}
        anime on{" "}
        <strong className="text-foreground">{WEBSITE_DATA.TITLE}</strong>{" "}
        website.
      </p>
    </div>
  );
};
