import mongoose, { Document, Model, Schema } from "mongoose";
export interface IAddress extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

const AddressSchema: Schema<IAddress> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullName: { type: String, required: [true, "Please provide fullname"] },
  street: { type: String, required: [true, "Please provide street"] },
  city: { type: String, required: [true, "Please provide city"] },
  state: { type: String, required: [true, "Please provide state"] },
  postalCode: { type: String, required: [true, "Please provide postalCode"] },
  country: { type: String, required: [true, "Please provide country"] },
  phone: { type: String, required: [true, "Please provide phone"] },
});

const Address: Model<IAddress> =
  mongoose.models.Address || mongoose.model<IAddress>("Address", AddressSchema);
export default Address;
