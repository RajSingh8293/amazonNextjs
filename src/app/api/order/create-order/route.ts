import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/dbConnect";
import Order from "@/models/order.model";

export async function POST(req: NextRequest) {
  await dbConnect();

  const {
    user,
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    itemsPrice,
    shippingCharge,
    totalPrice,
    expectedDeliveryDate,
  } = await req.json();

  if (
    !user ||
    !orderItems ||
    !shippingAddress ||
    !paymentMethod ||
    !taxPrice ||
    !itemsPrice ||
    !shippingCharge ||
    !totalPrice
  ) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const createOrder = await Order.create({
    user,
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    itemsPrice,
    shippingCharge,
    totalPrice,
    expectedDeliveryDate,
  });

  return NextResponse.json(
    { message: "Order created successfully", order: createOrder },
    { status: 200 }
  );
}
