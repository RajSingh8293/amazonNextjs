import mongoose, { Schema, Document } from "mongoose";
import { Types } from "mongoose";
export interface IOrderItem {
  _id: string | null | undefined;
  productId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
  color: string;
}
export interface IShippingAddress {
  fullName: string;
  state: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

const OrderItemSchema: Schema = new Schema<IOrderItem>({
  productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
});
export interface IOrder extends Document {
  _id: Types.ObjectId | string;
  user: mongoose.Types.ObjectId;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    pricePaid: string;
    email_address: string;
  };
  itemsPrice: number;
  taxPrice: number;
  shippingCharge: number;
  totalPrice: number;
  isPaid?: boolean;
  paidAt?: Date;
  isDelivered?: boolean;
  deliveredAt?: Date;
  // expectedDeliveryDate: string;
  expectedDeliveryDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    orderItems: [OrderItemSchema],
    shippingAddress: {
      fullName: { type: String, required: true },
      street: { type: String, required: true },
      state: { type: String, required: true },
      phone: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      pricePaid: { type: String },
      email_address: { type: String },
    },
    itemsPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingCharge: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    expectedDeliveryDate: { type: Date, required: true },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
