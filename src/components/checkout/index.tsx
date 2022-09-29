import { trpc } from "@/utils/trpc";
import { Network } from "@prisma/client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCheckout } from "./Context";
import Payment from "./payment";
import User from "./user";

const Checkout = () => {
  const { setError, setNetwork, setMint, setAmount } = useCheckout();

  const { mutate, error } = trpc.transfer.get.useMutation({
    onError: (error) => {
      if (error.data?.code === "NOT_FOUND") {
        setError("Transaction not found");
      } else if (error.message === "Transfer already created") {
        setError("Transaction already created");
      } else {
        setError("An error occurred");
      }
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.transaction) {
        setError("Transaction already paid for");
      } else {
        setNetwork(data.network);
        setMint(data.mint);
        setAmount(data.amount);
      }
    },
  });

  const router = useRouter();
  const id = router.query.id as string;

  useEffect(() => {
    if (id) {
      mutate({
        id,
      });
    }
  }, [id]);

  return (
    <div className="w-screen h-screen grid grid-cols-2">
      <User />
      <Payment />
    </div>
  );
};

export default Checkout;
