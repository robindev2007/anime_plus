"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import AnimeSlide from "./AnimeSlide";
import { TrendingAnimeRes } from "@/types/anime";

function HeroCarousel({
  animeList,
}: {
  animeList: TrendingAnimeRes["results"];
}) {
  return (
    <div className="relative">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {animeList.map((anime, i) => (
          <SwiperSlide key={anime.id}>
            <AnimeSlide anime={anime} spotlight={i + 1} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroCarousel;
