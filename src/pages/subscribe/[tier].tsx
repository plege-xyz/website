/* eslint-disable @next/next/no-img-element */
import Loader from "@/components/Loader";
import Wallet from "@/components/wallet";
import { getProgram } from "@/hooks/getProgram";
import { overpass, space, space_bold, tt } from "@/utils/fonts";
import { trpc } from "@/utils/trpc";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAccount, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { connection, programId, USDC_MINT } from "@/constants";
import { PublicKey, Transaction } from "@solana/web3.js";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { confirmTransaction } from "@/hooks/confirmTransaction";
import toast from "react-hot-toast";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const Subscribe = () => {
  const router = useRouter();
  const tier = router.query.tier as string;

  const { mutate, data, isLoading, error } = trpc.tiers.get.useMutation();
  const { publicKey, sendTransaction } = useWallet();
  const wallet = useAnchorWallet();

  const [status, setStatus] = useState<"PENDING" | "SUCCESS">();

  useEffect(() => {
    if (tier) {
      mutate({
        tier,
      });
    }
  }, [tier, mutate]);

  const subscribe = async () => {
    try {
      if (!wallet || !publicKey || !data) return;
      setStatus("PENDING");
      const program = getProgram(wallet);

      const subscriberAta = getAssociatedTokenAddressSync(
        new PublicKey(USDC_MINT),
        publicKey
      );

      const destination = getAssociatedTokenAddressSync(
        new PublicKey(USDC_MINT),
        new PublicKey(data.app.treasury)
      );

      console.log(data.app.treasury);
      console.log(destination.toString());

      const [subscription] = findProgramAddressSync(
        [
          Buffer.from("SUBSCRIPTION"),
          new PublicKey(data.tier.app).toBuffer(),
          publicKey.toBuffer(),
        ],
        programId
      );

      const THREAD_PROGRAM = new PublicKey(
        "3XXuUFfweXBwFgFfYaejLvZE4cGZiHgKiGfMtdxNzYmv"
      );
      const [thread] = findProgramAddressSync(
        [
          Buffer.from("thread"),
          subscription.toBuffer(),
          Buffer.from("subscriber_thread"),
        ],
        THREAD_PROGRAM
      );

      const subscribeInstruction = await program.methods
        .createSubscription()
        .accounts({
          threadProgram: THREAD_PROGRAM,
          subscriptionThread: thread,
          app: data.tier.app,
          tier: tier,
          subscriber: publicKey,
          subscriberAta,
          subscription,
        })
        .instruction();

      const payInstruction = await program.methods
        .completePayment()
        .accounts({
          app: data.tier.app,
          tier: tier,
          destination,
          subscriptionThread: thread,
          subscriberAta,
          subscription,
        })
        .instruction();

      const transaction = new Transaction()
        .add(subscribeInstruction)
        .add(payInstruction);

      await confirmTransaction(transaction, sendTransaction);
      setStatus("SUCCESS");
    } catch (err) {
      console.log(err);
      setStatus(undefined);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="h-screen w-full bg-black">
      {(isLoading || error) && (
        <div
          className={`flex h-full w-full items-center justify-center text-white ${overpass}`}
        >
          {isLoading ? (
            <Loader className="h-10 w-10 text-white" />
          ) : (
            "Not Found"
          )}
        </div>
      )}
      {data && (
        <div
          className={`text-white ${overpass} grid h-full w-full grid-cols-1`}
        >
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="relative flex h-full w-full max-w-xs flex-col items-center justify-center">
              {status !== "SUCCESS" ? (
                <>
                  <div className={`text-center ${tt} absolute -mt-80 text-4xl`}>
                    {data.app.name}
                  </div>

                  <div className="mb-3 flex h-12 w-full items-center justify-between rounded border border-[#222] bg-[rgb(5,5,5)] px-4">
                    {data.tier.name}
                  </div>
                  <div className="mb-3 flex h-12 w-full items-center justify-between rounded border border-[#222] bg-[rgb(5,5,5)]">
                    <div className="flex items-center">
                      <img
                        src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png"
                        alt=""
                        className="ml-2.5 h-7 w-7"
                      />
                      <div className="mt-1.5 ml-3 text-xl">
                        {data.tier.price / 10 ** 6}
                      </div>
                    </div>
                    <div className="mr-4 mt-1 text-lg">/ month</div>
                  </div>
                  {!publicKey ? (
                    <Wallet
                      style={{
                        width: "100%",
                        height: "3rem",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    />
                  ) : (
                    <button
                      className="flex h-12 w-full items-center justify-center rounded bg-white text-black"
                      onClick={subscribe}
                    >
                      {status === "PENDING" ? (
                        <Loader className="h-5 w-5 text-black" />
                      ) : (
                        "Subscribe"
                      )}
                    </button>
                  )}
                </>
              ) : (
                <div>
                  <CheckCircleIcon className="h-14 w-14 text-white" />
                </div>
              )}
              <div className="absolute bottom-10 text-center text-xs text-gray-400">
                By confirming your subscription, you allow {data.app.name} to
                charge you {data.tier.price / 10 ** 6} USDC every month. You can
                always cancel your subscription.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscribe;
