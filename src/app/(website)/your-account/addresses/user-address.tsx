import AddressCard from "@/components/checkout/AddressCard";
import { getAllUserAddresses } from "@/lib/actions/address.actions";
import { IAddress } from "@/models/address.model";
import React from "react";
const UserAddress = async () => {
  const addresses: IAddress[] = await getAllUserAddresses();
  console.log("addresses :", addresses);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
      {addresses?.length > 0
        ? addresses?.map((data) => (
            <AddressCard key={data?._id as string} addressData={data} />
          ))
        : null}
    </div>
  );
};

export default UserAddress;
