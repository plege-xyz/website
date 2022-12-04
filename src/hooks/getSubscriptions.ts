import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { GetProgramAccountsFilter, Keypair } from "@solana/web3.js";
import { getProgram } from "./getProgram";

export const getSubscriptions = async (app: string) => {
  const program = getProgram(new NodeWallet(Keypair.generate()));

//   const filter: GetProgramAccountsFilter = {
//     memcmp: {
//       bytes: app,
//     },
//   };

  return await program.account.subscription.all();
};
