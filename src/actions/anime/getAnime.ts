"use server";

export interface DataResponse {
  intro: Intro;
  outro: Outro;
  sources: Source[];
  subtitles: Subtitle[];
}

import {
  AnimeEpisodesRes,
  AnimeInfoRes,
  AnimeSearchRes,
  AnimeSearchSuggestionRes,
  HomePageAnimeRes,
  Intro,
  Outro,
  Source,
  Subtitle,
} from "@/types/anime";
import { AnimeAPi } from "@/utils/utils";
import axios from "axios";

export const getHomePageData = async () => {
  try {
    const { data } = await AnimeAPi.get<{ data: HomePageAnimeRes }>(
      "/api/v2/hianime/home",
    );

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
};

export const getAnimeInfo = async (animeId: string) => {
  try {
    const { data } = await AnimeAPi.get<AnimeInfoRes>(
      `/api/v2/hianime/anime/${animeId}`,
    );

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
};

export const getAnimeEpisodes = async (animeId: string) => {
  try {
    const { data } = await AnimeAPi.get<AnimeEpisodesRes>(
      `/api/v2/hianime/anime/${animeId}/episodes`,
    );

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
};

export const getAnimeSearchSuggestions = async (query: string) => {
  try {
    const { data } = await AnimeAPi.get<AnimeSearchSuggestionRes>(
      `/api/v2/hianime/search/suggestion?q=${query}`,
    );

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
};

export const getAnimeSearch = async ({
  query,
  page = 1,
}: {
  query: string;
  page?: number;
}) => {
  try {
    const { data } = await AnimeAPi.get<AnimeSearchRes>(
      `/api/v2/hianime/search?q=${query}&page=${page}`,
    );

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
};

export const getAnimeStream = async (baseEpId: string) => {
  const episodeId =
    baseEpId.replaceAll("?", "$").replace("ep=", "episode$") + "$both";

  if (!episodeId || !episodeId.length) {
    return { error: "No id provided!" };
  }

  const subId = episodeId.replace("both", "sub");
  const dubId = episodeId.replace("both", "dub");

  let subVidcloudData: DataResponse | null = null;
  let subStreamsData: DataResponse | null = null;
  let subVidstreamingData: DataResponse | null = null;
  let subStreamtapeData: DataResponse | null = null;

  let dubVidcloudData: DataResponse | null = null;
  let dubStreamsData: DataResponse | null = null;
  let dubVidstreamingData: DataResponse | null = null;
  let dubStreamtapeData: DataResponse | null = null;

  console.log({
    a: `https://consumetapi-azure.vercel.app/anime/zoro/watch?episodeId=${subId}=vidcloud`,
  });

  try {
    const response = await Promise.allSettled([
      // get sub
      axios.get(
        `https://consumetapi-azure.vercel.app/anime/zoro/watch?episodeId=${subId}=vidcloud`,
      ),
      axios.get(
        `https://consumetapi-azure.vercel.app/anime/zoro/watch?episodeId=${subId}=streamsb`,
      ),
      axios.get(
        `https://consumetapi-azure.vercel.app/anime/zoro/watch?episodeId=${subId}=vidstreaming`,
      ),
      axios.get(
        `https://consumetapi-azure.vercel.app/anime/zoro/watch?episodeId=${subId}=streamtape`,
      ),

      // get dub
      axios.get(
        `https://consumetapi-azure.vercel.app/anime/zoro/watch?episodeId=${dubId}=vidcloud`,
      ),
      axios.get(
        `https://consumetapi-azure.vercel.app/anime/zoro/watch?episodeId=${dubId}=streamsb`,
      ),
      axios.get(
        `https://consumetapi-azure.vercel.app/anime/zoro/watch?episodeId=${dubId}=vidstreaming`,
      ),
      axios.get(
        `https://consumetapi-azure.vercel.app/anime/zoro/watch?episodeId=${dubId}=streamtape`,
      ),
    ]);

    // sub
    if (response[0].status == "fulfilled") {
      subVidcloudData = response[0].value.data;
    }
    if (response[1].status == "fulfilled") {
      subStreamsData = response[1].value.data;
    }
    if (response[2].status == "fulfilled") {
      subVidstreamingData = response[2].value.data;
    }
    if (response[3].status == "fulfilled") {
      subStreamtapeData = response[3].value.data;
    }

    // dub

    if (response[4].status == "fulfilled") {
      dubVidcloudData = response[4].value.data;
    }
    if (response[5].status == "fulfilled") {
      dubStreamsData = response[5].value.data;
    }
    if (response[6].status == "fulfilled") {
      dubVidstreamingData = response[6].value.data;
    }
    if (response[7].status == "fulfilled") {
      dubStreamtapeData = response[7].value.data;
    }
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong!", data: undefined };
  }

  const intro =
    subVidcloudData?.intro ||
    subStreamsData?.intro ||
    subVidstreamingData?.intro ||
    subStreamtapeData?.intro;

  const outro =
    subVidcloudData?.outro ||
    subStreamsData?.outro ||
    subVidstreamingData?.outro ||
    subStreamtapeData?.outro;

  const formattedSource = [
    {
      title: "Sub",
      data: [
        {
          name: "VidsStreaming",
          sources: subVidstreamingData?.sources ?? [],
        },
        // {
        //   name: "VidCloud",
        //   sources: subVidcloudData?.sources ?? [],
        // },
        // {
        //   name: "StreamsData",
        //   sources: subStreamsData?.sources ?? [],
        // },
        // {
        //   name: "StreamtApe",
        //   sources: subStreamtapeData?.sources ?? [],
        // },
      ].filter((source) => source.sources.length > 0),
    },
    {
      title: "Dub",
      data: [
        {
          name: "VidsStreaming",
          sources: dubVidstreamingData?.sources ?? [],
        },
        // {
        //   name: "VidCloud",
        //   sources: dubVidcloudData?.sources ?? [],
        // },
        // {
        //   name: "StreamsData",
        //   sources: dubStreamsData?.sources ?? [],
        // },
        // {
        //   name: "StreamtApe",
        //   sources: dubStreamtapeData?.sources ?? [],
        // },
      ].filter((source) => source.sources.length > 0),
    },
  ].filter((data) => data.data.length > 0);

  const subtitles = [
    ...(subVidcloudData?.subtitles ?? []),
    ...(subStreamsData?.subtitles ?? []),
    ...(subVidstreamingData?.subtitles ?? []),
    ...(subStreamtapeData?.subtitles ?? []),
    ...(dubVidcloudData?.subtitles ?? []),
    ...(dubStreamsData?.subtitles ?? []),
    ...(dubVidstreamingData?.subtitles ?? []),
    ...(dubStreamtapeData?.subtitles ?? []),
  ];

  const filterSubtitles = subtitles.filter(
    (obj, index, self) => index === self.findIndex((t) => t.url === obj.url),
  );

  const streamData = {
    streams: formattedSource,
    intro,
    outro,
    subtitles: filterSubtitles,
  };

  if (streamData.streams.length == 0) {
    return { error: "No streams found" };
  }

  return { data: streamData };
};

const l = [
  "https://consumetapi-azure.vercel.app/anime/zoro/watch?episodeId=spy-x-family-17977$episode$92049$sub",
  "https://consumetapi-azure.vercel.app/anime/zoro/watch?episodeId=spy-x-family-17977$episode$92048$sub=vidcloud",
];
