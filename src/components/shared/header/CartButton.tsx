"use client";
import { useCartStore } from "@/lib/hooks/useCartStore";
import useIsMounted from "@/lib/hooks/useIsMounted";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartButton = () => {
  const count = useCartStore((state) => state.getCartCount());
  const isMounted = useIsMounted();

  // console.log("count client :", count);

  return (
    <div className="text-white rounded h-full   border-2 border-transparent hover:border-white p-1 hover:text-white">
      <Link href="/cart" className="flex">
        <div className="relative py-2">
          {isMounted && (
            <p className=" absolute -top-0 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
              {count}
            </p>
          )}
          <ShoppingCart className="w-8 h-8" color="white" />
        </div>
        <h2 className="hidden lg:block text-white font-medium mt-4">Cart</h2>
      </Link>
    </div>
  );
};

export default CartButton;
