import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { Keypair } from "@solana/web3.js";
import { getProgram } from "./getProgram";

export const getTier = async (tier: string) => {
  const program = getProgram(new NodeWallet(Keypair.generate()));

  const _tier = await program.account.tier.fetch(tier);
  const app = await program.account.app.fetch(_tier.app);
  return {
    tier: {
      ..._tier,
      price: _tier.price.toNumber(),
      app: _tier.app.toString(),
    },
    app: {
      auth: app.auth.toString(),
      name: app.name,
    },
  };
};
