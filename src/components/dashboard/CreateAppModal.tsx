/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from "react";
import { overpass } from "@/utils/fonts";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import Wallet from "../wallet";
import toast from "react-hot-toast";
import Loader from "../Loader";
import { Plege } from "@/utils/plege";
import { PublicKey } from "@solana/web3.js";

const CreateAppModal = ({
  refresh,
  closeCreateAppModal,
}: {
  refresh: () => void;
  closeCreateAppModal: () => void;
}) => {
  const [name, setName] = useState<string>();
  const [treasury, setTreasury] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const wallet = useAnchorWallet();

  const { wallet: w } = useWallet();

  // useEffect(() => {
  //   if (wallet && !treasury) {
  //     setTreasury(wallet.publicKey.toBase58());
  //   }
  // }, [wallet]);

  const createAppHandler = async () => {
    try {
      if (!name) return toast.error("Enter a name for your app");
      setIsLoading(true);

      await Plege(wallet!).app.create({
        name,
        treasury: new PublicKey(treasury!),
      });

      closeCreateAppModal();
      refresh();
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      toast.error("Failed to create app");
    }
  };

  const setNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const setTreasuryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTreasury(e.target.value);
  };

  const autoFillTreasury = () => {
    setTreasury(wallet!.publicKey.toBase58());
  };

  return (
    <div className="absolute flex h-screen w-full items-center justify-center overflow-hidden bg-[rgba(0,0,0,0.7)]">
      <div className="w-full max-w-sm">
        <div className="w-full rounded-lg border border-[#111] bg-[rgba(5,5,5)] p-5">
          <input
            type="text"
            placeholder="name"
            className={`mb-5 h-10 w-full rounded bg-[#222] px-3 outline-none ${overpass}`}
            onChange={setNameHandler}
          />
          <div className="flex">
            <input
              type="text"
              placeholder="treasury"
              className={`h-10 flex-grow rounded bg-[#222] px-3 outline-none ${overpass}`}
              value={treasury}
              onChange={setTreasuryHandler}
            />
            {w && (
              <button
                className="ml-2 flex h-10 w-10 items-center justify-center rounded bg-[#222] p-2"
                onClick={autoFillTreasury}
              >
                <img src={w.adapter.icon} alt="" />
              </button>
            )}
          </div>
          <div className={`mb-3 mt-2 text-xs ${overpass}`}>
            funds received from subscriptions are sent to the treasury wallet
          </div>
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
              onClick={createAppHandler}
            >
              {!isLoading ? (
                "Create App"
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

export default CreateAppModal;
