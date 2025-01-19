import { getAnimeInfo } from "@/actions/anime/getAnime";
import AnimeList from "@/components/AnimeList";
import Container from "@/components/Container";
import AnimePageData from "@/features/Anime/AnimePageData";
import { Anime } from "@/types/anime";
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

async function SingleAnimePage({
  params,
}: {
  params: Promise<{ animeId: string }>;
}) {
  const { animeId } = await params;

  const { data } = await getAnimeInfo(animeId);

  return (
    <div>
      <AnimePageData data={data?.data.anime as Anime} />

      <div className="bg-background">
        <Container className="space-y-6">
          <AnimeList
            animeList={data?.data.relatedAnimes ?? []}
            sectionTitle="Related Animes"
          />
          <AnimeList
            animeList={data?.data.recommendedAnimes ?? []}
            sectionTitle="Recommended Animes"
          />
        </Container>
      </div>
    </div>
  );
}

export default SingleAnimePage;
