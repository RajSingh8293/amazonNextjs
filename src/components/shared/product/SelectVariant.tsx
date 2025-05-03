import { Button } from "@/components/ui/button";
import { IProducts } from "@/models/product-model";
import Link from "next/link";
import React from "react";

const SelectVariant = ({
  product,
  size,
  color,
}: {
  product: IProducts;
  size: string;
  color: string;
}) => {
  const selectedColor = color || product.colors[0];
  const selectedSize = size || product.sizes[0];

  console.log("selectedColor :", selectedColor);
  console.log("selectedSize :", selectedSize);

  return (
    <>
      {product.colors.length > 0 && (
        <div>
          <div>Colors :</div>
          <div className="mt-2 flex gap-2">
            {product.colors.map((data: string) => (
              <Button
                key={data}
                asChild
                size="sm"
                className={`  ${
                  selectedColor === data ? "border-2 border-black rounded" : ""
                }`}
              >
                <Link
                  replace
                  scroll={false}
                  href={`?${new URLSearchParams({
                    size: selectedSize,
                    color: data,
                  })}`}
                  key={data}
                >
                  <div
                    style={{
                      backgroundColor: data,
                    }}
                    className="h-4 w-4 rounded-full border border-muted-foreground"
                  ></div>
                  {data}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
      {product.sizes.length > 0 && (
        <div className="mt-2 space-y-2">
          <div className="">Sizes :</div>
          <div className="mt-2 flex gap-2">
            {product.sizes.map((data: string) => (
              <Button
                key={data}
                size="sm"
                asChild
                className={
                  selectedSize === data ? "border-2 border-black rounded" : ""
                }
              >
                <Link
                  href={`?${new URLSearchParams({
                    size: data,
                    color: selectedColor,
                  })}`}
                  key={data}
                >
                  {/* <div
                  style={{
                    backgroundColor: data,
                  }}
                  className="h-4 w-4 rounded-full border border-muted-foreground"
                ></div> */}
                  {data}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SelectVariant;
