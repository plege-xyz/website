/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from "react";
import { overpass } from "@/utils/fonts";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import Wallet from "../wallet";
import { createApp } from "@/hooks/createApp";
import toast from "react-hot-toast";
import Loader from "../Loader";

const CreateAppModal = ({
  refresh,
  closeCreateAppModal,
}: {
  refresh: () => void;
  closeCreateAppModal: () => void;
}) => {
  const [name, setName] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const wallet = useAnchorWallet();
  const { sendTransaction } = useWallet();

  const createAppHandler = async () => {
    if (!name) return toast.error("Enter a name for your app");
    setIsLoading(true);
    await createApp(name, wallet!, sendTransaction)
      .then(() => {
        setIsLoading(false);
        closeCreateAppModal();
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

  return (
    <div className="absolute flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-[rgba(0,0,0,0.7)]">
      <div className="w-full max-w-sm">
        <div className="w-full rounded-lg border border-[#111] bg-[rgba(5,5,5)] p-5">
          <input
            type="text"
            placeholder="name"
            className={`mb-5 h-10 w-full rounded bg-[#222] px-3 outline-none ${overpass}`}
            onChange={setNameHandler}
          />
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
