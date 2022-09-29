import React, { useState, ReactNode, useContext, useEffect } from "react";
import { Token } from "@/models";
import { createContext } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { connection } from "@/constants";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { Network } from "@prisma/client";

interface ContextProps {
  network?: Network;
  transaction?: string;
  mint?: string;
  amount?: number;
  successRedirectUrl?: string;
  failRedirectUrl?: string;
  error: string | null;
  setNetwork: (network: Network) => void;
  setTransaction: (transaction: string) => void;
  setMint: (mint: string) => void;
  setAmount: (amount: number) => void;
  setSuccessRedirectUrl: (url: string) => void;
  setFailRedirectUrl: (url: string) => void;
  setError: (error: string) => void;
}

export const Context = createContext<ContextProps>({
  network: undefined,
  transaction: undefined,
  mint: undefined,
  amount: undefined,
  successRedirectUrl: undefined,
  failRedirectUrl: undefined,
  error: null,
  setNetwork: () => {},
  setTransaction: () => {},
  setMint: () => {},
  setAmount: () => {},
  setSuccessRedirectUrl: () => {},
  setFailRedirectUrl: () => {},
  setError: () => {},
});

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [network, setNetwork] = useState<Network>();
  const [transaction, setTransaction] = useState<string>();
  const [mint, setMint] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [successRedirectUrl, setSuccessRedirectUrl] = useState<string>();
  const [failRedirectUrl, setFailRedirectUrl] = useState<string>();
  const [error, setError] = useState<string | null>(null);

  const { publicKey } = useWallet();

  return (
    <Context.Provider
      value={{
        network,
        transaction,
        mint,
        amount,
        successRedirectUrl,
        failRedirectUrl,
        error,
        setNetwork,
        setTransaction,
        setMint,
        setAmount,
        setSuccessRedirectUrl,
        setFailRedirectUrl,
        setError,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCheckout = () => useContext(Context);
