import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
export interface CardItem {
  title: string;
  link: {
    text: string;
    href: string;
  };
  items: {
    name: string;
    image: string;
    href: string;
  }[];
}

interface CardsData {
  cards: CardItem[];
}
const HomeCard = ({ cards }: CardsData) => {
  return (
    <div className="mx-auto grid grid-cols-1 my-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4 px-5">
      {cards.map((data, idx) => (
        <Card key={idx} className="w-full bg-white rounded-none border-none">
          <CardHeader>
            <CardTitle className="text-gray-600">{data.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {data?.items.map((item, i) => (
                <Link href={item.href} key={i} className="flex flex-col ">
                  <Image
                    src={item.image}
                    alt={item.name}
                    // sizes="25vw"
                    width={120}
                    height={120}
                    priority
                    className="aspect-square object-scale-down max-w-full h-auto mx-auto"
                  />
                  <p className="text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis text-center text-sm font-medium">
                    {item.name}
                  </p>
                </Link>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link
              className=" mx-2 hover:underline text-sky-700 hover:text-sky-800"
              href={data.link.href}
            >
              {data.link.text}
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default HomeCard;
