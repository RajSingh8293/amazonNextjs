import PaymentOptions from "@/components/checkout/PaymentOptions";
import ProductSummary from "@/components/checkout/ProductSummary";
import CheckoutCard from "@/components/checkout/CheckoutCard";
import { getAllUserAddresses } from "@/lib/actions/address.actions";
import AddressSelection from "@/components/checkout/AddressSelection";
import { IAddress } from "@/models/address.model";
import CheckoutFooter from "./checkout-footer";

const CheckoutForm = async () => {
  const addresses: IAddress[] = await getAllUserAddresses();
  return (
    <div className="text-black min-h-[100vh] bg-gray-100 px-5 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-9">
          <AddressSelection addresses={addresses} />

          <div className="my-3">
            <PaymentOptions />
          </div>
          <div className="my-3">
            <ProductSummary />
          </div>
          <div>
            <CheckoutFooter />
          </div>
        </div>
        <div className="w-full lg:col-span-3 ">
          <div className="w-full lg:sticky  top-5">
            <CheckoutCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
