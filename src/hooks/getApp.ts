import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { Keypair, PublicKey } from "@solana/web3.js";
import { getProgram } from "./getProgram";

export const getApp = async (app: string) => {
  const program = getProgram(new NodeWallet(Keypair.generate()));

  return await program.account.app
    .fetch(new PublicKey(app))
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};
