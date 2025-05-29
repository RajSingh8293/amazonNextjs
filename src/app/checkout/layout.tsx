import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import React from "react";

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" ">
      <CheckoutHeader />
      <main className="min-h-screen ">{children}</main>
    </div>
  );
}
