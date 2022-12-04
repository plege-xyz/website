import { programId } from "@/constants";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import type { PublicKey } from "@solana/web3.js";
import { Keypair } from "@solana/web3.js";
import { getProgram } from "./getProgram";

export const getApps = async (publicKey: PublicKey) => {
  const program = getProgram(new NodeWallet(Keypair.generate()));

  const [userPDA] = findProgramAddressSync(
    [Buffer.from("USER_META"), publicKey.toBuffer()],
    programId
  );
  const user = await program.account.userMeta.fetch(userPDA);
  const apps = [];
  for (let i = 1; i < user.numApps + 1; i++) {
    const [appPDA] = findProgramAddressSync(
      [Buffer.from("APP"), publicKey.toBuffer(), Buffer.from([i])],
      programId
    );
    const app = await program.account.app.fetch(appPDA);
    apps.push({ publicKey: appPDA, data: app });
  }

  return apps;
};
