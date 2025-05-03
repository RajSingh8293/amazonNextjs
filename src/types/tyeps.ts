import { OrderItem, ShippingAddress } from "@/lib/actions/order.actions";

export interface UserSignUp {
  name: string;
  password: string;
  email: string;
}
export interface UserSignIn {
  password: string;
  email: string;
}

export interface OrderTypes {
  _id?: string;
  user?: string;
  itemsPrice: number;
  shippingAddress: ShippingAddress;
  orderItems: OrderItem[];
  paymentMethod: string;
  taxPrice: number;
  shippingCharge: number;
  totalPrice: number;
  paymentResult?: {
    id: string;
    status: string;
    pricePaid: string;
    email_address: string;
  };
  isDelivered: boolean;
  isPaid: boolean;
}
