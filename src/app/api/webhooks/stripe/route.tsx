import Order from "@/models/order.model";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const event = await stripe.webhooks.constructEvent(
    await request.text(),
    request.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );
  if (event.type === "charge.succeeded") {
    const charge = event.data.object as Stripe.Charge;
    const orderId = charge.metadata?.objectId;
    const email = charge.billing_details?.email;
    const pricePaidInCents = charge.amount;
    if (!orderId) {
      return new NextResponse("Missing orderId in metadata", { status: 400 });
    }
    const order = await Order.findById(orderId).populate("user", "email");

    if (order === null) {
      return new NextResponse("Bad Request", { status: 400 });
    }
    try {
      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentResult = {
        id: event.id,
        status: "COMPLETED",
        email_address: email,
        pricePaid: (pricePaidInCents / 100).toFixed(2),
      };
      await order.save();
    } catch (error) {
      console.log("Error :", error);
      return new NextResponse("Webhook signature error", { status: 400 });
    }
  }
  // return new NextResponse();
  return new NextResponse("Webhook received", { status: 200 });
}
