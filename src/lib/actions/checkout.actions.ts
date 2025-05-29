// "use server";
// import { dbConnect } from "@/db/dbConnect";
// import User from "@/models/user.model";

// // export async function CheckoutCredentials({
// //   data,
// //   userId,
// // }: {
// //   data: Address;
// //   userId: string;
// // }) {
// //   await dbConnect();

// //   const user = await User.findById(userId);
// //   //   if (user) {

// //   //  fullName: data.fullName,
// //   //       street: data.street,
// //   //       city: data.city,
// //   //       state: data.state,
// //   //       postalCode: data.postalCode,
// //   //       country: data.country,
// //   //       phone: data.phone,

// //   //   }

// //   await User.findByIdAndUpdate(userId, { address: data }, { new: true });
// //   return {
// //     // data: JSON.parse(JSON.stringify(user)) as Address[],
// //     user,
// //   };
// // }

// export interface AddressType {
//   // _id: string;
//   fullName: string;
//   street: string;
//   // province: string;
//   city: string;
//   state: string;
//   postalCode: string;
//   country: string;
//   phone: string;
// }

// export async function CheckoutCredentials(
//   userId: string,
//   address: AddressType
// ) {
//   await dbConnect();

//   const user = await User.findById(userId);
//   if (!user) throw new Error("User not found");

//   user?.address?.push(address);
//   await user.save();

//   return JSON.parse(JSON.stringify(user));
// }
