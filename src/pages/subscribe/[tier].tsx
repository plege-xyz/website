/* eslint-disable @next/next/no-img-element */
import Loader from "@/components/Loader";
import Wallet from "@/components/wallet";
import { overpass, tt } from "@/utils/fonts";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import toast from "react-hot-toast";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Plege } from "@/utils/plege";
import { FakeWallet } from "plege";
import type { Tier, App } from "plege";

const Subscribe = () => {
  const [data, setData] = useState<{ tier: Tier; app: App }>();

  const router = useRouter();
  const tier = router.query.tier as string;

  const wallet = useAnchorWallet();

  const [status, setStatus] = useState<"PENDING" | "SUCCESS">();

  useEffect(() => {
    if (tier) {
      const getTier = async () => {
        const _tier = await Plege(FakeWallet).tier.get({
          publicKey: new PublicKey(tier),
        });

        const app = await Plege(FakeWallet).app.get({
          publicKey: new PublicKey(_tier.app),
        });

        setData({
          app,
          tier: _tier,
        });
      };

      getTier();
    }
  }, [tier]);

  const subscribe = async () => {
    try {
      if (!wallet || !data) return;
      setStatus("PENDING");

      await Plege(wallet).subscription.create({
        tier: tier,
      });
      setStatus("SUCCESS");
    } catch (err) {
      console.log(err);
      setStatus(undefined);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="h-screen w-full bg-black">
      {!data && (
        <div
          className={`flex h-full w-full items-center justify-center text-white ${overpass}`}
        >
          {!data ? <Loader className="h-10 w-10 text-white" /> : "Not Found"}
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
                        {data.tier.price}
                      </div>
                    </div>
                    <div className="mr-4 mt-1 text-lg">/ month</div>
                  </div>
                  {!wallet ? (
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
                charge you {data.tier.price} USDC every month. You can always
                cancel your subscription.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscribe;
