export const dynamic = "force-dynamic";
import { getOrderById } from "@/lib/actions/order.actions";
import React from "react";
import { requireAuthSession } from "@/lib/auth/requireAuthSession";
import { notFound } from "next/navigation";
import PaymentForm from "./payment-form";
const CheckoutPaymentPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const params = await props.params;
  const orderId = params.id;
  const order = await getOrderById(orderId);
  if (!order) notFound();
  const session = await requireAuthSession();
  const client_secret = process.env.PAYPAL_CLIENT_ID!;
  return (
    <div>
      <PaymentForm
        order={order}
        paypalClientId={process.env.PAYPAL_CLIENT_ID || "ab"}
        isAdmin={session.user.role === "admin" || false}
        clientSecret={client_secret}
      />
    </div>
  );
};

export default CheckoutPaymentPage;
