import { getHomePageData } from "@/actions/anime/getAnime";
import AnimeList from "@/components/AnimeList";
import Container from "@/components/Container";
import AnimeRankingGrid from "@/features/Home/AnimeRankingGrid";
import HeroCarousel from "@/features/Home/HeroCarousel";
import TrendingAnimeList from "@/features/Home/TrendingAnimeList";

export default async function Home() {
  const { data } = await getHomePageData();

  console.log(data);
  return (
    <div className="space-y-3">
      <HeroCarousel animeList={data?.data.spotlightAnimes ?? []} />
      {/* Trending anime carousel */}
      <Container className="space-y-5">
        <TrendingAnimeList trendingAnimes={data?.data.trendingAnimes ?? []} />

        <AnimeRankingGrid animeData={data?.data} />

        <AnimeList
          animeList={data?.data.latestEpisodeAnimes ?? []}
          sectionTitle="Latest Episodes"
        />
        <AnimeList
          animeList={data?.data.latestCompletedAnimes ?? []}
          sectionTitle="Latest Completed"
        />
      </Container>
    </div>
  );
}
