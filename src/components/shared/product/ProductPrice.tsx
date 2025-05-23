import { cn, formatCurrency } from "@/lib/utils";
import React from "react";

const ProductPrice = ({
  price,
  className,
  listPrice = 0,
  isDeal = false,
  forListing = true,
  plain = false,
}: {
  price: number;
  className?: string;
  listPrice?: number;
  isDeal?: boolean;
  forListing?: boolean;
  plain?: boolean;
}) => {
  const discountPercent = Math.round(100 - (price / listPrice) * 100);
  const stringValue = price.toString();

  const [intValue, floatValue] = stringValue.includes(".")
    ? stringValue.split(".")
    : [stringValue, ""];
  return plain ? (
    formatCurrency(price)
  ) : listPrice == 0 ? (
    <div className={cn("text-3xl font-semibold ", className)}>
      <span className="text-xs align-super">$</span>
      {intValue}
      <span className="text-xs align-super"> {floatValue}</span>
    </div>
  ) : isDeal ? (
    <div className="space-y-2">
      <div className="flex  items-center gap-2">
        <span className="bg-red-700 rounded-sm p-1 text-white text-sm font-semibold">
          {discountPercent}% Off
        </span>
        <span className="text-xs text-black font-bold">Limited time deal</span>
      </div>
      <div className={`flex ${forListing && ""} items-center gap-2`}>
        <div className={cn("text-3xl", className)}>
          <span className="text-xs align-super">$</span>
          {intValue}
          <span className="text-xs align-super "> {floatValue}</span>
        </div>
        <div className="text-muted-foreground text-xs py-2 ">
          Was :<span className="line-through">{formatCurrency(listPrice)}</span>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="text-3xl text-orange-700">-{discountPercent}%</div>
          <div className={cn("text-2xl", className)}>
            <span className="text-xs align-super">$</span>
            {intValue}
            <span className="text-xs align-super"> {floatValue}</span>
          </div>
        </div>
        <div className="text-muted-foreground text-xs py-1 ">
          List Price :
          <span className="line-through">{formatCurrency(listPrice)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductPrice;
