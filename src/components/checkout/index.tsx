import { trpc } from "@/utils/trpc";
import { Network } from "@prisma/client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCheckout } from "./Context";
import Payment from "./payment";
import User from "./user";

const Checkout = () => {
  return (
    <div className="w-screen h-screen grid grid-cols-2">
      <User />
      <Payment />
    </div>
  );
};

export default Checkout;
