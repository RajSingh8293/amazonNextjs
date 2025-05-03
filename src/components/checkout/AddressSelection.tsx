"use client";
// import React, { useEffect, useState } from "react";
// import { IAddress } from "@/lib/actions/address.actions";
// import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
// import CreateAndUpdateAddressModal from "../shared/CreateAndUpdateAddressModal";
// import { Button } from "../ui/button";
// import { useCheckoutStore } from "@/lib/hooks/useCheckoutStore";
// import SelectedAddress from "./SelectedAddress";
// import AccodionDropDown from "../AccodionDropDown";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// // interface DataProps {
// //   addresses: IAddress[];
// // }

// const AddressSelection = () => {
//   // const [selectedAddress, setSelectedAddress] = useState<string>("");

//   // const { selectedAddressId, setSelectedAddressId } = useCheckoutStore();
//   const { addresses, selectedAddress, selectAddress, removeAddress } =
//     useCheckoutStore();

//   if (addresses.length === 0) {
//     return <div>No saved addresses. Please add one.</div>;
//   }

// const handleChange = (value: string) => {
//   setSelectedAddress(value);
// };

//   const handleDeliver = () => {
//     setSelectedAddressId(selectedAddress);
//   };

//   // useEffect(() => {
//   //   if (addresses.length > 0) {
//   //     setSelectedAddress(addresses[0]._id ?? "");
//   //   }
//   // }, [addresses]);
//   return (
//     <div className="">
//       {/* {selectedAddressId ? ( */}
//       {selectedAddress ? (
//         <div className="">
//           <SelectedAddress addresses={addresses} />
//         </div>
//       ) : (
//         <>
//           <AccodionDropDown title="Select a delivery address" count={addresses}>
//             <Card className="rounded-none shadow-none">
//               <CardHeader>
//                 <CardTitle className="font-semibold">
//                   <RadioGroup
//                     // value={selectedAddress}
//                     // onValueChange={handleChange}
//                     value={selectedAddress?.id || ""}
//                     onValueChange={(value) => {
//                       const selected = addresses.find(
//                         (address) => address._id === value
//                       );
//                       if (selected) selectAddress(selected);
//                     }}
//                   >
//                     {addresses.map((data) => (
//                       <div
//                         key={data._id}
//                         className={`p-4 rounded-md border flex gap-5 items-center ${
//                           selectedAddress === data._id
//                             ? "border-blue-500 bg-blue-50"
//                             : "border-gray-300"
//                         }`}
//                       >
//                         <RadioGroupItem
//                           value={data._id ?? ""}
//                           id={data._id}
//                           className="bg-black text-black"
//                         />
//                         <div className="flex flex-col gap-1">
//                           <h1>{data?.fullName}</h1>
//                           <p>
//                             {data?.postalCode}, {data?.state}, {data?.city},{" "}
//                             {data?.street},{data?.country}
//                           </p>
//                           <p>Phone number: {data?.phone}</p>
// <div className="mt-1">
//   <CreateAndUpdateAddressModal
//     btnText="Edit Address"
//     submitBtnTitle="Edit Address"
//     hideIcon
//     addressData={data}
//   />
// </div>
//                         </div>
//                       </div>
//                     ))}
//                   </RadioGroup>
//                 </CardTitle>
{
  /* <CardDescription>
  <div className="mt-3">
    <CreateAndUpdateAddressModal
      btnText="Add a new delivery address"
      hideIcon
    />
  </div> */
}
// </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 {selectedAddressId ? null : (
//                   <div className="py-5">
//                     <Button
//                       onClick={handleDeliver}
//                       className=" text-sm bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-full shadow"
//                     >
//                       Delivery to this address
//                     </Button>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </AccodionDropDown>
//         </>
//       )}
//     </div>
//   );
// };

import React, { useState } from "react";
import { useCheckoutStore } from "@/lib/hooks/useCheckoutStore";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CreateAndUpdateAddressModal from "../shared/CreateAndUpdateAddressModal";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import SelectedAddress from "./SelectedAddress";
import { Separator } from "../ui/separator";
import { IAddress } from "@/models/address.model";
interface DataProps {
  addresses: IAddress[];
}
function AddressSelection({ addresses }: DataProps) {
  const { setSelectedAddress, selectedAddress } = useCheckoutStore();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelectAddress = (addressId: string) => {
    setSelected(addressId);
  };

  const handleSaveAddress = () => {
    if (selected) {
      const address = addresses.find((addr) => addr._id === selected);
      if (address) {
        setSelectedAddress(address);
      }
    }
  };

  return (
    <div className="space-y-4">
      {selectedAddress ? (
        <div className="">
          <SelectedAddress addressData={selectedAddress} />
        </div>
      ) : (
        <div>
          <Card className="bg-white border-0 rounded-none">
            <CardHeader>
              <CardTitle className="font-semibold text-xl pb-4">
                Select Shipping Address
              </CardTitle>
              <Separator />
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selected || ""}
                onValueChange={handleSelectAddress}
              >
                {addresses.map((address) => (
                  <div key={address._id} className="p-3  space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={address._id || ""}
                          id={address._id}
                        />
                        <Label htmlFor={address._id}>
                          <div className="text-sm ">{address.fullName}</div>
                          <div className="text-sm ">
                            {address.street}, {address.city},{" "}
                            {address.postalCode},{address.state}
                            {address.country}
                          </div>
                        </Label>
                      </div>
                    </div>
                    <div className="mt-1 ml-4">
                      <CreateAndUpdateAddressModal
                        btnText="Edit Address"
                        submitBtnTitle="Edit Address"
                        hideIcon
                        addressData={address}
                      />
                    </div>
                  </div>
                ))}
              </RadioGroup>
              <div className="mt-3">
                <CreateAndUpdateAddressModal
                  btnText="Add a new delivery address"
                  hideIcon
                />
              </div>
              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={handleSaveAddress}
                  className=" text-sm bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-full shadow"
                >
                  Use this address
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default AddressSelection;
