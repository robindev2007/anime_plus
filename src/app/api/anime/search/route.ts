import { ANIME } from "@consumet/extensions";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const searchQuery = searchParams.get("searchQuery");
  const page = +(searchParams.get("page") ?? 1);

  if (!searchParams || !searchQuery?.length) {
    return Response.json({ error: "No search query provided!" });
  }

  const zoro = new ANIME.Zoro();

  try {
    const data = await zoro.search(searchQuery, page);
    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Something went wrong!", data: undefined });
  }
}
