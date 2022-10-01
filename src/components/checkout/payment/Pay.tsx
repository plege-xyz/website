import Loader from "@/components/Loader";
import Wallet from "@/components/wallet";
import { getConnection } from "@/utils/getConnection";
import { trpc } from "@/utils/trpc";
import { useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCheckout } from "../Context";

const Pay = () => {
  const [status, setStatus] = useState<"PENDING" | null>(null);

  const { signTransaction, publicKey } = useWallet();
  const { transaction, network, setError, returnUrl } = useCheckout();

  const router = useRouter();
  const id = router.query.id as string;

  const { mutate: settle } = trpc.sessions.settle.useMutation({
    onSuccess: async (data) => {
      const connection = getConnection(network!);
      await connection.confirmTransaction(
        {
          signature: data.hash,
          blockhash: Transaction.from(Buffer.from(transaction!, "base64"))
            .recentBlockhash!,
          lastValidBlockHeight: await (
            await connection.getLatestBlockhash()
          ).lastValidBlockHeight,
        },
        "finalized"
      );
      router.push(returnUrl!);
    },
    onError(error) {
      setError(error.message);
    },
  });

  const pay = async () => {
    if (!publicKey || !transaction || !network) return;

    try {
      setStatus("PENDING");
      const tx = Transaction.from(Buffer.from(transaction, "base64"));
      if (signTransaction) {
        const signed = await signTransaction(tx);
        settle({
          id,
          transaction: signed.serialize().toString("base64"),
          payer: publicKey.toString(),
        });
      } else {
        toast.error("Unable to sign transaction");
      }
    } catch (err) {
      setStatus(null);
      console.log(err);
    }
  };

  return (
    <div
      className="flex items-center justify-center mt-4 w-[20rem] h-14 bg-blue-700 hover:bg-blue-600 transition-all rounded font shapiro text-white text-xl cursor-pointer"
      onClick={pay}
    >
      {!publicKey && (
        <div className="absolute opacity-0">
          <Wallet />
        </div>
      )}
      {status === "PENDING" || (publicKey && !transaction) ? (
        <Loader className="w-6 h-6" />
      ) : publicKey ? (
        "Pay"
      ) : (
        <div className="text-lg">Connect Wallet</div>
      )}
    </div>
  );
};

export default Pay;
