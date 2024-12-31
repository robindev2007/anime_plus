"use client";
import { Button } from "@/components/ui/button";
import { useAnimeStore } from "@/zustand/AnimeState";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaPlay } from "react-icons/fa6";

function WatchNowButton({ animeId }: { animeId: number }) {
  const history = useAnimeStore((state) => state.getHistoryByAnimeId(animeId));

  const addNewHistory = useAnimeStore((state) => state.addWatchHistory);

  useEffect(() => {
    if (!history) {
      addNewHistory({
        animeId,
        lastWatchEpisode: 1,
        preferredLanguage: "bub",
      });
    }
  }, [animeId, history]);

  return (
    <Link href={`/watch/${animeId}?ep=${history?.lastWatchEpisode ?? 1}`}>
      <Button className="rounded-full text-lg">
        <FaPlay />
        Watch Now
      </Button>
    </Link>
  );
}

export default WatchNowButton;
