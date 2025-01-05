"use client";
import AnimePlayer from "@/components/AnimePlayer";
import Container from "@/components/Container";
import { AnimeStreamRes, Episode, SingleAnimeInfoRes } from "@/types/anime";
import React, { useEffect, useState } from "react";
import EpisodeList from "./EpisodeList";
import { getAnimeStream } from "@/actions/anime/getAnimeStream";
import CurrentVideoDetails from "./CurrentVideoDetails";
import AnimeDetails from "./AnimeDetails";
import { VideoServers } from "./VideoServers";
import { cn } from "@/lib/utils";
import { useAnimeStore } from "@/zustand/AnimeState";

function AnimeWatchPageData({
  animeInfo,
  episodes,
  initialStreams,
  initialEpisode,
}: {
  animeInfo: SingleAnimeInfoRes;
  episodes: SingleAnimeInfoRes["episodes"];
  initialStreams?: AnimeStreamRes;
  initialEpisode: Episode;
}) {
  const defaultStreamsUrl =
    initialStreams?.streams[1]?.data[0]?.sources[0].url ??
    initialStreams?.streams[0]?.data[0]?.sources[0].url ??
    "";

  const [videoUrl, setVideoUrl] = useState(defaultStreamsUrl);
  const [currentEpisode, setCurrentEpisode] = useState(initialEpisode);
  const [loading, setLoading] = useState(false);
  const [streams, setStreams] = useState(initialStreams);

  const updateHistory = useAnimeStore((state) => state.updateWatchHistoryById);

  const handleNextClick = () => {
    console.log("nextClick");
  };
  const handlePrevClick = () => {
    console.log("prevClick");
  };
  const handleAddToWatchList = () => {
    console.log("prevClick");
  };

  const changeEpisode = async (episode: Episode) => {
    setCurrentEpisode(episode);
    updateHistory(animeInfo.id, {
      lastWatchEpisode: episode.number,
    });

    setLoading(true);

    const { data: newStreams } = await getAnimeStream(currentEpisode.id);

    setStreams(newStreams ?? undefined);

    const newStreamsUrl =
      newStreams?.streams[1]?.data[0]?.sources[0].url ??
      newStreams?.streams[0]?.data[0]?.sources[0].url ??
      "";

    setVideoUrl(newStreamsUrl);

    setLoading(false);

    history.pushState(null, "", `?ep=${episode.number}`);
  };

  useEffect(() => {
    return () => {};
  }, [currentEpisode]);

  return (
    <Container className="relative h-fit flex-row-reverse overflow-hidden p-0 lg:flex">
      <div className="z-20 mr-auto bg-background lg:w-[80%]">
        <div
          className={cn(
            "h-fit w-full pb-3 lg:space-y-3 lg:bg-muted",
            episodes.length > 50 ? "lg:pl-[300px]" : "lg:pl-[250px]",
          )}
        >
          <AnimePlayer
            handleNextClick={handleNextClick}
            handlePrevClick={handlePrevClick}
            handleAddToWatchList={handleAddToWatchList}
            videoUrl={videoUrl}
            loading={loading}
          />
          <div className="overflow-hidden rounded-md p-3 lg:mx-3 lg:flex lg:rounded-md lg:bg-card lg:p-0">
            <CurrentVideoDetails currentEpisode={currentEpisode} />
            <div className="h-full w-full py-3">
              <VideoServers
                streams={streams}
                setVideoUrl={setVideoUrl}
                videoUrl={videoUrl}
              />
            </div>
          </div>
        </div>

        <div
          className={cn(
            "left-0 top-0 h-full lg:absolute lg:bg-muted-foreground/10",
            episodes.length > 50 ? "lg:w-[300px]" : "lg:w-[250px]",
          )}
        >
          <EpisodeList
            episodes={episodes}
            changeEpisode={changeEpisode}
            currentEp={currentEpisode}
          />
        </div>
      </div>

      <div className="right-0 h-full lg:absolute lg:w-[calc(20%)]">
        <AnimeDetails animeInfo={animeInfo} />
      </div>
    </Container>
  );
}

export default AnimeWatchPageData;
