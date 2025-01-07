import { getTrendingAnime } from "@/actions/anime/getTrendingAnime";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";

async function HeroAnimeSearch() {
  const { data: tradingAnimeList } = await getTrendingAnime({
    page: 1,
  });

  console.log(tradingAnimeList);

  return (
    <div className="flex gap-3">
      <div className="space-y-3 py-20">
        <Image
          src={"/images/logo_white.png"}
          height={500}
          width={500}
          alt="anime+ website logo"
          className="w-40"
        />
        <form action={"/search"} className="flex gap-2">
          <Input
            name="keyword"
            className="h-12 rounded-full bg-foreground px-4 font-semibold text-background focus-visible:ring-2 focus-visible:ring-primary-2"
            placeholder="Search anime..."
          />
          <Button size={"icon"} className="size-12 shrink-0 rounded-full">
            <FaSearch />
          </Button>
        </form>
        <div>
          <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-sm">
            <strong>Top Search:</strong>
            {tradingAnimeList?.results.splice(0, 15).map((anime) => (
              <Link
                href={`/search?keyword=${anime.title}`}
                key={anime.id}
                className="line-clamp-1 truncate text-nowrap text-muted-foreground hover:text-primary"
              >
                {anime.title?.slice(0, 40)},
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Image
        src={"/images/anw-min.webp"}
        height={1000}
        width={1000}
        alt="anime"
        className="hidden w-[40%] shrink-0 overflow-hidden object-contain md:flex"
      />
    </div>
  );
}

export default HeroAnimeSearch;
