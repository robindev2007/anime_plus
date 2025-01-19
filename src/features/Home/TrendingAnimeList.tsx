"use client";
import React from "react";
import TrendingAnimeCard from "./TrendingAnimeCard";
import { TrendingAnime } from "@/types/anime";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import SectionHeading from "@/components/SectionHeading";

function TrendingAnimeList({
  trendingAnimes = [],
}: {
  trendingAnimes: TrendingAnime[];
}) {
  return (
    <div className="space-y-2">
      <SectionHeading title={"Trending"} />
      <div className="flex gap-2">
        <Swiper
          modules={[Navigation]}
          loop
          slidesPerView={3}
          spaceBetween={2}
          navigation={{
            nextEl: ".trending_next_button",
            prevEl: ".trending_prev_button",
          }}
          breakpoints={{
            640: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 40,
            },
          }}
        >
          {trendingAnimes &&
            trendingAnimes.map((anime) => (
              <SwiperSlide key={anime.id}>
                <TrendingAnimeCard anime={anime} />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="grid gap-2">
          <Button
            variant={"secondary"}
            className="next trending_next_button h-full gap-2 px-1.5"
          >
            <FaChevronRight />
          </Button>
          <Button
            variant={"secondary"}
            className="trending_prev_button h-full gap-2 px-1.5"
          >
            <FaChevronLeft />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TrendingAnimeList;
