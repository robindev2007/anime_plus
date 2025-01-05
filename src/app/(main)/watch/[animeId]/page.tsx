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

  const { data: animeData } = await getAnimeInfo({
    animeId,
  });

  if (!animeData) return notFound();

  const currentEpisode = animeData.episodes[+ep - 1];

  console.log(currentEpisode);

  const { data: streams } = await getAnimeStream(currentEpisode.id);

  return (
    <div className="relative overflow-hidden lg:p-5">
      <div
        className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 opacity-35 grayscale-[40%] lg:flex"
        style={{
          backgroundImage: `url(${animeData?.image})`,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <Container className="p-0">
        <AnimeWatchPageData
          animeInfo={animeData}
          episodes={animeData.episodes || []}
          initialStreams={streams || undefined}
          initialEpisode={currentEpisode}
        />
      </Container>
    </div>
  );
}

export default WatchPage;

// {streams?.streams.map((stream) =>
//   stream.data.map((source) =>
//     source.sources.map((s) => (
//       <div>
//         <Player videoUrl={s.url} key={s.url} />
//       </div>
//     )),
//   ),
// )}
