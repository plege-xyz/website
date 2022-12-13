import { useEffect, useState } from "react";
import Layout from "@/components/dashboard/Layout";
import Wallet from "@/components/wallet";
import { trpc } from "@/utils/trpc";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { overpass } from "@/utils/fonts";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { createUser } from "@/hooks/createUser";
import { confirmTransaction } from "@/hooks/confirmTransaction";
import { programId } from "@/constants";
import Loader from "@/components/Loader";

const Dashboard = () => {
  const [pda, setPda] = useState<string | null>();

  const router = useRouter();
  const redirect = router.query.redirect as string;

  const [loading, setLoading] = useState(false);

  const { mutate, data, isLoading } = trpc.users.login.useMutation({
    onSuccess: (data) => {
      const { pda } = data;
      if (!pda) setPda(null);
    },
  });
  const { publicKey, sendTransaction } = useWallet();
  const wallet = useAnchorWallet();

  useEffect(() => {
    if (publicKey) {
      mutate({ publicKey: publicKey.toString() });
    }
  }, [publicKey, mutate]);

  useEffect(() => {
    if (data && router && data.pda) {
      const { session, expiry } = data;

      setCookie("session", session);
      setCookie("expiry", expiry);

      window.location.href = redirect || "/dashboard";
    }
  }, [data, router, redirect]);

  useEffect(() => {
    if (pda === null && publicKey && wallet) {
      const [userPDA] = findProgramAddressSync(
        [Buffer.from("USER_META"), publicKey.toBuffer()],
        programId
      );

      setLoading(true);

      createUser(wallet, sendTransaction)
        .then(() => {
          mutate({ publicKey: publicKey.toString(), pda: userPDA.toBase58() });
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [pda, publicKey, wallet, mutate, sendTransaction]);

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center">
        {pda !== null ? (
          <Wallet />
        ) : !loading && !isLoading ? (
          <div className={`${overpass} text-center leading-loose`}>
            We&apos;re creating an account for you, <br /> please approve the
            transaction
          </div>
        ) : (
          <Loader className="h-10 w-10 text-white" />
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
