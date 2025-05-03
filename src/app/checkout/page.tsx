import { requireAuthSession } from "@/lib/auth/requireAuthSession";
import CheckoutForm from "./checkout-form";

const Checkout = async () => {
  await requireAuthSession();
  return (
    <div className="text-black min-h-[100vh] bg-gray-100 px-5 py-8">
      <CheckoutForm />
    </div>
  );
};

export default Checkout;
