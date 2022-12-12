import { programId } from "@/constants";
import { BN } from "@project-serum/anchor";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import type { WalletAdapterProps } from "@solana/wallet-adapter-base";
import type { AnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { confirmTransaction } from "./confirmTransaction";
import { getProgram } from "./getProgram";

export const createTier = async (
  app: string,
  name: string,
  price: number,
  wallet: AnchorWallet,
  sendTransaction: WalletAdapterProps["sendTransaction"]
) => {
  const program = getProgram(wallet);

  const appPDA = await program.account.app.fetch(app);
  const [tierPDA] = findProgramAddressSync(
    [
      Buffer.from("SUBSCRIPTION_TIER"),
      new PublicKey(app).toBuffer(),
      Buffer.from([appPDA.numTiers + 1]),
    ],
    programId
  );

  const transaction = await program.methods

    .createTier(appPDA.numTiers + 1, name, new BN(price * 10 ** 6), {
      month: {},
    })
    .accounts({
      app: app,
      tier: tierPDA,
    })
    .transaction();

  return await confirmTransaction(transaction, sendTransaction);
};
