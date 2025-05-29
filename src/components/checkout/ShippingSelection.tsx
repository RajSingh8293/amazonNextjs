"use client";
import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useCheckoutStore } from "@/lib/hooks/useCheckoutStore";
import { Label } from "../ui/label";
import { shippingOptions } from "@/lib/data/data";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
const ShippingSelection = () => {
  const { setSelectedShippingOption } = useCheckoutStore();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelectShippingOption = (shippingOptionId: string) => {
    const option = shippingOptions.find((opt) => opt.id === shippingOptionId);
    if (option) {
      setSelectedShippingOption(option);
      setSelected(shippingOptionId);
    }
  };

  useEffect(() => {
    if (!selected && shippingOptions.length > 0) {
      setSelected(shippingOptions[0].id || null);
    }
  }, [selected]);

  return (
    <div className="my-4">
      <Card className="rounded-none shadow-none">
        <CardHeader>
          <CardTitle>Choose Shipping Option</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selected || ""}
            onValueChange={handleSelectShippingOption}
            className="space-y-2"
          >
            {shippingOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id}>
                  {option.label}
                  {option.charge === 0 ? "(Free)" : `($${option.charge})`}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingSelection;
