import { trpc } from "@/utils/trpc";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useCheckout } from "../Context";
import Pay from "./Pay";
import Token from "./Token";

const Payment = () => {
  const { error } = useCheckout();
  const { publicKey } = useWallet();

  const router = useRouter();
  const id = router.query.id as string;

  const { setTransaction, setSuccessRedirectUrl, setError } = useCheckout();

  const { mutate } = trpc.transfer.create.useMutation({
    onSuccess: (data) => {
      setTransaction(data.transaction);
      setSuccessRedirectUrl(data.returnUrl);
    },

    onError: (error) => {
      if (error.data?.code === "NOT_FOUND") {
        setError("Transaction not found");
      } else if (error.message === "Transfer already created") {
        setError("Transaction already created");
      } else {
        setError("An error occurred");
      }
    },
  });

  useEffect(() => {
    if (id && publicKey) {
      mutate({
        transactionId: id,
        fromPublicKey: publicKey!.toString(),
      });
    }
  }, [id, publicKey]);

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
