import React from "react";

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-5 min-h-screen ">
      <h1>Checkout Header</h1>
      <main className="flex flex-col flex-1">{children}</main>
    </div>
  );
}
