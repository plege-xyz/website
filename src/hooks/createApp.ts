import { connection, programId, USDC_MINT } from "@/constants";
import type { AnchorWallet } from "@solana/wallet-adapter-react";
import { getProgram } from "./getProgram";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import type { WalletAdapterProps } from "@solana/wallet-adapter-base";
import { confirmTransaction } from "./confirmTransaction";

export const createApp = async (
  name: string,
  wallet: AnchorWallet,
  sendTransaction: WalletAdapterProps["sendTransaction"]
) => {
  const program = getProgram(wallet);

  const [userPDAPublicKey] = findProgramAddressSync(
    [Buffer.from("USER_META"), wallet.publicKey.toBuffer()],
    programId
  );

  const userPDA = await program.account.userMeta.fetch(userPDAPublicKey);
  const [app] = findProgramAddressSync(
    [
      Buffer.from("APP"),
      wallet.publicKey.toBuffer(),
      Buffer.from([userPDA.numApps + 1]),
    ],
    programId
  );

  const transaction = await program.methods
    .createApp(userPDA.numApps + 1, name)
    .accounts({
      app,
      userMeta: userPDAPublicKey,
      treasury: wallet.publicKey,
      mint: USDC_MINT,
    })
    .transaction();

  return await confirmTransaction(transaction, sendTransaction);
};
