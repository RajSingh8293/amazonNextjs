import { IProducts } from "@/models/product-model";
import Link from "next/link";
import React from "react";
import { cn, formatNumber } from "@/lib/utils";
import ProductPrice from "../product/ProductPrice";
import Rating from "../product/Rating";

import { Button } from "@/components/ui/button";
import { useProductHistoryStore } from "@/lib/hooks/useBrowsHistory";

const ProductCardDetails = ({
  product,
  hideBtn = false,
  className,
}: {
  product: IProducts;
  hideBtn?: boolean;
  className?: string;
}) => {
  const addToHistory = useProductHistoryStore((state) => state.addToHistory);

  return (
    <div className="flex-1 space-y-2" onClick={() => addToHistory(product)}>
      <h2 className={cn("font-bold text-black")}>{product?.brand}</h2>
      <Link
        href={`/product/${product._id}`}
        className={cn("overflow-hidden text-black", className)}
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {product.name.slice(0, 40)}...
      </Link>
      <div className="flex gap-2 ">
        <Rating rating={product.avgRating} />
        <span className="text-gray-600 font-medium">
          ({formatNumber(product.numReviews)})
        </span>
      </div>
      <ProductPrice
        price={product.price}
        isDeal={product.tags.includes("today-deal")}
        listPrice={product.listPrice}
        forListing
        className="text-black"
      />

      {!hideBtn && (
        <div className="flex justify-center items-end ">
          <Button
            size="sm"
            className="w-full bg-white hover:bg-gray-200  border rounded-2xl"
          >
            <Link
              href={`/product/${product._id}`}
              className="text-black text-sm "
            >
              Buying options
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCardDetails;
