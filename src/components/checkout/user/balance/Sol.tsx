import { getConnection } from "@/utils/getConnection";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import image from "next/image";
import { useState, useEffect } from "react";
import { useCheckout } from "../../Context";

const Sol = () => {
  const [balance, setBalance] = useState<string | null>(null);

  const { publicKey } = useWallet();
  const { network } = useCheckout();

  const getBalance = async () => {
    const connection = getConnection(network!);
    connection.getBalance(publicKey!).then((balance) => {
      setBalance(
        (balance / LAMPORTS_PER_SOL).toLocaleString("en-US", {
          maximumFractionDigits: 2,
        })
      );
    });
  };

  useEffect(() => {
    if (network) getBalance();
  }, [network]);

  return (
    <div className="w-full h-14 bg-[#fff] dark:bg-[rgb(20,20,20)] border-[2px] gap-x-8 border-[#222] shadow-xl shadow-[rgb(10,10,10)] items-center rounded flex justify-between">
      <div className="pl-3 flex items-center">
        <img
          src="https://s2.coinmarketcap.com/static/img/coins/200x200/5426.png"
          alt=""
          className="w-8 h-w-8"
        />
        <h3 className="pl-3 shapiro text-lg">SOL</h3>
      </div>
      <div
        className={`mr-3 ${
          !balance
            ? "rounded h-8 w-16 animate-pulse bg-[rgb(30,30,30)]"
            : "shapiro text-lg text-gray-400"
        }`}
      >
        {balance}
      </div>
    </div>
  );
};

export default Sol;
