import { getAnimeSearchResult } from "@/actions/anime/getSearchResult";
import AnimeList from "@/components/AnimeList";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) {
  const { keyword } = await searchParams;

  const { data: animeList } = await getAnimeSearchResult({
    search: keyword,
    page: 1,
  });

  return (
    <div>
      <Container className="relative space-y-3">
        <form action={`/search`} className="sticky top-0 flex gap-2">
          <Input
            name="keyword"
            placeholder="Search..."
            defaultValue={keyword}
          />
          <Button size={"icon"}>
            <FaMagnifyingGlass />
          </Button>
        </form>

        <AnimeList animeList={animeList?.results ?? []} />
      </Container>
    </div>
  );
}

export default SearchPage;
