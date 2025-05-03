"use client";
import React from "react";
import { Button } from "../ui/button";
import { UpdateQuantityButton } from "../shared/product/UpdateQuantityButton";
import { useCartStore } from "@/lib/hooks/useCartStore";
import Image from "next/image";
import ProductPrice from "../shared/product/ProductPrice";
import ShippingSelection from "./ShippingSelection";
import { useCheckoutStore } from "@/lib/hooks/useCheckoutStore";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const ProductSummary = () => {
  const { cart, removeFromCart } = useCartStore();
  const { selectedAddress, selectedPaymentMethod } = useCheckoutStore();
  return (
    <div>
      <Card className="rounded-none shadow-none">
        <CardHeader>
          <CardTitle className="font-semibold text-xl pb-0">
            Review items and shipping
          </CardTitle>
          <CardDescription>
            {selectedAddress && selectedPaymentMethod && (
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
                <div className="col-span-4">
                  {cart?.map((product, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-4 py-5 border-b"
                    >
                      <div className="lg:col-span-10 w-full">
                        <div className="flex lg:flex-row flex-col gap-4">
                          <div className="space-y-2 w-[100px] h-auto">
                            <Image
                              src={product?.image ? product?.image : ""}
                              alt={product.name}
                              width={60}
                              height={60}
                              sizes="500"
                              priority
                              className="object-cover rounded-md w-full"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-normal">{product?.name}</p>
                            <p className="text-normal">
                              {" "}
                              <span>Color : </span>{" "}
                              <span>{product?.color}</span>
                            </p>
                            <p className="">
                              {" "}
                              <span>Size : </span> <span>{product?.size}</span>
                            </p>
                            <div>
                              {product.countInStock > 0 ? (
                                <p className="text-blue-400 text-sm">
                                  In stock
                                </p>
                              ) : (
                                <p className="text-blue-400 text-sm">
                                  Out of stock
                                </p>
                              )}
                            </div>
                            <div className="">
                              <ProductPrice
                                price={product.price * product.quantity}
                                plain
                              />
                            </div>
                            <div className="flex gap-2 mt-2">
                              <UpdateQuantityButton
                                id={String(product._id)}
                                color={product.color}
                                size={product.size}
                                quantity={product.quantity}
                              />

                              <Button
                                onClick={() =>
                                  removeFromCart(
                                    product._id,
                                    product.color,
                                    product.size
                                  )
                                }
                                size="sm"
                                className="bg-white rounded-none border-gray-200 border-r border-l hover:bg-white shadow-none text-blue-400 hover:underline"
                              >
                                delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-span-2">
                  <ShippingSelection />
                </div>
              </div>
            )}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ProductSummary;
