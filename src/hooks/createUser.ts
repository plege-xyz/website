import type {
  AnchorWallet,
  WalletContextState,
} from "@solana/wallet-adapter-react";
import { confirmTransaction } from "./confirmTransaction";
import { getProgram } from "./getProgram";

export const createUser = async (
  user: AnchorWallet,
  sendTransaction: WalletContextState["sendTransaction"]
) => {
  const program = getProgram(user);

  const transaction = await program.methods
    .createUser()
    .accounts({
      auth: user.publicKey,
    })
    .transaction();

  return await confirmTransaction(transaction, sendTransaction);
};
