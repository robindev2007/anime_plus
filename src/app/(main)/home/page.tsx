import { getTradingAnime } from "@/actions/anime/getTradingAnime";
import Container from "@/components/Container";
import HeroCarousel from "@/features/Home/HeroCarousel";
import TrendingAnimeList from "@/features/Home/TrendingAnimeList";

export default async function Home() {
  const { data: tradingAnime } = await getTradingAnime();

  return (
    <div className="space-y-3 px-2 py-2">
      <HeroCarousel animeList={tradingAnime?.results ?? []} />
      <Container className="p-0">
        <TrendingAnimeList />
      </Container>
    </div>
  );
}
