import { Button } from "@/components/ui/button";
import { AnimeEpisodeRes } from "@/types/anime";
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
  episodes: AnimeEpisodeRes["episodes"];
  changeEpisode: (episode: number) => void;
  currentEp: number;
}) {
  return (
    <div className="grid h-full grid-cols-1 space-y-3 bg-background">
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
  episodes: AnimeEpisodeRes["episodes"];
  activeEpisode: number;
  changeEpisode: (episode: number) => void;
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

  const [renderedEpisodes, setRenderedEpisodes] = useState(formattedData[0]);

  return (
    <div className="w-full space-y-2 p-3">
      <div className="flex items-center justify-between gap-2">
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
            key={epi.episode}
            onClick={() => changeEpisode(epi.episode)}
            size={"sm"}
            variant={activeEpisode == epi.episode ? "default" : "secondary"}
          >
            {epi.episode}
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
  episodes: AnimeEpisodeRes["episodes"];
  activeEpisode: number;
  changeEpisode: (episode: number) => void;
}) => {
  return (
    <div className="py-2">
      <p className="px-2 text-xs">List of episodes</p>

      <div className="flex flex-col px-2 pt-1 md:px-0">
        {episodes.map((episode) => (
          <button
            onClick={() => changeEpisode(episode.episode)}
            key={episode.id}
            className={cn(
              "line-clamp-1 flex items-center justify-between gap-4 p-3 py-2 text-xs odd:bg-secondary/30",
              activeEpisode == episode.episode && "!bg-secondary text-primary",
            )}
          >
            <div className="flex items-center gap-4">
              <span>{episode.episode}</span>
              <p className="line-clamp-1">{episode.title}</p>
            </div>

            {activeEpisode == episode.episode && (
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
