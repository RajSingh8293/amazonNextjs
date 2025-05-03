import React from "react";
import { Card, CardHeader } from "@/components/ui/card";
import Link from "next/link";
const CheckoutFooter = () => {
  return (
    <div className="my-3">
      <Card className=" bg-white border-0 rounded-none">
        <CardHeader className="font-semibold text-xl pb-0">
          <p className="text-xs">
            When your order is placed, we&aposll send you an e-mail message
            acknowledging receipt of your order. If you choose to pay using an
            electronic payment method (credit card, debit card or net banking),
            you will be directed to your bank&aposs website to complete your
            payment. Your contract to purchase an item will not be complete
            until we receive your electronic payment and dispatch your item. If
            you choose to pay using Pay on Delivery (POD), you can pay using
            cash/card/net banking when you receive your item.
          </p>
          <Link
            href="/cart"
            className="text-xs py-3 text-blue-400 hover:text-blue-700 hover:underline"
          >
            Back to cart
          </Link>
        </CardHeader>
      </Card>
    </div>
  );
};

export default CheckoutFooter;
