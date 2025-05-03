"use client";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { getExpectedDeliveryDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/hooks/useCartStore";
import { useCheckoutStore } from "@/lib/hooks/useCheckoutStore";
import { createUserOrder } from "@/lib/actions/order.actions";

const CashOnDelivery = () => {
  const router = useRouter();
  const { cart } = useCartStore();
  const { selectedAddress, selectedPaymentMethod, selectedShippingOption } =
    useCheckoutStore();
  const itemsPrice = useCartStore((state) => state.getCartTotal());
  const shippingCharge = selectedShippingOption?.charge ?? 0;
  const taxPrice = Math.round(Number(itemsPrice * 0.18));
  const shippingCh = itemsPrice > 499 ? 0 : shippingCharge;
  const paymentM = selectedPaymentMethod?.label || "";
  const totalPrice = itemsPrice + taxPrice + shippingCh;
  const expectedDeliveryDate = getExpectedDeliveryDate(
    selectedShippingOption?.id
  );
  const shippingAddress = {
    fullName: selectedAddress?.fullName || "",
    state: selectedAddress?.state || "",
    phone: selectedAddress?.phone || "",
    street: selectedAddress?.street || "",
    city: selectedAddress?.city || "",
    postalCode: selectedAddress?.postalCode || "",
    country: selectedAddress?.country || "",
  };
  const orderData = cart.map((item) => {
    return {
      productId: item._id!,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image!,
      size: item.size,
      color: item.color,
    };
  });
  const handleCashOnDelvery = async () => {
    const order = await createUserOrder({
      orderItems: orderData,
      shippingAddress: shippingAddress,
      paymentMethod: paymentM,
      itemsPrice: itemsPrice,
      taxPrice: taxPrice,
      shippingCharge: shippingCh,
      totalPrice: totalPrice,
      expectedDeliveryDate: expectedDeliveryDate,
    });
    router.push(`/checkout/${order?._id}`);
    // console.log("order :", order);
    toast.success("Order created successfully");
  };
  return (
    <div>
      {" "}
      <Button
        onClick={handleCashOnDelvery}
        variant="outline"
        size="sm"
        className="text-black w-full capitalize  overflow-hidden rounded-full hover:bg-yellow-400 bg-yellow-500"
      >
        Cash on Delivery
      </Button>
    </div>
  );
};

export default CashOnDelivery;
