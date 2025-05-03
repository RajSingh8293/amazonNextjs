// "use client";
// import React, { useEffect } from "react";
// import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
// import { IAddress } from "@/lib/actions/address.actions";
// import { Button } from "../ui/button";
// import { useCheckoutStore } from "@/lib/hooks/useCheckoutStore";
// import CreateAndUpdateAddressModal from "../shared/CreateAndUpdateAddressModal";
// interface DataProps {
//   addresses: IAddress[];
// }

// const CheckoutAddressCard = ({ addresses }: DataProps) => {
//   // const [selectedAddress, setSelectedAddress] = useState<string>("");

//   // const handleChange = (value: string) => {
//   //   setSelectedAddress(value);
//   // };

//   // const handleDeliver = () => {
//   //   console.log("Deliver to Address:", selectedAddress);
//   //   setSelectedAddressId(selectedAddress);
//   // };

//   // useEffect(() => {
//   //   if (addresses.length > 0) {
//   //     setSelectedAddress(addresses[0]._id ?? "");
//   //   }
//   // }, [addresses]);
//   const { selectedAddressId, setSelectedAddressId } = useCheckoutStore();

//   useEffect(() => {
//     if (!selectedAddressId && addresses.length > 0) {
//       setSelectedAddressId(addresses[0]._id ?? "");
//     }
//   }, [addresses, selectedAddressId, setSelectedAddressId]);

//   const handleChange = (value: string) => {
//     setSelectedAddressId(value);
//   };

//   const handleDeliver = () => {
//     console.log("Deliver to Address:", selectedAddressId);
//   };
//   return (
//     <div className="my-4">
//       <RadioGroup value={selectedAddressId} onValueChange={handleChange}>
//         {addresses.map((data) => (
//           <div
//             key={data._id}
//             className={`p-4 rounded-md border flex gap-5 items-center ${
//               selectedAddressId === data._id
//                 ? "border-blue-500 bg-blue-50"
//                 : "border-gray-300"
//             }`}
//           >
//             <RadioGroupItem
//               value={data._id ?? ""}
//               id={data._id}
//               className="bg-black text-black"
//             />
//             <div>
//               <h1>{data?.fullName}</h1>
//               <p>
//                 {data?.postalCode}, {data?.state}, {data?.city}, {data?.street},
//                 {data?.country}
//               </p>
//               <p>Phone number: {data?.phone}</p>
//               <div className="mt-1">
//                 <CreateAndUpdateAddressModal
//                   btnText="Edit Address"
//                   submitBtnTitle="Edit Address"
//                   hideIcon
//                   addressData={data}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </RadioGroup>

//       <div className="mt-3">
//         <CreateAndUpdateAddressModal
//           btnText="Add a new delivery address"
//           hideIcon
//         />
//       </div>
//       {selectedAddressId && (
//         <div className="py-5">
//           <Button
//             onClick={handleDeliver}
//             className=" text-sm mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md shadow"
//           >
//             Delivery to this address
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CheckoutAddressCard;
