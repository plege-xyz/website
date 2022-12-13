/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from "react";
import { overpass } from "@/utils/fonts";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import Wallet from "../../../wallet";
import { createApp } from "@/hooks/createApp";
import toast from "react-hot-toast";
import Loader from "../../../Loader";
import { createTier } from "@/hooks/createTier";
import { useRouter } from "next/router";

const CreateTierModal = ({
  refresh,
  closeCreateTierModal,
}: {
  refresh: () => void;
  closeCreateTierModal: () => void;
}) => {
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [interval, setInterval] = useState<"month" | "year">("month");
  const [isLoading, setIsLoading] = useState(false);

  const wallet = useAnchorWallet();
  const { sendTransaction } = useWallet();

  const router = useRouter();
  const app = router.query.app as string;

  const createTierHandler = async () => {
    if (!name) return toast.error("Enter a name for your app");
    if (!price) return toast.error("Enter a price for your app");
    if (price < 0) return toast.error("Price cannot be negative");
    if (!wallet) return toast.error("Connect your wallet");

    setIsLoading(true);
    await createTier(app, name, price, interval, wallet, sendTransaction)
      .then(() => {
        setIsLoading(false);
        closeCreateTierModal();
        refresh();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        toast.error("Failed to create app");
      });
  };

  const setNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const setPriceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  console.log(interval);

  return (
    <div className="absolute inset-0 flex min-h-[calc(100vh-7rem)] w-full items-center justify-center bg-[rgba(0,0,0,0.7)]">
      <div className="w-full max-w-sm">
        <div className="w-full rounded-lg border border-[#111] bg-[rgba(5,5,5)] p-5">
          <input
            type="text"
            placeholder="name"
            className={`mb-5 h-10 w-full rounded bg-[#222] px-3 outline-none ${overpass}`}
            onChange={setNameHandler}
          />
          <input
            type="number"
            placeholder="price (USDC)"
            className={`mb-5 h-10 w-full rounded bg-[#222] px-3 outline-none ${overpass}`}
            onChange={setPriceHandler}
          />

          <div className={`${overpass} -mt-2 mb-3 ml-1 text-xs`}>interval</div>
          <select
            name=""
            id=""
            className={`mb-5 -mt-1.5 h-10 w-full rounded bg-[#222] ${overpass} pl-3 outline-none`}
            onChange={(e) => setInterval(e.target.value as "month" | "year")}
          >
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>

          {!wallet ? (
            <Wallet
              style={{
                height: "2.5rem",
                fontSize: "0.75rem",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          ) : (
            <button
              className={`h-10 w-full rounded bg-white ${overpass} flex items-center justify-center pt-1 text-sm text-black`}
              onClick={createTierHandler}
            >
              {!isLoading ? (
                "Create Tier"
              ) : (
                <Loader className="-mt-1 h-5 w-5 text-black" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTierModal;
