"use server";
import Address from "@/models/address.model";
import { dbConnect } from "../db/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/options";
export interface IAddress {
  _id?: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}
export const getAllUserAddresses = async () => {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error("Not authenticated");
    }

    const addresses = await Address.find({
      userId: session?.user.id,
    }).lean();

    // const addresses = JSON.parse(JSON.stringify(alladdresses));
    return addresses;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const createNewAddress = async ({
  fullName,
  street,
  city,
  state,
  postalCode,
  country,
  phone,
}: IAddress) => {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    console.log("session :", session);
    if (!session?.user?.id) {
      throw new Error("Not authenticated");
    }
    const newAddress = await Address.create({
      userId: session?.user.id,
      fullName,
      street,
      city,
      state,
      postalCode,
      country,
      phone,
    });

    const address = JSON.parse(JSON.stringify(newAddress)) as IAddress;

    // return address;
    return {
      success: true,
      address: JSON.parse(JSON.stringify(address)),
    };
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
interface AddressProps {
  updateData: IAddress;
  addressId: string;
}
export const updatedAddress = async ({
  updateData,
  addressId,
}: AddressProps) => {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    console.log("session :", session);
    if (!session?.user?.id) {
      throw new Error("Not authenticated");
    }
    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      { $set: updateData },
      { new: true }
    );

    // const upAddress = JSON.parse(JSON.stringify(updatedAddress)) as IAddress;
    // return updatedAddress;
    return {
      success: true,
      address: JSON.parse(JSON.stringify(updatedAddress)),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
