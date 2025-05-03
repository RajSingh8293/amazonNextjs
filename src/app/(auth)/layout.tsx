import AmazonLogo from "@/components/AmazonLogo";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center min-h-screen highlight-link border">
      <header className="mt-8 text-2xl text-[tomato] font-semibold">
        <AmazonLogo />
      </header>
      <main className="mx-auto max-w-sm min-w-80 ">{children}</main>

      <Separator className="my-5 bg-gray-300" />
      <footer className="flex-1 mt-2 w-full flex gap-4 flex-col items-center p-8 text-sm">
        <div className="flex justify-center space-x-4">
          <Link href="/page/conditions-of-use">Conditions of Use</Link>
          <Link href="/page/privacy-policy">Privacy Notice</Link>
          <Link href="/page/help">Help</Link>
        </div>
        <div>
          <p className="text-gray-400">
            Copyright reserved © 1996–2025, Amazon.com, Inc. or its affiliates
          </p>
        </div>
      </footer>
    </div>
  );
}
