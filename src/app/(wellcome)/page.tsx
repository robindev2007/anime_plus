import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import HeroAnimeSearch from "@/features/Wellcome/HeroAnimeSearch";
import WelcomePageHeader from "@/features/Wellcome/WelcomePageHeader";
import Link from "next/link";
import React from "react";
import { FaArrowCircleRight } from "react-icons/fa";

function WelcomePage() {
  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="relative bg-gradient-to-b from-background to-card-foreground/20">
        <Container className="relative border-b">
          <WelcomePageHeader />

          <HeroAnimeSearch />

          <Link
            href={"/home"}
            className="absolute bottom-0 left-1/2 w-[90%] -translate-x-1/2 translate-y-1/2 md:w-full md:translate-y-full"
          >
            <Button className="mx-auto h-12 w-full rounded-full text-lg font-bold md:rounded-t-none">
              View Full Site <FaArrowCircleRight />
            </Button>
          </Link>
        </Container>
      </div>
    </div>
  );
}

export default WelcomePage;
