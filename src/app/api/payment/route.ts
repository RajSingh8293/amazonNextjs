import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user.model";
import { requireAuthSession } from "@/lib/auth/requireAuthSession";
import Order from "@/models/order.model";

// interface LineItem {
//   name: string;
//   price: number;
//   price_date: {
//     currency: string;
//     product_data: {
//       name: string;
//     };
//     unit_amount: number;
//   };
//   quantity: number;
// }

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userId = await requireAuthSession();
  const { items } = body;
  const user = await User.findOne({ _id: userId.user.id });
  const order = await Order.findOne({ _id: items });
  console.log("user :", user);

  try {
    // const line_items = order?.orderItems?.map((item: LineItem) => ({
    //   price_data: {
    //     currency: "inr",
    //     product_data: {
    //       name: item.name,
    //     },
    //     unit_amount: item.price * 100,
    //   },
    //   quantity: item.quantity,
    // }));
    const line_items = [
      {
        price_data: {
          currency: "usd",
          // unit_amount: order.totalPrice * 100,
          unit_amount: Number(order.totalPrice) * 100,
          product_data: {
            name: "T-Shirt",
          },
        },
        quantity: 1,
        tax_rates: [],
      },
    ];
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items,
      payment_method_types: ["card"],
      customer_email: user?.email,
      billing_address_collection: "required",
      // shipping_options: [
      //   {
      //     shipping_rate: "shr_1Qsi95SI4MtLjJYXaQZ9L9xW",
      //   },
      // ],
      metadata: {
        userId: String(user?._id),
        orderId: order._id.toString(), // Pass order ID to webhook
      },
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/success${order._id}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
    });

    return NextResponse.json(session);
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: "Something wrong with payment" + err,
      },
      { status: 500 }
    );
  }
}
