"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { IOrder } from "@/models/order.model";
import { dateFormat } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import ProductPrice from "../shared/product/ProductPrice";
import useIsMounted from "@/lib/hooks/useIsMounted";

const OrderDetail = ({ order }: { order: IOrder }) => {
  console.log("order :", order);
  const isMounted = useIsMounted();
  if (!order) {
    return (
      <div className="flex justify-center flex-col gap-2 items-center h-[100vh] w-[100%]">
        <h1 className="text-xl font-bold">Order Not Found</h1>
        <Button>
          <Link href="/">Go back</Link>
        </Button>
      </div>
    );
  }
  const shortId = (order._id as string).slice(0, 8);

  return (
    <div className="p-5 pt-16 ">
      {order ? (
        <div className=" text-gray-600">
          <div className="mb-3 grid grid-cols-1 md:grid-cols-2">
            <div className="flex gap-3 mb-1 items-center">
              <h1 className="font-bold text-xl">Order Id :</h1>
              {/* <p className="font-bold text-xl">{order?._id as string}</p> */}
              <p className="font-bold text-xl">...{shortId}</p>
            </div>
            <h1 className="font-bold text-xl md:text-end">
              Expected Delivery : {dateFormat(order.expectedDeliveryDate)}{" "}
            </h1>
          </div>

          <div className="w-full grid md:grid-cols-5 grid-cols-1 gap-5">
            <div className="space-y-4 md:col-span-3">
              <Card className="rounded-none shadow-none">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    Shipping address
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-black">
                  <p>{order.shippingAddress.fullName}</p>
                  <p>
                    {order.shippingAddress.street}, {order.shippingAddress.city}
                    ,{order.shippingAddress.state},{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                  <p> Phone: {order.shippingAddress.phone}</p>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="rounded-full w-fit mt-2 text-sm"
                  >
                    Not Delivered
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="md:col-span-2 space-y-4 h-full  ">
              <Card className="rounded-none shadow-none  h-full">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className=" ">
                  <div className="flex justify-between items-center text-sm">
                    <div className="">Shippin Charge:</div>
                    {order?.shippingCharge ? (
                      <div className="font-semibold">
                        ${order?.shippingCharge}
                      </div>
                    ) : (
                      <div>0</div>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="">Tax :</div>
                    {order ? (
                      <div className="font-semibold">${order.taxPrice}</div>
                    ) : (
                      <div>0</div>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="">Items Price :</div>
                    {order?.itemsPrice ? (
                      <div className="font-semibold">${order?.itemsPrice}</div>
                    ) : (
                      <div>0</div>
                    )}
                  </div>
                  <div className="text-xl font-bold flex justify-between items-center">
                    <div>Total : </div>
                    {isMounted && (
                      <div className="font-bold">
                        <ProductPrice price={order.totalPrice} plain />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4 mt-2">
            <Card className="rounded-none shadow-none">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Payment Info
                </CardTitle>
              </CardHeader>
              <CardContent className=" ">
                <p>
                  <span className="font-bold">Total Amount</span> :{" "}
                  {order?.totalPrice.toFixed(2)}
                </p>
                <p>
                  {" "}
                  <span className="font-bold">Payment Method </span>:{" "}
                  {order?.paymentMethod}
                </p>
                {/* <p>{order?.createdAt.toISOString().split("T")[0]}</p> */}
                <Button
                  variant="destructive"
                  size="sm"
                  className="rounded-full w-fit mt-2 text-sm"
                >
                  {order.isPaid === true
                    ? `Paid At ${dateFormat(order?.createdAt)}`
                    : "Not Paid"}
                  {/* {order.paymentResult?.status === "paid"
                    ? `Paid At ${dateFormat(order?.createdAt)}`
                    : "Not Paid"} */}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 mt-2">
            <div className=" w-full">
              <Card className="rounded-none shadow-none">
                <CardHeader>
                  <h1 className="font-semibold text-xl">Order Items</h1>
                </CardHeader>
                <CardContent>
                  <Table className="w-full min-w-[700px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px] ">Item</TableHead>
                        <TableHead className=" text-right">Qty</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order &&
                        order?.orderItems.map((item) => (
                          <TableRow key={item?._id}>
                            <TableCell className="font-medium w-[200px]">
                              <div className="flex items-center gap-4">
                                <Image
                                  src={item ? item?.image : ""}
                                  alt=""
                                  width={40}
                                  height={40}
                                  sizes="100"
                                />
                                <div className="text-gray-600">
                                  <p className="flex flex-wrap">
                                    Name : {(item.name as string).slice(0, 40)}
                                  </p>
                                  <p className="flex flex-wrap">
                                    Color : {item.color}
                                  </p>
                                  <p className="flex flex-wrap">
                                    Size : {item.size}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className=" text-right">
                              {item?.quantity}
                            </TableCell>
                            <TableCell className="text-right">
                              ${item.price}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[100vh] w-[100%]">
          <h1 className="text-xl font-bold">Order Not Found</h1>
          <Button>
            <Link href="/">Go back </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
