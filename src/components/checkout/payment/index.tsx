import { useWallet } from "@solana/wallet-adapter-react";
import { useCheckout } from "../Context";
import Pay from "./Pay";
import Token from "./Tokens";

const Payment = () => {
  const { error } = useCheckout();

  return (
    <div className="bg-[#111] flex flex-col items-center justify-center">
      {!error ? (
        <div className="flex flex-col items-center justify-center">
          <Token />
          <Pay />
        </div>
      ) : (
        <div className="space">{error}</div>
      )}
    </div>
  );
};

export default Payment;
