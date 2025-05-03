"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import ProductPrice from "./ProductPrice";
import Link from "next/link";
import { useCartStore } from "@/lib/hooks/useCartStore";

const AddedItem = () => {
  const total = useCartStore((state) => state.getCartTotal());
  return (
    <div className="bg-white w-full  flex flex-col gap-2">
      <div className="flex gap-4">
        <p className="text-xl">Cart Subtotal: </p>
        {/* <h1 className="text-xl font-bold">{total}</h1> */}
        <ProductPrice price={total} />
      </div>
      <Button
        size="sm"
        className="w-full rounded-full bg-yellow-400 hover:bg-yellow-500"
      >
        Proceed to buy (4 items)
      </Button>
      <Button size="sm" className="w-full bg-white border rounded-2xl">
        <Link href={`/cart`}>Go to Cart</Link>
      </Button>
    </div>
  );
};

export default AddedItem;
