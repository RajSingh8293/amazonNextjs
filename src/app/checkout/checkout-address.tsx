import AddressSelection from "@/components/checkout/AddressSelection";
import { getAllUserAddresses } from "@/lib/actions/address.actions";
import { IAddress } from "@/models/address.model";

const CheckoutAddress = async () => {
  const addresses: IAddress[] = await getAllUserAddresses();
  return (
    <div>
      {" "}
      <AddressSelection addresses={addresses} />
    </div>
  );
};

export default CheckoutAddress;
