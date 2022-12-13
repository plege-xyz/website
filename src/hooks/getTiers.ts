/* eslint-disable @typescript-eslint/consistent-type-imports */
import { programId } from "@/constants";
import { IdlTypes } from "@project-serum/anchor";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { GetProgramAccountsFilter, Keypair, PublicKey } from "@solana/web3.js";
import { getProgram } from "./getProgram";

export const getTiers = async (app: string) => {
  const program = getProgram(new NodeWallet(Keypair.generate()));

  const appPDA = await program.account.app.fetch(app);

  const tiers = [];
  for (let i = 1; i < appPDA.numTiers + 1; i++) {
    const [tierPDA] = findProgramAddressSync(
      [
        Buffer.from("SUBSCRIPTION_TIER"),
        new PublicKey(app).toBuffer(),
        Buffer.from([i]),
      ],
      programId
    );

    const tier = await program.account.tier.fetch(tierPDA);

    tiers.push({
      publicKey: tierPDA,
      tier: {
        ...tier,
        price: tier.price.toNumber() / 10 ** 6,
        interval: tier.interval,
      },
    });
  }

  return tiers;
};
