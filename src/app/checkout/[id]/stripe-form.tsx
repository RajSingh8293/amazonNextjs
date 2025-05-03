import ProductPrice from "@/components/shared/product/ProductPrice";
import { Button } from "@/components/ui/button";
import {
  PaymentElement,
  useStripe,
  useElements,
  //   LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
const StripeForm = ({
  priceInCents,
  orderId,
}: {
  priceInCents: number;
  orderId: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  //   const [email, setEmail] = useState<string>();

  //   async function handleSubmit(e: FormEvent) {
  //     e.preventDefault();
  //     // if (stripe == null || elements == null || email == null) return;
  //     if (stripe == null || elements == null) return;

  //     setLoading(true);
  //     stripe
  //       .confirmPayment({
  //         elements,
  //         confirmParams: {
  //           return_url: `${process.env.NEXTAUTH_URL}/checkout/${orderId}/stripe-payment-success`,
  //         },
  //       })
  //       .then(({ error }) => {
  //         if (error.type === "card_error" || error.type === "validation_error") {
  //           setErrorMessage(error.message);
  //         } else {
  //           setErrorMessage("An unknown error occured");
  //         }
  //       })
  //       .finally(() => setLoading(false));
  //   }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXTAUTH_URL}/checkout/${orderId}/stripe-payment-success`,
      },
    });

    if (result.error) {
      setErrorMessage(result.error.message || "Payment failed");
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="text-xl">Stripe Checkout</div>
      {errorMessage && <div className="text-destructive">{errorMessage}</div>}
      <PaymentElement />
      {/* <div>
        <LinkAuthenticationElement onChange={(e) => setEmail(e.value.email)} />
      </div> */}
      <Button
        className="w-full"
        size="lg"
        disabled={stripe == null || elements == null || isLoading}
      >
        {isLoading ? (
          "Purchasing..."
        ) : (
          <div>
            Purchase - <ProductPrice price={priceInCents / 100} plain />
          </div>
        )}
      </Button>
    </form>
  );
};

export default StripeForm;
