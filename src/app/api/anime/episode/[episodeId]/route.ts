import { Intro, Outro, Source, Subtitle } from "@/types/anime";
import axios from "axios";

export interface DataResponse {
  intro: Intro;
  outro: Outro;
  sources: Source[];
  subtitles: Subtitle[];
}

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ episodeId: string }>;
  },
) {
  const { episodeId } = await params;

  if (!episodeId || !episodeId.length) {
    return Response.json({ error: "No id provided!" });
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

  try {
    const response = await Promise.allSettled([
      // get sub
      axios.get(
        `https://consumetapi-azure.vercel.app/anime/zoro/watch?episodeId=${subId}&server=vidcloud`,
      ),
      axios.get(
        `https://consumetapi-azure.vercel.app/anime/zoro/watch?episodeId=${subId}&server=streamsb`,
      ),
      axios.get(
        `https://consumetapi-azure.vercel.app/anime/zoro/watch?episodeId=${subId}&server=vidstreaming`,
      ),
      axios.get(
        `https://consumetapi-azure.vercel.app/anime/zoro/watch?episodeId=${subId}&server=streamtape`,
      ),

      // get dub
      axios.get(
        `https://consumetapi-azure.vercel.app/anime/zoro/watch?episodeId=${dubId}&server=vidcloud`,
      ),
      axios.get(
        `https://consumetapi-azure.vercel.app/anime/zoro/watch?episodeId=${dubId}&server=streamsb`,
      ),
      axios.get(
        `https://consumetapi-azure.vercel.app/anime/zoro/watch?episodeId=${dubId}&server=vidstreaming`,
      ),
      axios.get(
        `https://consumetapi-azure.vercel.app/anime/zoro/watch?episodeId=${dubId}&server=streamtape`,
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
    console.log(error);
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

  return Response.json(streamData);
}
