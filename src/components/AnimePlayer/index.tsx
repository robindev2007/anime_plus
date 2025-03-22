"use client";

import { MediaPlayer, MediaProvider, SeekButton } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import { SeekForward10Icon } from "@vidstack/react/icons";
import { cn } from "@/lib/utils";

import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
} from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";

const Player = ({
  videoUrl,
  handleNextClick,
  handlePrevClick,
  handleAddToWatchList,
  loading,
}: {
  videoUrl: string;
  handleNextClick: () => void;
  handlePrevClick: () => void;
  handleAddToWatchList: () => void;
  loading: boolean;
}) => {
  const [settings, setSettings] = useState({
    autoPlay: true,
    autoNext: true,
    autoSkip: true,
  });

  // // Load settings from localStorage on mount
  // useEffect(() => {
  //   if (typeof window === "undefined") return;

  //   const savedSettings = JSON.parse(
  //     localStorage.getItem("playerSettings") || "{}",
  //   );

  //   setSettings({
  //     autoPlay: savedSettings.autoPlay || false,
  //     autoNext: savedSettings.autoNext || false,
  //     autoSkip: savedSettings.autoSkip || false,
  //   });
  // }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("playerSettings", JSON.stringify(settings));
  }, [settings]);

  // Toggle individual settings
  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // const videoUrlWithProxy = `https://m3u8-proxy-dnuse.amvstr.me/${videoUrl}`;

  // console.log(videoUrlWithProxy);

  return (
    <div className="h-fit bg-muted">
      <div className={cn("aspect-video overflow-hidden bg-muted")}>
        {loading ? (
          "Loading"
        ) : (
          <MediaPlayer
            autoPlay={settings.autoPlay}
            storage={"player-state"}
            className="aspect-video !rounded-none !border-none"
            src={
              loading
                ? ""
                : "https://aniversehd.com/api/v1/streamingProxy?url=" + videoUrl
            }
          >
            <MediaProvider className="!rounded-none" />
            <DefaultVideoLayout
              slots={{
                seekBackwardButton: (
                  <SeekButton className="vds-button" seconds={10}>
                    <SeekForward10Icon className="vds-icon" />
                  </SeekButton>
                ),
              }}
              colorScheme="dark"
              icons={defaultLayoutIcons}
            />
          </MediaPlayer>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 p-3">
        <div className="flex gap-3">
          {["autoPlay", "autoNext", "autoSkip"].map((key) => (
            <button
              key={key}
              onClick={() => toggleSetting(key as keyof typeof settings)}
              className={cn("flex gap-0.5 whitespace-nowrap text-xs")}
            >
              {key.replace("auto", "Auto ")}:
              <p
                className={cn(
                  "w-[1em]",
                  settings[key as keyof typeof settings]
                    ? "text-primary"
                    : "text-destructive",
                )}
              >
                {settings[key as keyof typeof settings] ? "on" : "off"}
              </p>
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <button onClick={handleNextClick}>
            <TbPlayerTrackPrevFilled />
          </button>
          <button onClick={handlePrevClick}>
            <TbPlayerTrackNextFilled />
          </button>
          <button onClick={handleAddToWatchList}>
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
