import React from "react";
import Logo from "../shared/Logo";
import { ShoppingCart } from "lucide-react";

const CheckoutHeader = () => {
  return (
    <div className="px-5 py-2 flex gap-5 justify-between items-center bg-[#131921]">
      <div className="text-white rounded h-full pt-4   border-2 border-transparent hover:border-white p-1 flex hover:text-white">
        <Logo />
        <span>.in</span>
      </div>
      <div>
        <h1 className="lg:text-3xl md:text-2xl text-xl text-white">Checkout</h1>
      </div>
      <div className="text-white rounded h-full   border-2 border-transparent hover:border-white p-1 hover:text-white">
        <div className=" py-2">
          <ShoppingCart className="w-8 h-8" color="white" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutHeader;
