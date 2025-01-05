import axios from "axios";
import * as cheerio from "cheerio";
import Image from "next/image";
import Link from "next/link";

type Movie = { id: string; title: string; image: string };

async function Text() {
  const { data } = await axios.get("https://fibwatch.shop/");

  const movies: Movie[] = [];

  const $ = await cheerio.load(data);

  $(".pt_cat_vid_list>div").each((i, movie) => {
    const image =
      $(movie).find(".video-list>.video-list-image>a>img").prop("src") ?? "";

    const title = $(movie)
      .find(
        ".video-list>.center_abs>.custom_height_fixed_blur>a>.video_channel_details>.channel_details>p",
      )
      .text();

    // http://localhost:3001/movies/https://fibwatch.shop/watch/kothin-purush-2004-bengali-web-dl-720p_CgV7dSw1MFBJJ6K.html

    const id =
      $(movie)
        .find(".video-list>.video-list-image>a")
        .prop("href")
        ?.split("/")
        .pop() ?? "";

    const data = {
      id,
      title,
      image,
    };

    movies.push(data);
  });

  return (
    <div className="grid grid-cols-4 gap-3 p-4">
      {movies.map((movie) => (
        <Link
          href={`/movies/${movie.id}`}
          key={movie.id}
          className="rounded-md bg-card p-3"
        >
          <Image src={movie.image} height={800} width={800} alt="" />

          <div>{movie.title}</div>
        </Link>
      ))}
    </div>
  );
}

export default Text;
