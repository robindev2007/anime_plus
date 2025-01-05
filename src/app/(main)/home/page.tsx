import Container from "@/components/Container";
import TrendingAnimeList from "@/features/Home/TrendingAnimeList";

export default async function Home() {
  return (
    <div className="space-y-3 px-2">
      {/* <HeroCarousel animeList={tradingAnime?.results ?? []} /> */}
      <Container className="p-0">
        <TrendingAnimeList />
      </Container>
    </div>
  );
}
