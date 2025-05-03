import OrderDetail from "@/components/order/OrderDetail";
import { getOrderById } from "@/lib/actions/order.actions";
import React from "react";

const page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const orderId = params.id;
  const order = await getOrderById(orderId);
  return (
    <div>
      <OrderDetail order={order} />
    </div>
  );
};

export default page;
