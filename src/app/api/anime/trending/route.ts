import { ANIME } from "@consumet/extensions";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = +(searchParams.get("page") ?? 1);

  const zoro = new ANIME.Zoro();

  try {
    const data = await zoro.fetchMostPopular(page);
    return Response.json(data);
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Something went wrong!", data: undefined });
  }
}
