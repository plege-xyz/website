import { connection } from "@/constants";
import { getConnection } from "@/utils/getConnection";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCheckout } from "../../Context";

const Token = ({
  image,
  symbol,
  mint,
}: {
  image: string;
  symbol: string;
  mint: string;
}) => {
  const [balance, setBalance] = useState<string | null>(null);

  const { publicKey } = useWallet();
  const { network } = useCheckout();

  const getBalance = async () => {
    const associatedTokenAddress = await getAssociatedTokenAddress(
      new PublicKey(mint),
      publicKey!
    );
    console.log(associatedTokenAddress);
    const connection = getConnection(network!);
    await connection
      .getTokenAccountBalance(associatedTokenAddress)
      .then((balance) => {
        setBalance(
          balance.value.uiAmount === null
            ? "0"
            : balance.value.uiAmount.toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })
        );
      })
      .catch(() => {
        setBalance("0");
        toast.error(`Insufficient ${symbol} token balance`);
      });
  };

  useEffect(() => {
    if (network) getBalance();
  }, [network]);

  return (
    <div className="min-w-[20rem] w-full h-14 bg-[#fff] dark:bg-[rgb(20,20,20)] border-[2px] gap-x-8 border-[#222] shadow-xl shadow-[rgb(10,10,10)] items-center rounded flex justify-between">
      <div className="pl-3 flex items-center">
        <img src={image} alt="" className="w-8 h-w-8" />
        <h3 className="pl-3 shapiro text-lg">{symbol}</h3>
      </div>
      <div
        className={`mr-3 ${
          !balance
            ? "rounded h-6 w-16 animate-pulse bg-[rgb(30,30,30)]"
            : "shapiro text-lg text-gray-400"
        }`}
      >
        {balance}
      </div>
    </div>
  );
};

export default Token;
