import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
const SelectedPaymentMethod = ({
  paymentMethod,
  className,
  clearSelectedPaymentMethod,
  btnHide = false,
}: {
  className?: string;
  paymentMethod: string;
  clearSelectedPaymentMethod?: () => void;
  btnHide?: boolean;
}) => {
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
              Payment method
            </CardTitle>
            <div>
              <CardDescription className="text-black">
                {paymentMethod}
              </CardDescription>
            </div>
            {!btnHide && (
              <Button
                variant="outline"
                onClick={clearSelectedPaymentMethod}
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

export default SelectedPaymentMethod;
