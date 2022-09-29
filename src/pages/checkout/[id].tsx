import { CheckoutProvider } from "@/components/checkout/Context";
import Checkout from "@/components/checkout";

export default function () {
  return (
    <div className="dark">
      <CheckoutProvider>
        <Checkout />
      </CheckoutProvider>
    </div>
  );
}
