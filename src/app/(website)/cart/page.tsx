"use client";
import ProductPrice from "@/components/shared/product/ProductPrice";
import { UpdateQuantityButton } from "@/components/shared/product/UpdateQuantityButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCartStore } from "@/lib/hooks/useCartStore";
import { Check } from "lucide-react";
import { FREE_DELIVERY_MIN_PRICE } from "@/lib/utils";
import useIsMounted from "@/lib/hooks/useIsMounted";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const total = useCartStore((state) => state.getCartTotal());
  const count = useCartStore((state) => state.getCartCount());
  const isMounted = useIsMounted();

  return (
    <div className="text-black min-h-[100vh] bg-gray-100 px-5 py-8">
      {" "}
      <div className=" ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="w-full bg-white lg:col-span-9">
            <Card className="bg-white border-0 rounded-none">
              <CardHeader className="text-3xl pb-0">Shopping Cart</CardHeader>
              <CardContent>
                <h1 className="text-gray-500 flex justify-end">Price</h1>
                <Separator className=" bg-gray-300" />

                {count > 0 ? (
                  <div className=" py-5 px-3">
                    {cart?.map((product, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-4 py-5 border-b"
                      >
                        <div className="lg:col-span-10 w-full">
                          <div className="flex lg:flex-row flex-col gap-4">
                            <div className="space-y-2 w-[100px] h-24 relative">
                              <Image
                                src={product?.image ? product?.image : ""}
                                alt=""
                                fill
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
                              <p className="text-normal">
                                {" "}
                                <span>Size : </span>{" "}
                                <span>{product?.size}</span>
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

                        <div className="lg:col-span-2   text-xl font-bold lg:text-end text-start">
                          <ProductPrice price={product.price} plain />
                        </div>
                      </div>
                    ))}
                    <div className="text-xl pt-3">
                      {isMounted && (
                        <div className="flex gap-1 justify-end">
                          <p> Subtotal ({count} items) :</p>{" "}
                          <div className="font-bold">
                            <ProductPrice price={total} plain />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex py-5 px-3 justify-center items-center flex-col">
                    <h1 className="mb-4 text-2xl font-semibold">
                      Cart is Empty
                    </h1>
                    <div className="text-center">
                      <Button>
                        <Link href="/">Go Back</Link>
                      </Button>
                    </div>
                  </div>
                )}

                {count > 0 && (
                  <>
                    <div className=" mt-5 ">
                      <div>
                        <Button onClick={() => clearCart()}>Clear Cart</Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
          <div className="w-full mx-auto lg:col-span-3 ">
            <Card className="bg-white border-0 rounded-none py-5">
              <CardContent>
                {total >= FREE_DELIVERY_MIN_PRICE && (
                  <div className="flex gap-2 mb-2">
                    <div className="bg-green-600 rounded-full w-5 h-5 p-0.5 flex justify-center items-center">
                      <Check className="text-bold" color="white" size={20} />
                    </div>
                    <p className="text-xs">
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
                <div className=" flex justify-between items-center gap-4">
                  <h1> Subtotal ({count} items): </h1>
                  <div className="font-semibold">
                    <ProductPrice price={total} plain />
                  </div>
                </div>

                {count > 0 && (
                  <Button
                    size="sm"
                    className=" 
                  w-full rounded-full mt-3 bg-yellow-400 hover:bg-yellow-500"
                  >
                    <Link href={`/checkout`}>Proceed to buy</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
