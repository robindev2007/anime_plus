import { getAnimeSearch } from "@/actions/anime/getAnime";
import AnimeList from "@/components/AnimeList";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export const revalidate = 43200;

async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;

  const { data: animeList } = await getAnimeSearch({
    query: query,
  });

  return (
    <div>
      <Container className="relative space-y-3">
        <form action={`/search`} className="sticky top-0 flex gap-2">
          <Input name="keyword" placeholder="Search..." defaultValue={query} />
          <Button size={"icon"}>
            <FaMagnifyingGlass />
          </Button>
        </form>

        <AnimeList animeList={animeList?.data.animes ?? []} />
      </Container>
    </div>
  );
}

export default SearchPage;
