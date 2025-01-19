import {
  getAnimeEpisodes,
  getAnimeInfo,
  getAnimeStream,
} from "@/actions/anime/getAnime";
import Container from "@/components/Container";
import AnimeWatchPageData from "@/features/Watch/AnimeWatchPageData";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

// or Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ animeId: string }>;
}) {
  const { animeId } = await params;

  const { data } = await getAnimeInfo(animeId);

  const animeTitle = data?.data.anime.info.name;

  return {
    title: `Watch ${animeTitle} English Sub or Dub online Free`,
    description: `Best site to watch ${animeTitle} English Sub/Dub online Free and download ${animeTitle} English Sub/Dub anime.`,
  };
}

async function WatchPage({
  params,
  searchParams,
}: {
  params: Promise<{ animeId: string }>;
  searchParams: Promise<{ ep: string }>;
}) {
  const { animeId } = await params;
  const ep = (await searchParams).ep ?? 1;

  const { data: animeData } = await getAnimeInfo(animeId);
  const { data: animeEpisodes } = await getAnimeEpisodes(animeId);

  if (!animeData || !animeEpisodes) return notFound();

  console.log(animeEpisodes);

  const currentEpisode =
    animeEpisodes.data.episodes.find((epa) => epa.number == +ep) ??
    animeEpisodes.data.episodes[0];

  console.log(currentEpisode);

  // console.log(currentEpisode);

  const { data: streams } = await getAnimeStream(currentEpisode.episodeId);

  console.log({ streams });

  return (
    <div className="relative overflow-hidden lg:p-5">
      <Image
        src={animeData?.data.anime.info.poster}
        height={200}
        width={200}
        alt={animeData?.data.anime.info.name}
        className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 opacity-35 blur-2xl grayscale-[40%] lg:flex"
      />

      <Container className="p-0">
        <AnimeWatchPageData
          animeInfo={animeData.data}
          episodes={animeEpisodes?.data.episodes ?? []}
          initialStreams={streams}
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
