"use client";
import React, { RefObject, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Input } from "../ui/input";
import AnimeResults from "./AnimeResults";
import { useDebounce } from "use-debounce";
import { getAnimeSearchResult } from "@/actions/anime/getSearchResult";
import { AnimeSearchRes } from "@/types/anime";
import useClickOutside from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import Loader from "../loader/loader";

function SearchAnime() {
  const [query, setQuery] = useState("");
  const [queryDebounce] = useDebounce(query, 1000);
  const [animeResults, setAnimeResults] = useState<AnimeSearchRes["results"]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const searchRef = useClickOutside(() => {
    setShowMobileSearch(false);
    setSearchActive(false);
  });

  const getAnimeSearch = async () => {
    if (loading) return;
    if (queryDebounce === "") return;

    setLoading(true);
    const res = await getAnimeSearchResult({
      page: 1,
      search: query,
    });

    setAnimeResults(res.data?.results ?? []);
    setLoading(false);
  };

  useEffect(() => {
    getAnimeSearch();
  }, [queryDebounce]);

  return (
    <div ref={searchRef as RefObject<HTMLDivElement | null>} className="z-10">
      <Button
        title="Search anime"
        onClick={() => {
          setShowMobileSearch((prev) => !prev);
        }}
        size={"icon"}
        className="z-50 size-8 text-primary hover:text-primary md:hidden"
        variant={"ghost"}
      >
        <FaMagnifyingGlass />
      </Button>

      <div className="">
        <div
          className={cn(
            "relative left-0 top-full z-20 w-full border-t bg-background p-3 py-2 md:min-w-[20rem] md:p-0 md:py-0",
            showMobileSearch ? "absolute md:relative" : "hidden md:block",
          )}
        >
          <Input
            onFocus={() => setSearchActive(true)}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Anime..."
            className="rounded-none border-none bg-foreground font-semibold text-background focus-visible:ring-transparent"
          />

          <div
            className={cn(
              "left-0 top-full max-h-[80vh] w-full overflow-y-auto bg-card md:absolute",
              searchActive ? "absolute" : "md:hidden",
            )}
          >
            {!loading ? (
              animeResults.length > 0 && (
                <AnimeResults
                  setSearchActive={setSearchActive}
                  animeList={animeResults}
                />
              )
            ) : (
              <div className="h-40">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchAnime;
