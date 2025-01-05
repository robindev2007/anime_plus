import { getAnimeInfo } from "@/actions/anime/getAnimeInfo";
import AnimeList from "@/components/AnimeList";
import RecommendedAnimeList from "@/components/AnimeList/RecommendedAnimeList";
import Container from "@/components/Container";
import AnimePageData from "@/features/Anime/AnimePageData";
import { SingleAnimeInfoRes } from "@/types/anime";
import React from "react";

async function SingleAnimePage({
  params,
}: {
  params: Promise<{ animeId: string }>;
}) {
  const { animeId } = await params;

  const data = await getAnimeInfo({ animeId });

  return (
    <div>
      <AnimePageData data={data.data as SingleAnimeInfoRes} />

      <div className="bg-background">
        <Container>
          <div className="space-y-1 p-3">
            <p className="text-lg text-primary">
              <strong>Related Anime</strong>
            </p>
            <AnimeList
              animeList={(data.data?.recommendations.slice(0, 20) as []) ?? []}
            />
          </div>
          {/* Recommended anime's */}
          <div className="p-3">
            <RecommendedAnimeList
              animeList={data.data?.recommendations ?? []}
            />
          </div>
        </Container>
      </div>
    </div>
  );
}

export default SingleAnimePage;
