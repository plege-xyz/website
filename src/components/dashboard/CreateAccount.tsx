/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { overpass } from "@/utils/fonts";
import { Plege } from "@/utils/plege";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../Loader";

const CreateAccount = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const wallet = useAnchorWallet();

  const createAccount = async () => {
    await Plege(wallet!)
      .user.create()
      .then(() => {
        setIsLoading(true);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occoured");
        setIsLoading(false);
      });
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center">
      {!isLoading ? (
        <button
          className={`${overpass} h-12 rounded bg-white px-6 text-center font-bold text-black`}
          onClick={createAccount}
        >
          Create Account
        </button>
      ) : (
        <Loader className="h-12 w-12" />
      )}
    </div>
  );
};

export default CreateAccount;
