import { ANIME } from "@consumet/extensions";

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: Promise<{ animeId: string }>;
  },
) {
  const { animeId } = await params;

  if (!animeId || !animeId?.length) {
    return Response.json({ error: "No id provided!" });
  }

  const zoro = new ANIME.Zoro();

  try {
    const data = await zoro.fetchAnimeInfo(animeId);
    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Something went wrong!", data: undefined });
  }
}
