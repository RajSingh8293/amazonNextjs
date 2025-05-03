"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IProducts } from "@/models/product-model";
import { useRouter } from "next/navigation";
import { CartItem, useCartStore } from "@/lib/hooks/useCartStore";

// export type CartToAdd = {
//   // _id: string;
//   // name: string;
//   // price: number;
//   // quantity: number;
//   // countInStock: number;
//   // image?: string;
//   product: CartItem;
// };
// type AddToButtonProps = {
//   product: IProducts;
//   color: string;
//   size: string;
// };
const AddToButton = ({
  product,
  color,
  size,
}: {
  product: IProducts;
  color: string;
  size: string;
}) => {
  // const AddToButton = ({ product }: CartToAdd) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  const item: CartItem = {
    _id: product._id,
    name: product.name,
    price: product.price,
    quantity: quantity,
    color: color,
    size: size,
    countInStock: product.countInStock,
    image: product.images[0],
  };
  const AddToCartProduct = () => {
    addToCart(item);
    router.push(`/cart/${item._id}`);
    // router.push(`/cart`);
  };
  const checkoutHandler = () => {
    router.push(`/checkout`);
  };

  return (
    <div className=" ">
      <div className="w-full mt-3 p-0 ">
        {product?.countInStock > 0 && (
          <Select
            value={quantity.toString()}
            onValueChange={(value) => setQuantity(Number(value))}
          >
            <SelectTrigger className="border w-full bg-white rounded-full h-6 px-3 py-1">
              <SelectValue placeholder={`Quantity`}>
                Quantity : {quantity}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white ">
              {Array.from({ length: item.countInStock }, (_, i) => i + 1).map(
                (num) => (
                  <SelectItem
                    className="text-black"
                    key={num}
                    value={num.toString()}
                  >
                    {num}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="flex  w-full justify-center mt-2 ">
        <Button
          size="sm"
          className="w-full text-black text-normal bg-yellow-400 hover:bg-yellow-500 border-0 rounded-2xl"
          // onClick={() => addToCart(product)}
          onClick={() => AddToCartProduct()}
        >
          Add to Cart
        </Button>
      </div>
      <div className="flex   w-full not-only-of-type:justify-center mt-2 ">
        <Button
          size="sm"
          className="w-full text-black text-normal bg-yellow-500 hover:bg-yellow-400 border-0 rounded-2xl"
          // onClick={() => addToCart(product)}
          onClick={checkoutHandler}
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default AddToButton;
