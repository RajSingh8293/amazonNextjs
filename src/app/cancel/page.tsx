import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const CancelPage = () => {
  return (
    <div className="max-w-4xl h-screen flex justify-center items-center w-full mx-auto space-y-0">
      <div className="flex flex-col gap-6 items-center">
        <h1 className="font-bold text-2xl lg:text-3xl">
          Oops! Payment has not been successfully
        </h1>
        <div>We are now processing your order.</div>
        <Button asChild>
          <Link href={`/checkout`}>Go back</Link>
        </Button>
      </div>
    </div>
  );
};

export default CancelPage;
