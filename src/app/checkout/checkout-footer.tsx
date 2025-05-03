import Link from "next/link";
import React from "react";

const CheckoutFooter = () => {
  return (
    <div className="text-sm font-medium w-full space-x-2">
      <span className="">By continuing, you agree to Amazon&apos;s</span>
      <Link href="/page/conditions-of-use">Conditions of Use</Link>
      <span>and</span>
      <Link href="/page/privacy-policy">Privacy Notice</Link>
      <Link href="/page/help">Help</Link>
    </div>
  );
};

export default CheckoutFooter;
