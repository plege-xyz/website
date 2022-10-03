import React, { useState, ReactNode, useContext, useEffect } from "react";
import { createContext } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Network } from "@prisma/client";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";

export interface Token {
  symbol: string;
  image: string;
  mint: string;
  amount: number;
  balance?: number;
}

interface ContextProps {
  network?: Network;
  tokens?: Token[];
  transaction?: string;
  returnUrl?: string;
  error: string | null;
  setTransaction: (transaction: string) => void;
  setError: (error: string) => void;
  setTokens: (tokens: Token[]) => void;
}

export const Context = createContext<ContextProps>({
  network: undefined,
  transaction: undefined,
  tokens: undefined,
  returnUrl: undefined,
  error: null,
  setTransaction: () => {},
  setError: () => {},
  setTokens: () => {},
});

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [network, setNetwork] = useState<Network>();
  const [transaction, setTransaction] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const [tokens, setTokens] = useState<Token[]>();
  const [returnUrl, setReturnUrl] = useState<string>();

  const { publicKey } = useWallet();

  const router = useRouter();
  const id = router.query.id as string;

  const { mutate: getSession } = trpc.sessions.get.useMutation({
    onSuccess(data) {
      setNetwork(data.transfer!.network);
      setReturnUrl(data.returnUrl);

      setTokens([
        {
          symbol: data.transfer!.token.symbol,
          image: data.transfer!.token.image,
          mint: data.transfer!.token.mint,
          amount: data.transfer!.amount,
        },
      ]);
    },
    onError(error) {
      setError(error.message);
    },
  });

  const { mutate: getTransaction, data } = trpc.sessions.create.useMutation({
    onSuccess(data) {
      setTransaction(data.transaction);
    },
    onError(error) {
      setError(error.message);
    },
  });

  useEffect(() => {
    if (id) {
      getSession({
        id,
      });
    }
  }, [id]);

  useEffect(() => {
    if (publicKey) {
      getTransaction({
        id,
        payer: publicKey.toString(),
      });
    }
  }, [publicKey]);

  return (
    <Context.Provider
      value={{
        network,
        transaction,
        tokens,
        returnUrl,
        error,
        setTransaction,
        setError,
        setTokens,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCheckout = () => useContext(Context);
