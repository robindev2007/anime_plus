import React from "react";
import Container from "../Container";
import SearchAnime from "./SearchAnime";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <div className="sticky top-0 z-30 bg-background/95 backdrop-blur">
      <Container className="relative flex items-center justify-between">
        <Link
          href={"/home"}
          className="flex items-center justify-between transition-opacity hover:opacity-90"
        >
          <Image
            src={"/images/logo_white.png"}
            height={780}
            width={200}
            alt="Anime plus website logo"
            className="h-5 w-fit min-w-20"
          />
        </Link>

        <SearchAnime />
      </Container>
    </div>
  );
}

export default Header;
