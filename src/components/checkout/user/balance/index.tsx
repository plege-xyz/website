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
  const { tokens } = useCheckout();

  return (
    <div className="w-full flex flex-col items-center">
      {tokens && (
        <div className="w-max py-5 flex flex-col items-center gap-y-3">
          <Sol />
          {tokens?.map((token, key) => {
            // render multiple tokens with the same mint as one token
            const tokenIndex = tokens.findIndex((t) => t.mint === token.mint);
            if (tokenIndex !== key) return null;

            return (
              <Token
                key={key}
                image={token.image}
                symbol={token.symbol}
                mint={token.mint}
              />
            );
          })}
        </div>
      )}
      <Wallet />
    </div>
  );
};

export default Balance;
