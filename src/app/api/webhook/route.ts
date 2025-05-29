/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/dbConnect";
import Order from "@/models/order.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  await dbConnect();
  const readable = req.body as ReadableStream<Uint8Array>;
  const reader = readable.getReader();
  const chunks: Uint8Array[] = [];

  let done = false;
  while (!done) {
    const { value, done: isDone } = await reader.read();
    if (value) chunks.push(value);
    done = isDone;
  }
  const rawBody = Buffer.concat(chunks);
  const sig = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const paymentIntentId = session.payment_intent as string;
    const orderId = session.metadata?.orderId;

    await Order.findByIdAndUpdate(
      orderId,
      {
        isPaid: true,
        paidAt: new Date(),
        paymentResult: {
          id: paymentIntentId,
          status: session.payment_status,
          pricePaid: ((session.amount_total || 0) / 100).toFixed(2),
          email_address: session.customer_email || "",
        },
      },
      { new: true }
    );

    console.log(` Order ${orderId} marked as paid`);
  }

  return new Response("Webhook received", { status: 200 });
}
