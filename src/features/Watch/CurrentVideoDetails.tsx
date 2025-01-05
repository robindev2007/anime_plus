import { Episode } from "@/types/anime";
import React from "react";

function CurrentVideoDetails({ currentEpisode }: { currentEpisode: Episode }) {
  return (
    <div className="space-y-4 p-3 text-sm lg:max-w-[40%] lg:bg-primary lg:text-black">
      <div className="text-center">
        <p>You are watching</p>
        <strong className="">Episode {currentEpisode.number}</strong>
        <p>
          If current server doesn&apos;t work please try other servers beside.
        </p>
      </div>
    </div>
  );
}

export default CurrentVideoDetails;
