import { AnchorProvider, Program } from "@project-serum/anchor";
import { IDL } from "@/constants/IDL";
import type { AnchorWallet } from "@solana/wallet-adapter-react";
import { connection, programId } from "@/constants";

export const getProgram = (wallet: AnchorWallet) => {
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  return new Program(IDL, programId, provider);
};
