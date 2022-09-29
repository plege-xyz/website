import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCheckout } from "../Context";

const Token = () => {
  const { mint, amount } = useCheckout();

  const [token, setToken] = useState<{
    address: string;
    symbol: string;
    logoURI: string;
  } | null>(null);

  const { mutate: getToken } = useMutation(["getTokenMetadata"], async () => {
    await axios
      .post("https://token-list-api.solana.cloud/v1/mints", {
        addresses: [mint],
      })
      .then((res) => {
        const data = res.data.content;
        const token: {
          address: string;
          symbol: string;
          logoURI: string;
        } | null = !data
          ? null
          : data.map((token: any) => {
              return {
                address: token.address,
                symbol: token.symbol,
                logoURI: token.logoURI,
              };
            })[0];

        setToken(token);
      });
  });

  useEffect(() => {
    if (mint) {
      getToken();
    }
  }, [mint]);

  return (
    <div className="w-full h-14 bg-[#fff] dark:bg-[rgb(20,20,20)] border-[2px] gap-x-8 border-[#222] shadow-xl shadow-[rgb(10,10,10)] items-center rounded flex justify-between">
      <div className="pl-3 flex items-center">
        {token?.logoURI ? (
          <img src={token?.logoURI} alt="" className="w-8 h-w-8" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[rgb(30,30,30)] animate-pulse"></div>
        )}
        {token?.symbol ? (
          <h3 className="pl-3 shapiro text-lg">{token?.symbol}</h3>
        ) : (
          <div className="ml-3 w-16 h-6 rounded bg-[rgb(30,30,30)] animate-pulse"></div>
        )}
      </div>
      <div
        className={`mr-3 ${
          !amount
            ? "rounded h-6 w-16 animate-pulse bg-[rgb(30,30,30)]"
            : "shapiro text-lg text-gray-400"
        }`}
      >
        {amount}
      </div>
    </div>
  );
};

export default Token;
