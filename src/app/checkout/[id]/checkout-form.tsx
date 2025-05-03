"use client";
import SelectedAddress from "@/components/checkout/SelectedAddress";
import SelectedPaymentMethod from "@/components/checkout/SelectedPaymentMethod";
import ProductPrice from "@/components/shared/product/ProductPrice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  approvePayPalOrder,
  createOrderPayPalOrder,
} from "@/lib/actions/order.actions";
import { getDayeAndDateAndTime } from "@/lib/utils";
import { IOrder } from "@/models/order.model";
import { redirect } from "next/navigation";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

import { toast } from "sonner";
import CashOnDelivery from "@/components/checkout/CashOnDelivery";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./stripe-form";
import CheckoutFooter from "../checkout-footer";

const OrderPaymentForm = ({
  order,
  paypalClientId,
  clientSecret,
}: {
  order: IOrder;
  paypalClientId: string;
  isAdmin: boolean;
  clientSecret: string | null;
}) => {
  // const router = useRouter();
  const {
    shippingAddress,
    itemsPrice,
    orderItems,
    paymentMethod,
    taxPrice,
    shippingCharge,
    totalPrice,
    expectedDeliveryDate,
    isPaid,
  } = order;
  const getExpectedDeliveryDate = getDayeAndDateAndTime(expectedDeliveryDate);

  console.log("orderId :", order);

  if (isPaid) {
    redirect(`/your-account/orders/${order._id}`);
  }
  function PrintLoadingState() {
    const [{ isPending, isRejected }] = usePayPalScriptReducer();
    let status = "";
    if (isPending) {
      status = "loading PayPal...";
    } else if (isRejected) {
      status = "Error in loading PayPal..";
    }
    return status;
  }
  const handleCreatePayPalOrder = async () => {
    const res = await createOrderPayPalOrder(order?._id as string);
    // const res = await createOrderPayPalOrder(order.id);
    console.log("handleCreatePayPalOrder res ", res);

    if (!res?.success) {
      return toast.error(res?.message);
    }
    // return res.data;
    // if (!res?.success || !res.data) {
    //   toast.error(res?.message || "Failed to create PayPal order");
    //   throw new Error("Failed to create PayPal order");
    // }

    return res.data;
  };
  const handleapprovePayPalOrder = async (data: { orderID: string }) => {
    const res = await approvePayPalOrder(order?._id as string, data);
    // const res = await approvePayPalOrder(order?._id, data);
    console.log("handleapprovePayPalOrder res ", res);
    if (res?.success) {
      toast.success(res?.message || "Payment successfully");
      return;
    } else {
      toast.error(res?.message || "Payment approval failed");
      return;
    }

    // toast.success("Payment successful!");
  };

  const Checkoutsummary = () => {
    return (
      <Card className="bg-white border-0 rounded-none">
        <CardContent>
          <div>
            <div className="text-lg font-bold">Order Summary</div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Items Price :</span>
                <span>
                  <ProductPrice price={itemsPrice} plain />
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shopping & Handling : </span>
                <span>
                  {shippingCharge === undefined ? (
                    "--"
                  ) : shippingCharge === 0 ? (
                    "FREE"
                  ) : (
                    <ProductPrice price={shippingCharge} plain />
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax :</span>
                <span>
                  {taxPrice === undefined ? (
                    "--"
                  ) : (
                    <ProductPrice price={taxPrice} plain />
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Order Total :</span>
                <span>
                  <ProductPrice price={totalPrice} plain />
                </span>
              </div>
              {!isPaid && paymentMethod === "Paypal" && (
                <div>
                  <PayPalScriptProvider options={{ clientId: paypalClientId }}>
                    <PrintLoadingState />
                    <PayPalButtons
                      createOrder={handleCreatePayPalOrder}
                      onApprove={handleapprovePayPalOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              )}

              {!isPaid && paymentMethod == "Cash on Delivery (COD)" && (
                <CashOnDelivery />
                // <Button
                //   variant="outline"
                //   size="sm"
                //   className="text-black w-full capitalize  overflow-hidden rounded-full hover:bg-yellow-400 bg-yellow-500"
                // >
                //   Cash on Delivery
                // </Button>
              )}
              {!isPaid && paymentMethod == "Stripe" && clientSecret && (
                <Elements options={{ clientSecret }} stripe={stripePromise}>
                  <StripeForm
                    priceInCents={Math.round(order.totalPrice * 100)}
                    orderId={order._id as string}
                  ></StripeForm>
                </Elements>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  return (
    <div className="text-black min-h-[100vh] bg-gray-100 px-5 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-9">
          <div className="">
            <SelectedAddress
              addressData={shippingAddress}
              btnHide
              className="lg:px-32 md:px-16 px-5"
            />
          </div>
          <div className="my-3">
            <SelectedPaymentMethod
              paymentMethod={paymentMethod}
              btnHide
              className="lg:px-32 md:px-16 px-5"
            />
          </div>
          <div className="my-3">
            <Card className="rounded-none shadow-none">
              <CardHeader>
                <div className="lg:px-32 md:px-16 px-5 flex-wrap flex  justify-between items-center gap-5">
                  <CardTitle className="font-semibold text-xl pb-0">
                    Review items and shipping
                  </CardTitle>
                  <div>
                    <CardDescription className="text-black">
                      <p>
                        <span className="font-semibold">Expected Delivery</span>{" "}
                        : {getExpectedDeliveryDate}
                      </p>
                      {orderItems.map((item) => (
                        <p key={item._id}>
                          {item.name} X {item.quantity}
                        </p>
                      ))}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          <div>
            <CheckoutFooter />
          </div>
        </div>
        <div className="w-full lg:col-span-3 ">
          <div className="w-full lg:sticky  top-5">
            {/* <Card className="bg-white border-0 rounded-none py-5">
              <CardHeader>
                <div>
                  <div className="flex justify-between items-center text-sm">
                    <p className="">Shipping Charge:</p>
                    {shippingCharge ? (
                      <p className="font-semibold">$ {shippingCharge}</p>
                    ) : (
                      <p>--</p>
                    )}
                  </div>
                  <div className="text-xl font-bold flex justify-between items-center">
                    <p> Order Total : </p>
                    <div className="font-bold">
                      <ProductPrice price={totalPrice} plain />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <Separator className=" bg-gray-300" />
              <CardContent>
                {paymentMethod == "Paypal" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-black w-full capitalize  overflow-hidden rounded-full  hover:bg-yellow-400 bg-yellow-500"
                  >
                    Paypal
                  </Button>
                )}
                {paymentMethod == "Stripe" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-black w-full capitalize  overflow-hidden rounded-full hover:bg-yellow-400 *:bg-yellow-500"
                  >
                    Stripe
                  </Button>
                )}
                {paymentMethod == "Cash on Delivery (COD)" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-black w-full capitalize  overflow-hidden rounded-full hover:bg-yellow-400 bg-yellow-500"
                  >
                    Cash on Delivery
                  </Button>
                )}
              </CardContent>
            </Card> */}
            <Checkoutsummary />
          </div>
        </div>
      </div>
    </div>
  );
};
// const CheckoutForm = ({ order }: { order: CreateOrderProps }) => {
//   const {
//     shippingAddress,
//     itemsPrice,
//     orderItems,
//     paymentMethod,
//     taxPrice,
//     shippingCharge,
//     totalPrice,
//     expectedDeliveryDate,
//   } = order;

//   console.log("orderItems :", orderItems);

//   const getExpectedDeliveryDate = getDayeAndDateAndTime(expectedDeliveryDate);
//   return (
//     <div className="text-black min-h-[100vh] bg-gray-100 px-5 py-8">
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
//         <div className="lg:col-span-9">
//           <div className="">
//             <SelectedAddress
//               addressData={shippingAddress}
//               btnHide
//               className="lg:px-32 px-16"
//             />
//           </div>
//           <div className="my-3">
//             <SelectedPaymentMethod
//               paymentMethod={paymentMethod}
//               btnHide
//               className="lg:px-32 px-16"
//             />
//           </div>
//           <div className="my-3">
//             <Card className="rounded-none shadow-none">
//               <CardHeader>
//                 <div className="lg:px-32 px-16 flex justify-between items-center gap-5">
//                   <CardTitle className="font-semibold text-xl pb-0">
//                     Review items and shipping
//                   </CardTitle>
//                   <div>
//                     <CardDescription className="text-black">
//                       {getExpectedDeliveryDate}
//                     </CardDescription>
//                   </div>
//                 </div>
//               </CardHeader>
//             </Card>
//           </div>
//         </div>
//         <div className="w-full lg:col-span-3 ">
//           <div className="w-full lg:sticky  top-5">
//             <Card className="bg-white border-0 rounded-none py-5">
//               <CardHeader>
//                 <div>
//                   <div className="flex justify-between items-center text-sm">
//                     <p className="">Shipping Charge:</p>
//                     {shippingCharge ? (
//                       <p className="font-semibold">$ {shippingCharge}</p>
//                     ) : (
//                       <p>--</p>
//                     )}
//                   </div>
//                   <div className="text-xl font-bold flex justify-between items-center">
//                     <p> Order Total : </p>
//                     <div className="font-bold">
//                       <ProductPrice price={totalPrice} plain />
//                     </div>
//                   </div>
//                 </div>
//               </CardHeader>
//               <Separator className=" bg-gray-300" />
//               <CardContent>
//                 {paymentMethod == "Paypal" && (
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="text-black w-full capitalize  overflow-hidden rounded-full  hover:bg-yellow-400 bg-yellow-500"
//                   >
//                     Paypal
//                   </Button>
//                 )}
//                 {paymentMethod == "Stripe" && (
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="text-black w-full capitalize  overflow-hidden rounded-full hover:bg-yellow-400 *:bg-yellow-500"
//                   >
//                     Stripe
//                   </Button>
//                 )}
//                 {paymentMethod == "Cash on Delivery (COD)" && (
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="text-black w-full capitalize  overflow-hidden rounded-full hover:bg-yellow-400 bg-yellow-500"
//                   >
//                     Cash on Delivery
//                   </Button>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutForm;

export default OrderPaymentForm;
