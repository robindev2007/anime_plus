"use client";
import React, { Ref, useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useDebounce } from "use-debounce";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { getAnimeSearchSuggestions } from "@/actions/anime/getAnime";
import { SearchSuggestion } from "@/types/anime";
import AnimeSearchResults from "./AnimeSearchResults";
import { Spinner } from "../ui/spinner";
import useClickOutside from "@/hooks/useClickOutside";

function SearchAnime() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryDebounce] = useDebounce(searchQuery, 300);
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const searchContainerRef = useClickOutside(() => {
    console.log("Outside");
    setSearchActive(false);
  });

  const handleSearch = async () => {
    setLoading(true);
    setSearchResults([]);

    const { data } = await getAnimeSearchSuggestions(searchQuery);

    setSearchResults(data?.data.suggestions ?? []);

    setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQueryDebounce]);

  return (
    <div>
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => setSearchActive((prev) => !prev)}
      >
        <FaMagnifyingGlass />
      </Button>

      {/* Search input */}

      {searchActive && (
        <form
          ref={searchContainerRef as Ref<HTMLFormElement>}
          action={"/search"}
          className="absolute left-0 top-full w-full space-y-2 bg-background"
        >
          <div className="p-2">
            <Input
              required
              name="query"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search animes..."
              className="text-balance border-none bg-foreground text-muted focus-visible:ring-transparent"
            />
          </div>
          {loading ? (
            <div className="flex items-center justify-center pb-3">
              <Spinner />
            </div>
          ) : (
            <AnimeSearchResults
              setSearchActive={(value) => setSearchActive(value)}
              animes={searchResults}
            />
          )}
        </form>
      )}
    </div>
  );
}

export default SearchAnime;
