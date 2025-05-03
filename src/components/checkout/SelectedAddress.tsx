"use client";
import { Address, useCheckoutStore } from "@/lib/hooks/useCheckoutStore";
import React from "react";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

const SelectedAddress = ({
  addressData,
  btnHide = false,
  className,
}: {
  addressData: Address;
  btnHide?: boolean;
  className?: string;
}) => {
  const { clearSelectedAddress } = useCheckoutStore();
  if (!addressData) {
    return <div>No address selected.</div>;
  }

  return (
    <div className="space-y-4">
      <Card className="rounded-none shadow-none">
        <CardHeader>
          <div
            className={cn(
              "flex flex-wrap justify-between items-center gap-5",
              className
            )}
          >
            <CardTitle className="text-xl font-semibold">
              Delivery address
            </CardTitle>
            <div>
              <CardDescription className="text-black">
                <p>{addressData.fullName}</p>
                <p>
                  {addressData.street}, {addressData.city}
                </p>
                <p>
                  {" "}
                  {addressData.state}, {addressData.postalCode},
                  {addressData.country}
                </p>
                Phone: {addressData.phone}
              </CardDescription>
            </div>
            {!btnHide && (
              <Button
                variant="outline"
                onClick={clearSelectedAddress}
                className="text-blue-500  border-0  bg-gray-50 hover:text-blue-600 hover:underline shadow-none"
              >
                Change
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default SelectedAddress;
