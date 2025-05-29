/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { MouseEvent } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
// import { useCartStore } from "@/lib/hooks/useCartStore";
import { Elements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/hooks/useCartStore";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const StripePayment = ({
  orderId,
  totalPrice,
}: {
  orderId: string;
  totalPrice: number;
}) => {
  const { cart } = useCartStore();

  const paymentHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { data } = await axios.post("/api/payment", {
      items: orderId,
    });

    if (data.id) {
      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId: data.id });
      }
    }
  };
  return (
    <div>
      <Elements stripe={stripePromise}>
        <Button
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={paymentHandler}
        >
          Pay Now ${totalPrice}
        </Button>
      </Elements>
    </div>
  );
};

export default StripePayment;
