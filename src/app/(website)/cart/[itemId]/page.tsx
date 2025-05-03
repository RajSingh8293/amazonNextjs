"use client";
import BrowsHistory from "@/components/shared/BrowsHistory";
import ProductPrice from "@/components/shared/product/ProductPrice";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useCartStore } from "@/lib/hooks/useCartStore";
import { FREE_DELIVERY_MIN_PRICE } from "@/lib/utils";

import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
const AddedItemInCart = () => {
  const params = useParams();
  const { itemId } = params;
  const total = useCartStore((state) => state.getCartTotal());
  const { cart } = useCartStore();
  const count = useCartStore((state) => state.getCartCount());

  const item = cart.find((data) => data._id === itemId);

  return (
    <div className="bg-gray-400">
      <div className="p-5">
        <div className={`grid grid-cols-1 lg:grid-cols-4 gap-4`}>
          <div className="col-span-2 lg:h-52 bg-white flex justify-center items-center p-5">
            <div className="flex gap-4 items-center ">
              <div className="space-y-2 w-[80px] h-24 relative">
                <Image
                  src={item?.image ? item?.image : ""}
                  // src="/images/watches/watches_p2-1.jpg"
                  alt=""
                  fill
                  priority
                  sizes="500"
                  className="object-cover rounded-md w-full"
                />
              </div>
              <div>
                <div className="flex gap-4 items-center">
                  <div className="bg-green-600 rounded-full w-5 h-5 flex justify-center items-center">
                    <Check color="white" size={15} />
                  </div>
                  {/* <CircleCheck className="bg-green-600 text-white" /> */}
                  <h1 className="text-xl font-bold">Added to cart</h1>
                </div>
                <div className="flex gap-2">
                  <p>Color : </p> <p>{item?.color}</p>
                </div>
                <div className="flex gap-2">
                  <p>Size : </p> <p>{item?.size}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 bg-white p-6">
            <div className="grid grid-cols-2 items-center gap-3">
              <div className="w-full flex justify-center items-center col-span-1 border-r h-full border-gray-300 pr-3">
                {total && total >= FREE_DELIVERY_MIN_PRICE ? (
                  <div>
                    <div className="flex items-center gap-3">
                      <Progress className="w-[100%] bg-[#067D62] p-2" />
                      {/* <p className="font-bold">${item?.price}</p> */}
                      <p className="font-bold">
                        ${Number(FREE_DELIVERY_MIN_PRICE)}
                      </p>
                    </div>
                    <p className="">
                      <span className="text-[#067D62] font-bold">
                        Your order is eligible for FREE Delivery
                      </span>{" "}
                      Choose{" "}
                      <span className="text-blue-400">FREE Delivery</span>{" "}
                      option at checkout.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm">
                      <span className="text-green-700">
                        Part of your first order qualifies for FREE Delivery.
                      </span>
                      <span> Select this option at checkout.</span>
                      <span className="text-blue-600 cursor-pointer hover:text-blue-500 hover:underline">
                        {" "}
                        Details
                      </span>
                    </p>
                  </div>
                )}
              </div>

              <div className="w-full col-span-1 pl-3">
                <div className="bg-white w-full  flex flex-col gap-2">
                  <div className="flex gap-4">
                    <p className="text-xl">Cart Subtotal: </p>
                    <ProductPrice price={total} />
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full  rounded-full bg-yellow-400 hover:bg-yellow-500"
                  >
                    Proceed to buy ({count} items)
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full  border rounded-2xl"
                  >
                    <Link href={`/cart`}>Go to Cart</Link>
                  </Button>
                </div>
                {/* <AddedItem /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-5">
        <BrowsHistory
          title="Your browsing history"
          className="h-44"
          size="24vh"
          grid="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
        />
      </div>
    </div>
  );
};

export default AddedItemInCart;
