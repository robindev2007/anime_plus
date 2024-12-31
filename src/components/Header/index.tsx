import React from "react";
import Container from "../Container";
import SearchAnime from "./SearchAnime";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <div className="bg-card">
      <Container className="relative flex items-center justify-between py-1">
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
        <div>
          <SearchAnime />
        </div>
      </Container>
    </div>
  );
}

export default Header;
