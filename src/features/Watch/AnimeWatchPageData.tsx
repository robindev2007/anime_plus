"use client";
import AnimePlayer from "@/components/AnimePlayer";
import Container from "@/components/Container";
import { AnimeEpisodeRes, AnimeInfoResT, AnimeStreamRes } from "@/types/anime";
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
  initialSubStream,
  initialDubStream,
}: {
  animeInfo: AnimeInfoResT;
  episodes: AnimeEpisodeRes["episodes"];
  initialSubStream?: AnimeStreamRes;
  initialDubStream?: AnimeStreamRes;
}) {
  const defaultStreamsUrl =
    initialDubStream?.stream?.multi?.main.url ||
    initialSubStream?.stream?.multi?.main.url ||
    "";
  const initialEpisode =
    initialSubStream?.info?.episode || initialDubStream?.info?.episode || 1;

  console.log(defaultStreamsUrl);

  const [videoUrl, setVideoUrl] = useState(defaultStreamsUrl);
  const [currentEpisode, setCurrentEpisode] = useState(initialEpisode);
  const [subStream, setSubStreams] = useState(initialSubStream);
  const [dubStream, setDubStreams] = useState(initialDubStream);
  const [loading, setLoading] = useState(false);

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

  const changeEpisode = (episode: number) => {
    setCurrentEpisode(episode);
    updateHistory(animeInfo.id, {
      lastWatchEpisode: episode,
    });

    history.pushState(null, "", `?ep=${episode}`);
  };

  useEffect(() => {
    const getNewStream = async () => {
      setLoading(true);

      setDubStreams(undefined);

      const newSubStreams = await getAnimeStream({
        gogoId: animeInfo.id_provider.idGogo,
        epId: currentEpisode.toString(),
      });

      setSubStreams(newSubStreams.data ?? undefined);

      const newDubStreams = await getAnimeStream({
        gogoId: animeInfo.id_provider.idGogoDub,
        epId: currentEpisode.toString(),
      });

      setDubStreams(newDubStreams.data ?? undefined);

      const newStreamsUrl =
        newDubStreams?.data?.stream?.multi?.main.url ||
        newSubStreams?.data?.stream?.multi?.main.url ||
        "";

      setVideoUrl(newStreamsUrl);
      setLoading(false);
    };

    getNewStream();

    return () => {};
  }, [currentEpisode]);

  return (
    <Container className="relative h-fit flex-row-reverse overflow-hidden p-0 lg:flex">
      <div className="z-20 mr-auto lg:w-[80%]">
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
                subStreams={subStream}
                dubStreams={dubStream}
                setVideoUrl={setVideoUrl}
                videoUrl={videoUrl}
              />
            </div>
          </div>
        </div>

        <div
          className={cn(
            "left-0 top-0 h-full overflow-y-auto bg-muted lg:absolute",
            episodes.length > 50 ? "lg:w-[300px]" : "lg:w-[250px]",
          )}
        >
          <EpisodeList
            episodes={episodes}
            changeEpisode={changeEpisode}
            currentEp={+currentEpisode}
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
