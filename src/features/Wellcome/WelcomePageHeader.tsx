import Link from "next/link";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaBars } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

function WelcomePageHeader() {
  const headerLinks = [
    {
      title: "Home",
      link: "/home",
    },
    {
      title: "Movies",
      link: "/movies",
    },
    {
      title: "TV Series",
      link: "/tv-series",
    },
    {
      title: "Most Popular",
      link: "/most-popular",
    },
    {
      title: "Top Airing",
      link: "/top-airing",
    },
  ];

  return (
    <div className="py-4">
      <Dialog>
        <DialogTrigger className="flex items-center gap-2 md:hidden">
          <FaBars /> Menu
        </DialogTrigger>
        <DialogContent className="max-w-[90vw] pt-10">
          {headerLinks.map((link) => (
            <Link
              key={link.link}
              href={link.link}
              className="transition-colors hover:text-primary"
            >
              <Button className="w-full" variant={"ghost"}>
                {link.title}
              </Button>
            </Link>
          ))}
        </DialogContent>
      </Dialog>

      <div className="hidden gap-4 md:flex">
        {headerLinks.map((link) => (
          <Link
            key={link.link}
            href={link.link}
            className="transition-colors hover:text-primary"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default WelcomePageHeader;
