"use client";

import { Button } from "@/components/ui/button";
import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { data } from "@/lib/data/data";

export default function HeroCarousel() {
  // const [current, setCurrent] = React.useState(0);

  const { carousals } = data;
  // const image = carousals.map((data) => data.image);
  // console.log("carousals :", image);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  return (
    <>
      <Carousel
        dir="ltr"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full bg-white h-96 "
      >
        <CarouselContent>
          {carousals.map((data, index) => (
            <CarouselItem key={index}>
              <div className="flex lg:flex-row cursor-pointer -z-10 md:flex-row flex-row w-screen relative">
                <div className="lg:bg-opacity-0 md:bg-opacity-0 sm:bg-opacity-0 bg-opacity-50 lg:w-1/2 md:w-1/2 z-30 w-full px-5 absolute top-0 right-0 left-0 bottom-0 lg:static md:static flex justify-center items-center text-center flex-col gap-5 lg:text-black md:text-black text-white ">
                  <h2 className="lg:text-5xl md:text-4xl text-3xl font-semibold">
                    {data.title}
                  </h2>
                  <p className="lg:text-3xl md:text-2xl text-xl font-semibold">
                    {data.desc}
                  </p>
                  <Button
                    size="lg"
                    variant="outline"
                    className=" bg-yellow-500 hover:bg-yellow-400   "
                  >
                    <Link className="cursor-pointer text-black" href="/shop">
                      {data.btnCaption}
                    </Link>
                  </Button>
                </div>

                <div className="lg:relative xl:relative 2xl:relative md:relative lg:w-1/2 md:w-1/2 sm:w-1/2 w-full   h-96">
                  <Image
                    src={data?.image}
                    alt={data?.title}
                    fill
                    priority
                    sizes="500px"
                    className="object-cover"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-white text-black" />
        <CarouselNext className="right-2 bg-white text-black" />
      </Carousel>
    </>
  );
}
