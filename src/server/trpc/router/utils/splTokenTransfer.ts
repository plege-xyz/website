import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { createTransferCheckedInstruction } from "@solana/spl-token";
import { getTokenAccount } from "./getTokenAccount";
import { TRPCError } from "@trpc/server";
import { getConnection } from "@/utils/getConnection";
import { Network } from "@prisma/client";

export const splTokenTransfer = async ({
  payer,
  transfers,
}: {
  payer: string;
  transfers: {
    network: Network;
    recipient: string;
    referencePublicKey: string;
    amount: number;
    token: {
      mint: string;
      decimals: number;
    };
  }[];
}) => {
  const connection = getConnection(transfers[0]!.network);
  const recentBlockhash = await connection.getLatestBlockhash();
  let transaction = new Transaction({
    feePayer: new PublicKey(payer),
    recentBlockhash: recentBlockhash.blockhash,
  });

  for await (const transfer of transfers) {
    const amount =
      (await BigInt(transfer.amount)) * BigInt(10 ** transfer.token.decimals);
    const payerTokenAccount = await getTokenAccount(
      payer,
      transfer.token.mint,
      connection
    );
    const recipientTokenAccount = await getTokenAccount(
      transfer.recipient,
      transfer.token.mint,
      connection
    );

    if (!payerTokenAccount) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Payer token account not initialized",
      });
    }

    if (!recipientTokenAccount) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Recipient token account not initialized",
      });
    }

    const transferInstruction = createTransferCheckedInstruction(
      new PublicKey(payerTokenAccount),
      new PublicKey(transfer.token.mint),
      new PublicKey(recipientTokenAccount),
      new PublicKey(payer),
      amount,
      transfer.token.decimals
    );

    transferInstruction.keys.push({
      pubkey: new PublicKey(transfer.referencePublicKey),
      isSigner: false,
      isWritable: false,
    });

    transaction.add(transferInstruction);
  }

  console.log(transaction);

  return transaction
    .serialize({
      requireAllSignatures: false,
    })
    .toString("base64");
};
