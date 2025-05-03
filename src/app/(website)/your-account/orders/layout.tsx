import React from "react";

export default function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen ">
      <main className="flex flex-col flex-1">{children}</main>
    </div>
  );
}
