import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
const SuccessPage = async (props: {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ payment_intent: string }>;
}) => {
  const params = await props.params;
  const { id } = params;

  return (
    <div className="max-w-4xl h-screen flex justify-center items-center w-full mx-auto space-y-0">
      <div className="flex flex-col gap-6 items-center">
        <h1 className="font-bold text-2xl lg:text-3xl">
          Thanks for your purchase
        </h1>
        <h1 className="font-bold text-2xl lg:text-3xl">Order Id : {id}</h1>
        <div>We are now processing your order.</div>
        <Button asChild>
          <Link href={`/your-account/orders/${id}`}>View order</Link>
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
