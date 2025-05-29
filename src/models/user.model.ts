import mongoose, { Document, Model, Schema } from "mongoose";
export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

const AddressSchema = new Schema({
  fullName: { type: String, required: [true, "Please provide fullname"] },
  street: { type: String, required: [true, "Please provide street"] },
  city: { type: String, required: [true, "Please provide city"] },
  state: { type: String, required: [true, "Please provide state"] },
  postalCode: { type: String, required: [true, "Please provide postalCode"] },
  country: { type: String, required: [true, "Please provide country"] },
  phone: { type: String, required: [true, "Please provide phone"] },
});

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role?: string;
  emailVerified?: boolean;
  paymentMethod?: string;
  address?: Address[];
  createdAt: string;
  updatedAt: string;
}
const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
    },
    role: {
      type: String,
      default: "user",
    },
    emailVerified: Boolean,
    paymentMethod: String,
    address: { type: [AddressSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
