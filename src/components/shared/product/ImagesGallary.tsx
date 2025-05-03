"use client";
import Image from "next/image";
import React, { useState } from "react";

const ImagesGallary = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);
  return (
    <>
      <div className=" flex  gap-4 w-full">
        <div className="flex  flex-col gap-2">
          {images.map((img: string, index: number) => (
            <div
              key={index}
              className="h-16 items-center flex justify-center overflow-hidden"
            >
              <Image
                src={img}
                alt="images"
                width={25}
                height={25}
                sizes="100px"
                priority
                className="border w-full h-full object-cover rounded-md"
                onClick={() => setIndex(index)}
              />
            </div>
          ))}
        </div>
        <div className="h-full">
          <Image
            src={images[index]}
            alt="images"
            width={400}
            height={400}
            sizes="500px"
            priority
            className="rounded-lg w-auto h-auto"
          />
        </div>
      </div>
    </>
  );
};

export default ImagesGallary;
