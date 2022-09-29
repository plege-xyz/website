import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { createTransferCheckedInstruction } from "@solana/spl-token";
import { getTokenAccount } from "./getTokenAccount";

export const splTokenTransfer = async ({
  from,
  to,
  amount,
  mint,
  decimals,
  reference,
  connection,
}: {
  from: string;
  to: string;
  amount: number;
  mint: string;
  decimals: number;
  reference: string;
  connection: Connection;
}) => {
  const _amount = await BigInt(amount * 10 ** decimals);

  const fromTokenAccount = getTokenAccount(from, mint, connection);
  const toTokenAccount = getTokenAccount(to, mint, connection);

  const transferInstruction = createTransferCheckedInstruction(
    fromTokenAccount, // source
    new PublicKey(mint), // spl token mint
    new PublicKey(toTokenAccount), // destination
    new PublicKey(from), // owner
    _amount, // amount
    decimals // decimals
  );

  transferInstruction.keys.push({
    pubkey: new PublicKey(reference),
    isSigner: false,
    isWritable: false,
  });

  const recentBlockhash = await connection.getLatestBlockhash();

  const transaction = new Transaction({
    feePayer: new PublicKey(from),
    recentBlockhash: recentBlockhash.blockhash,
  });

  transaction.add(transferInstruction);

  return transaction
    .serialize({
      requireAllSignatures: false,
    })
    .toString("base64");
};
