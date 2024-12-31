import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimeStreamRes, Main } from "@/types/anime";

export const VideoServers = ({
  subStreams,
  dubStreams,
  setVideoUrl,
  videoUrl,
}: {
  subStreams?: AnimeStreamRes;
  dubStreams?: AnimeStreamRes;
  setVideoUrl: (url: string) => void;
  videoUrl: string;
}) => {
  return (
    <div
      className={cn(
        "bg-card shadow-sm",
        dubStreams &&
          subStreams &&
          "divide-y divide-dashed divide-foreground/20",
      )}
    >
      <div className="flex items-center gap-3 p-3">
        <SingleServer
          streams={subStreams}
          title={"Sub"}
          activeUrl={videoUrl}
          setVideoUrl={setVideoUrl}
        />
      </div>
      {dubStreams?.stream?.multi && (
        <div className="flex items-center gap-3 p-3">
          <SingleServer
            streams={dubStreams}
            title={"Dub"}
            activeUrl={videoUrl}
            setVideoUrl={setVideoUrl}
          />
        </div>
      )}
    </div>
  );
};

const SingleServer = ({
  streams,
  title,
  activeUrl,
  setVideoUrl,
}: {
  streams?: AnimeStreamRes;
  title: string;
  activeUrl: string;
  setVideoUrl: (url: string) => void;
}) => {
  return (
    <div className="flex items-center gap-7">
      <strong>{title}:</strong>
      <div className="flex gap-3">
        {streams?.stream?.multi &&
          Object.entries(streams.stream.multi).map(
            ([key, value]: [string, Main]) => (
              <Button
                size={"sm"}
                key={key}
                onClick={() => setVideoUrl(value.url)}
                variant={activeUrl == value.url ? "default" : "secondary"}
              >
                {key.toLocaleUpperCase()}
              </Button>
            ),
          )}
      </div>
    </div>
  );
};
