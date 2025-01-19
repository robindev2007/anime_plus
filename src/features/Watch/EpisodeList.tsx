import { Button } from "@/components/ui/button";
import { AnimeEpisodes, Episode } from "@/types/anime";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaList, FaPlay } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function EpisodeList({
  episodes,
  changeEpisode,
  currentEp,
}: {
  episodes: AnimeEpisodes["episodes"];
  changeEpisode: (episode: Episode) => void;
  currentEp: AnimeEpisodes["episodes"][0];
}) {
  return (
    <div className="grid h-full grid-cols-1 space-y-3">
      {episodes.length > 50 ? (
        <EpisodeLargeMode
          episodes={episodes}
          activeEpisode={currentEp}
          changeEpisode={changeEpisode}
        />
      ) : (
        <EpisodeSmallMode
          episodes={episodes}
          activeEpisode={currentEp}
          changeEpisode={changeEpisode}
        />
      )}
    </div>
  );
}

export default EpisodeList;

const EpisodeLargeMode = ({
  episodes,
  activeEpisode,
  changeEpisode,
}: {
  episodes: AnimeEpisodes["episodes"];
  activeEpisode: Episode;
  changeEpisode: (episode: Episode) => void;
}) => {
  const data = episodes; // Example array with 1201 items
  const chunkSize = 100; // Number of items per chunk
  const chunks = [];

  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize));
  }

  const formattedData = chunks.map((chunk, index) => ({
    title: `${index * chunkSize}-${(index + 1) * chunkSize - 1}`,
    data: chunk,
  }));

  const defaultRenderEpisodes: {
    title: string;
    data: Episode[];
  } =
    formattedData.find((episodes) => {
      const ep = episodes.data.find((ep) => ep.number == activeEpisode.number);

      if (ep?.number == activeEpisode.number) {
        return true;
      } else {
        return false;
      }
    }) ?? formattedData[0];

  const [renderedEpisodes, setRenderedEpisodes] = useState(
    defaultRenderEpisodes,
  );

  console.log({ defaultRenderEpisodes });

  return (
    <div className="w-full space-y-2 p-3">
      <div className="top-0 flex items-center justify-between gap-0.5 bg-background">
        <div className="flex items-center gap-2">
          <FaList size={14} className="shrink-0 text-muted-foreground" />
          <p className="text-xs">EPI&apos;S</p>
          <Select
            onValueChange={(value) => {
              setRenderedEpisodes(
                formattedData.find((item) => item.title === value) ||
                  formattedData[0],
              );
            }}
          >
            <SelectTrigger
              className="h-8 text-sm"
              value={renderedEpisodes.title}
            >
              <SelectValue placeholder={renderedEpisodes.title} />
            </SelectTrigger>
            <SelectContent>
              {formattedData.map((item) => (
                <SelectItem
                  value={item.title}
                  key={item.title}
                  onClick={() => setRenderedEpisodes(item)}
                  className="text-sm"
                >
                  {item.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Input
            placeholder="Search episode"
            className="h-8 max-w-[12em] text-sm"
          />
        </div>
      </div>
      <div className="grid shrink-0 grid-cols-5 gap-1 md:grid-cols-5">
        {renderedEpisodes.data.map((epi) => (
          <Button
            key={epi.episodeId}
            onClick={() => changeEpisode(epi)}
            variant={
              epi.number == activeEpisode.number ? "default" : "secondary"
            }
            title={`${epi.isFiller ? "Filler Episode: " : ""}${epi.title}`}
            className={cn(
              "h-9 w-full rounded p-0 text-sm font-bold shadow-sm",
              epi.isFiller &&
                "bg-gradient-to-br from-orange-200/50 to-orange-400/40 text-muted",
            )}
          >
            {epi.number}
          </Button>
        ))}
      </div>
    </div>
  );
};

const EpisodeSmallMode = ({
  activeEpisode,
  changeEpisode,
  episodes,
}: {
  episodes: AnimeEpisodes["episodes"];
  activeEpisode: Episode;
  changeEpisode: (episode: Episode) => void;
}) => {
  return (
    <div className="bg-muted/40 py-2">
      <div className="py-2">
        <p className="px-2 text-xs font-bold">List of episodes</p>
      </div>

      <div className="flex max-h-96 flex-col overflow-y-auto pt-1 md:px-0 lg:max-h-none">
        {episodes.map((episode, i) => (
          <button
            onClick={() => changeEpisode(episode)}
            key={episode.episodeId}
            className={cn(
              "relative line-clamp-1 flex items-center justify-between gap-4 p-1.5 py-2.5 text-xs odd:bg-secondary/30",
              episode.number == activeEpisode.number &&
                "!bg-secondary text-primary",
            )}
          >
            {episode.number == activeEpisode.number && (
              <div className="absolute left-0 top-0 h-full w-1.5 bg-primary" />
            )}
            {episode.number == activeEpisode.number && (
              <div className="absolute right-1 top-1/2 aspect-square -translate-y-1/2 scale-75 rounded-full bg-primary p-1">
                <FaPlay className="pl-0.5 text-background" />
              </div>
            )}
            <div className="flex items-center gap-4">
              <p className="line-clamp-1 px-2">
                {i + 1}. {episode.title}
              </p>
            </div>

            {episode.number == activeEpisode.number && (
              <div className="aspect-square rounded-full bg-primary p-1 text-primary-foreground">
                <FaPlay size={10} className="ml-0.5 mt-[1px]" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
