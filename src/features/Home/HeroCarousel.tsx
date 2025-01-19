"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import AnimeSlide from "./AnimeSlide";
import { SpotlightAnime } from "@/types/anime";

function HeroCarousel({ animeList }: { animeList: SpotlightAnime[] }) {
  console.log(animeList);

  return (
    <div className="relative lg:px-3">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {animeList &&
          animeList.map((anime) => (
            <SwiperSlide key={anime.id}>
              <AnimeSlide anime={anime} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default HeroCarousel;
