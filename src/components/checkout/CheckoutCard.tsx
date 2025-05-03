"use client";
import React from "react";
import ProductPrice from "../shared/product/ProductPrice";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useCheckoutStore } from "@/lib/hooks/useCheckoutStore";
import { useCartStore } from "@/lib/hooks/useCartStore";
import useIsMounted from "@/lib/hooks/useIsMounted";
import { createUserOrder } from "@/lib/actions/order.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getExpectedDeliveryDate } from "@/lib/utils";

const CheckoutCard = () => {
  const isMounted = useIsMounted();
  const router = useRouter();
  const { selectedAddress, selectedPaymentMethod, selectedShippingOption } =
    useCheckoutStore();
  const total = useCartStore((state) => state.getCartTotal());
  const count = useCartStore((state) => state.getCartCount());
  const shippingOption = selectedShippingOption?.charge ?? 0;

  const isDisabled = !selectedPaymentMethod || !selectedAddress;
  const { cart } = useCartStore();
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
  // let itemsPrice = 0;
  // cart.map((item) => {
  //   itemsPrice += item.price * item.quantity;
  // });

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
  const itemsPrice = Number(total.toFixed(2));
  const taxPrice = Math.round(Number(itemsPrice * 0.18));
  const shippingCharge = Number(itemsPrice) > 499 ? 0 : 100;
  const paymentM = selectedPaymentMethod?.label || "";
  const totalPrice = Math.round(
    itemsPrice + taxPrice + shippingCharge + shippingOption
  );
  const totalP = Number(totalPrice.toFixed(2));

  const paymentHandler = async () => {
    const order = await createUserOrder({
      orderItems: orderData,
      shippingAddress: shippingAddress,
      paymentMethod: paymentM,
      itemsPrice: itemsPrice,
      taxPrice,
      shippingCharge: shippingCharge,
      totalPrice: totalP,
      expectedDeliveryDate: expectedDeliveryDate,
    });
    router.push(`/checkout/${order?._id}`);
    toast.success("Order created successfully");
  };
  const paymentHandlerCashOnDelivery = async () => {
    const order = await createUserOrder({
      orderItems: orderData,
      shippingAddress: shippingAddress,
      paymentMethod: paymentM,
      itemsPrice: itemsPrice,
      taxPrice,
      shippingCharge: shippingCharge,
      totalPrice: totalP,
      expectedDeliveryDate: expectedDeliveryDate,
    });
    router.push(`/your-account/orders/${order?._id}`);
    toast.success("Order created successfully");
  };

  return (
    <Card className="bg-white border-0 rounded-none py-5">
      <CardContent>
        {paymentM === "Cash on Delivery (COD)" ? (
          <Button
            onClick={paymentHandlerCashOnDelivery}
            variant="outline"
            size="sm"
            disabled={isDisabled}
            className={` ${
              selectedPaymentMethod && selectedAddress
                ? "bg-yellow-500"
                : " bg-yellow-400"
            } text-black w-full capitalize  overflow-hidden rounded-full mt-3 hover:bg-yellow-400`}
          >
            {selectedPaymentMethod && selectedAddress
              ? "Cash on Delivery"
              : "Select Payment & Address"}
          </Button>
        ) : (
          <Button
            onClick={paymentHandler}
            variant="outline"
            size="sm"
            disabled={isDisabled}
            className={` ${
              selectedPaymentMethod && selectedAddress
                ? "bg-yellow-500"
                : " bg-yellow-400"
            } text-black w-full capitalize  overflow-hidden rounded-full mt-3 hover:bg-yellow-400`}
          >
            {selectedPaymentMethod && selectedAddress
              ? "Place Order"
              : "Select Payment & Address"}
          </Button>
        )}

        <Separator className="my-5 bg-gray-300" />

        <div>
          <div className="flex justify-between items-center text-sm">
            <p className="">Items:</p>
            {isMounted && (
              <p className="font-semibold">
                {count > 0 ? count : <span>--</span>}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center text-sm">
            <p className="">Shippin Option:</p>
            {shippingOption ? (
              <p className="font-semibold">${shippingOption}</p>
            ) : (
              <p>--</p>
            )}
          </div>
          <div className="flex justify-between items-center text-sm">
            <p className="">Tax :</p>
            {taxPrice ? (
              <p className="font-semibold">${taxPrice}</p>
            ) : (
              <p>--</p>
            )}
          </div>
          <div className="text-xl font-bold flex justify-between items-center">
            <p> Order Total : </p>
            {isMounted && (
              <div className="font-bold">
                <ProductPrice price={totalPrice} plain />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckoutCard;
