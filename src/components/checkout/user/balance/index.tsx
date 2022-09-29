import { useEffect, useState } from "react";
import Wallet from "@/components/wallet";
import { useCheckout } from "../../Context";
import { getConnection } from "@/utils/getConnection";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Token from "./Token";
import Sol from "./Sol";
import { trpc } from "@/utils/trpc";

const Balance = () => {
  const [tokens, setTokens] = useState<
    | {
        address: string;
        symbol: string;
        logoURI: string;
      }[]
    | null
  >();
  const { mint } = useCheckout();

  const { mutate } = useMutation(["getTokenMetadata"], async () => {
    await axios
      .post("https://token-list-api.solana.cloud/v1/mints", {
        addresses: [mint],
      })
      .then((res) => {
        const data = res.data.content;
        const tokens:
          | {
              address: string;
              symbol: string;
              logoURI: string;
            }[]
          | null = !data
          ? null
          : data.map((token: any) => {
              return {
                address: token.address,
                symbol: token.symbol,
                logoURI: token.logoURI,
              };
            });

        setTokens(tokens);
      });
  });

  useEffect(() => {
    if (mint) {
      mutate();
    }
  }, [mint]);

  return (
    <div className="w-full flex flex-col items-center">
      {tokens && (
        <div className="w-max py-5 flex flex-col items-center gap-y-3">
          <Sol />
          {tokens?.map((token, key) => (
            <Token
              key={key}
              image={token.logoURI}
              symbol={token.symbol}
              mint={token.address}
            />
          ))}
        </div>
      )}
      <Wallet />
    </div>
  );
};

export default Balance;
