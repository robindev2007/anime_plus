import { getAnimeEpisodes } from "@/actions/anime/getAnimeEpisodes";
import { getAnimeInfo } from "@/actions/anime/getAnimeInfo";
import { getAnimeStream } from "@/actions/anime/getAnimeStream";
import Container from "@/components/Container";
import AnimeWatchPageData from "@/features/Watch/AnimeWatchPageData";
import { notFound } from "next/navigation";
import React from "react";

async function WatchPage({
  params,
  searchParams,
}: {
  params: Promise<{ animeId: string }>;
  searchParams: Promise<{ ep: string }>;
}) {
  const { animeId } = await params;
  const ep = (await searchParams).ep ?? 1;

  const info = await getAnimeInfo({
    animeId,
  });

  if (!info.data) return notFound();

  const episodes = await getAnimeEpisodes({
    animeId: info.data.id_provider.idGogo,
  });

  const subStream = await getAnimeStream({
    gogoId: info.data.id_provider.idGogo,
    epId: ep,
  });

  const dubStream = await getAnimeStream({
    gogoId: info.data.id_provider.idGogoDub,
    epId: ep,
  });

  console.log(subStream, dubStream);

  if (!dubStream && !subStream) return null;

  return (
    <div className="relative overflow-hidden lg:p-5">
      <div
        className="absolute left-1/2 top-0 -z-10 hidden h-full w-full -translate-x-1/2 opacity-35 grayscale-[40%] lg:flex"
        style={{
          backgroundImage: `url(${info.data.coverImage.large})`,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          // opacity: 0.5,
        }}
      />
      <Container className="p-0">
        <AnimeWatchPageData
          animeInfo={info.data}
          episodes={episodes.data ? episodes.data.episodes?.toReversed() : []}
          initialSubStream={subStream.data ?? undefined}
          initialDubStream={dubStream.data ?? undefined}
        />
      </Container>
    </div>
  );
}

export default WatchPage;
