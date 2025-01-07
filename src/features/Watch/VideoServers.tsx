import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimeStreamRes } from "@/types/anime";

export const VideoServers = ({
  streams,
  setVideoUrl,
  videoUrl,
}: {
  streams?: AnimeStreamRes;
  setVideoUrl: (url: string) => void;
  videoUrl: string;
}) => {
  return (
    <div className={cn("rounded bg-card shadow-sm")}>
      <div className="flex flex-col divide-y divide-dashed divide-muted-foreground/20">
        {streams?.streams.map(
          (stream) =>
            stream.data.length > 0 && (
              <div
                key={stream.title}
                className="flex items-center gap-4 p-2 text-sm"
              >
                <p>{stream.title}</p>
                <div className="flex gap-4">
                  {stream.data.map((source) =>
                    source.sources.map((s, i) => (
                      <Button
                        key={s.url}
                        size={"sm"}
                        onClick={() => setVideoUrl(s.url)}
                        variant={s.url == videoUrl ? "default" : "secondary"}
                        className="rounded-sm px-2"
                      >
                        {source.name} {i > 0 ? i + 1 : ""}
                      </Button>
                    )),
                  )}
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
};
