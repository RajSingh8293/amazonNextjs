"use server";
import mongoose from "mongoose";
import Order, { IOrder } from "@/models/order.model";
import { dbConnect } from "../db/dbConnect";
import { requireAuthSession } from "../auth/requireAuthSession";
import { paypal } from "./paypal.actions";
import { revalidatePath } from "next/cache";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
  color: string;
}
export interface ShippingAddress {
  fullName: string;
  state: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}
export interface CreateOrderProps {
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingCharge: number;
  totalPrice: number;
  expectedDeliveryDate: Date;
}

export const createUserOrder = async (orderData: CreateOrderProps) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingCharge,
      totalPrice,
      expectedDeliveryDate,
    } = orderData;
    await dbConnect();
    const session = await requireAuthSession();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const orderItemsWithObjectId = orderItems.map((item) => ({
      ...item,
      productId: new mongoose.Types.ObjectId(item.productId),
    }));

    const createOrder = await Order.create({
      user: session?.user?.id,
      orderItems: orderItemsWithObjectId,
      shippingAddress,
      paymentMethod,
      taxPrice,
      itemsPrice,
      shippingCharge,
      totalPrice,
      expectedDeliveryDate,
    });

    return JSON.parse(JSON.stringify(createOrder));
    // return order;

    // return {
    //   success: true,
    //   message: "Order placed succeffuly",
    //   order: JSON.parse(JSON.stringify(createOrder)),
    //   // data: { orderId: createOrder._id.toString() },
    // };
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const getOrderById = async (orderId: string): Promise<IOrder> => {
  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      throw new Error("Invalid order ID");
    }

    const order = await Order.findById(orderId);

    return JSON.parse(JSON.stringify(order));
    // return order;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const createOrderPayPalOrder = async (orderId: string) => {
  await dbConnect();
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return {
        success: false,
        message: "Order not found",
      };
    }
    //   const paypalOrder = await paypal.createPayPalOrder(order.totalPrice);
    const paypalOrder = await paypal.createPayPalOrder(order.totalPrice);
    console.log("paypalOrder  :", paypalOrder);
    order.paymentResult = {
      id: paypalOrder.id,
      email_address: "",
      status: "",
      pricePaid: "0",
    };
    await order.save();
    console.log("createOrderPayPalOrder  :", order);
    return {
      success: true,
      message: "Paypal order successfully",
      // data: paypalOrder,
      data: paypalOrder.id,
      // data: {
      //   id: paypalOrder.id, // ✅ Make sure `paypalOrder.id` exists
      // },
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};

export const approvePayPalOrder = async (
  orderId: string,
  data: { orderID: string }
) => {
  await dbConnect();

  try {
    // const order = await Order.findById(orderId).populate("user", "email");
    const order = await Order.findById(orderId);
    if (!order) {
      return {
        success: false,
        message: "Order not found",
      };
    }
    const captureResult = await paypal.capturePayPalOrder(data.orderID);

    if (
      !captureResult ||
      captureResult.status !== "COMPLETED" ||
      captureResult.id !== order.paymentResult?.id
    ) {
      throw new Error("Payment was not completed successfully");
    }

    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id: captureResult.id,
      status: captureResult.status,
      email_address: captureResult.payer?.email_address || "",
      pricePaid:
        captureResult.purchase_units[0].payments.captures[0].amount.value,
    };
    await order.save();

    // await sendEmailAfterPurchase({order})
    revalidatePath(`/your-account/orders/${orderId}`);
    return {
      success: true,
      message: "Payment has been successfully",
      data: order,
    };
  } catch (error) {
    console.error("Capture error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong during capture.",
    };
  }
};

export const getMyAllOrders = async () => {
  try {
    await dbConnect();
    const session = await requireAuthSession();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }
    const orders = await Order.find({ user: session?.user?.id });
    if (!orders) {
      return {
        success: false,
        message: "Orders not found",
      };
    }
    return {
      orders: JSON.parse(JSON.stringify(orders)) as IOrder[],
    };
    // return order;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
