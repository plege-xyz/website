import { connection } from "@/constants";
import type { WalletContextState } from "@solana/wallet-adapter-react";
import type { Transaction } from "@solana/web3.js";

export const confirmTransaction = async (
  tx: Transaction,
  sendTransaction: WalletContextState["sendTransaction"]
) => {
  const latestBlockHash = await connection.getLatestBlockhash();

  const signature = await sendTransaction(tx, connection);

  return await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature,
  });
};
