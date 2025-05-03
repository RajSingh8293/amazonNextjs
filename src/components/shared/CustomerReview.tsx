import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Rating from "./product/Rating";
import { Button } from "../ui/button";
import { User2Icon } from "lucide-react";
import { Separator } from "../ui/separator";

const customerRevies = [
  {
    _id: "1",
    name: "John Cena",
    rating: 4,
    title: "Good Product",
    message: "Perfect fit, nice material and worth for the money spent.",
    size: "sm",
    color: "yellow",
    image: "",
  },
  {
    _id: "2",
    name: "Bruce Lee",
    rating: 3,
    title: "Good",
    message: "Nice material and worth for the money spent.",
    size: "xl",
    color: "black",
    image: "",
  },
  {
    _id: "3",
    name: "Helen Sen",
    rating: 3.5,
    title: "Nice Product",
    message:
      "The shirt fits well, has good colors and did not fade when washed. The fabric is 100% Linen and has great quality",
    size: "sm",
    color: "yellow",
    image: "",
  },
  {
    _id: "4",
    name: "siddharth kumar",
    rating: 5,
    title: "Quality of the product is best.",
    message:
      "Linen quality is very good. Delivery person attitude was great. Thank you",
    size: "sm",
    color: "yellow",
    image: "",
  },
];
const CustomerReview = ({
  rating,
  numReviews,
}: {
  rating: number;
  numReviews: number;
}) => {
  console.log("rating :", rating);

  return (
    <div className="grid md:grid-cols-7 gap-3 grid-cols-1">
      <div className="col-span-2">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Customer reviews
            </CardTitle>
            <CardDescription>
              <div className="flex items-center">
                <Rating rating={rating} />
                <h1 className="text-black text-xl">{rating} out of 5</h1>
              </div>
              <p className="mt-1 text-base">{numReviews} global ratings</p>
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">Review this product</h1>
              <p>Share your thoughts with other customers</p>
              <div className="flex justify-center items-end ">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full  border rounded-2xl"
                >
                  Write a product review
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="col-span-5 px-8">
        <div>
          <h1 className="font-bold py-2">Customers say</h1>
          <p>
            Customers find these briefs to be of good quality with impressive
            soft cotton fabric and a perfect fit. They appreciate the comfort,
            with one customer noting the elastic is comfortable even in hot
            weather, and consider them worth the price. The appearance receives
            positive feedback for its nice colors, though opinions about
            authenticity are mixed, with some customers confirming they are
            original while others report receiving fake products. The
            stretchability receives mixed reviews, with customers noting the
            material becomes less elastic over time.
          </p>
        </div>
        <Separator className="my-4" />
        <div className="my-4">
          <h1 className="text-xl font-bold ">Top reviews</h1>
          <div className="py-3 flex flex-col gap-4">
            {customerRevies.map((rev) => (
              <div key={rev._id}>
                <div className="flex gap-2 items-center text-gray-400">
                  <div className=" border-2 rounded-full">
                    <User2Icon />
                  </div>
                  <p className="text-sm">{rev.name}</p>
                </div>
                <div className="flex gap-2 mt-2">
                  <Rating rating={rev.rating} size={20} />
                  <h1 className="font-semibold">{rev.title}</h1>
                </div>
                <div>
                  <p className="text-gray-400">
                    Reviewed in India on 1 April 2025
                  </p>
                  <div className="text-gray-400 flex gap-2 items-center">
                    <p>Size: {rev.size}</p>
                    <p>Colour: {rev.color}</p>
                    <p className="text-[tomato] font-semibold text-sm">
                      Verified Purchase
                    </p>
                  </div>
                  <p>{rev.message}.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
