import { getOrderById } from "@/lib/actions/order.actions";
import React from "react";
import OrderPaymentForm from "./checkout-form";
import { requireAuthSession } from "@/lib/auth/requireAuthSession";
import { notFound } from "next/navigation";
import Stripe from "stripe";
const CheckoutPaymentPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const params = await props.params;
  const orderId = params.id;
  const order = await getOrderById(orderId);
  if (!order) notFound();
  const session = await requireAuthSession();
  console.log("paypalClientId :", process.env.PAYPAL_CLIENT_ID);
  let client_secret = null;
  if (order.paymentMethod === "Stripe" && !order.isPaid) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalPrice * 100),
      currency: "USD",
      metadata: { orderId: order._id.toString() },
    });
    client_secret = paymentIntent.client_secret;
  }
  return (
    <div>
      <OrderPaymentForm
        order={order}
        paypalClientId={process.env.PAYPAL_CLIENT_ID || "ab"}
        isAdmin={session.user.role === "admin" || false}
        clientSecret={client_secret}
      />
    </div>
  );
};

export default CheckoutPaymentPage;
