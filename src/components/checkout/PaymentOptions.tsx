"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCheckoutStore } from "@/lib/hooks/useCheckoutStore";
import { Button } from "../ui/button";
import { paymentMethods } from "@/lib/data/data";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import SelectedPaymentMethod from "./SelectedPaymentMethod";

const PaymentOptions = () => {
  const {
    setSelectedPaymentMethod,
    selectedAddress,
    selectedPaymentMethod,
    clearSelectedPaymentMethod,
  } = useCheckoutStore();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelectChange = (addressId: string) => {
    setSelected(addressId);
  };

  const handleSavePaymentMethod = () => {
    if (selected) {
      const method = paymentMethods.find((payment) => payment.id === selected);
      if (method) {
        setSelectedPaymentMethod(method);
      }
    }
  };

  useEffect(() => {
    if (!selected && paymentMethods.length > 0) {
      setSelected(paymentMethods[0].id || null);
    }
  }, [selected]);
  return (
    <div className="space-y-4">
      {selectedPaymentMethod ? (
        <>
          <SelectedPaymentMethod
            paymentMethod={selectedPaymentMethod?.label}
            clearSelectedPaymentMethod={clearSelectedPaymentMethod}
          />
        </>
      ) : (
        <div>
          {selectedAddress && (
            <Card className="rounded-none shadow-none">
              <CardHeader>
                <CardTitle className="font-semibold text-xl pb-4">
                  Select Payment Method
                </CardTitle>
                <Separator />
              </CardHeader>
              <CardContent>
                <div>
                  <RadioGroup
                    value={selected || ""}
                    onValueChange={handleSelectChange}
                  >
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`flex items-center gap-3 p-2  cursor-pointer `}
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Label htmlFor={method.id}>
                          <div className="text-sm ">{method.label}</div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    onClick={handleSavePaymentMethod}
                    className=" text-sm bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-full shadow"
                  >
                    Use this address
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentOptions;
