"use server";
import Stripe from "stripe";
import { dbConnect } from "../db/dbConnect";
import { requireAuthSession } from "../auth/requireAuthSession";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface LineItem {
  name: string;
  price: number;
  quantity: number;
}

export const stripePayment = async (items: LineItem[]) => {
  try {
    // const headersList = await headers();
    // const origin = headersList.get("origin");
    await dbConnect();
    const session = await requireAuthSession();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }
    const email = session?.user?.email;
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      }));
    // Create Checkout Sessions from body params.
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      customer_email: email ?? undefined,
      metadata: {
        company: "Ecommerce",
      },
      success_url: `${process.env.NEXTAUTH_URL}/checkout/success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/checkout/cancel`,
    });
    return {
      success: true,
      //   url: checkoutSession.url, // ✅ Use this to redirect on frontend
      id: checkoutSession.id, // ✅ Use this to redirect on frontend
      message: "Payment successfully created",
    };
  } catch (error) {
    console.error("Capture error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong during checkout session creation.",
    };
  }
};
