import { useEffect } from "react";
import Layout from "@/components/dashboard/Layout";
import Wallet from "@/components/wallet";
import { trpc } from "@/utils/trpc";
import { useWallet } from "@solana/wallet-adapter-react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();
  const redirect = router.query.redirect as string;

  const { mutate, data } = trpc.users.login.useMutation();

  const { publicKey } = useWallet();

  useEffect(() => {
    if (publicKey) {
      mutate({ publicKey: publicKey.toString() });
    }
  }, [publicKey, mutate]);

  useEffect(() => {
    if (data && router) {
      const { session, expiry } = data;

      setCookie("session", session);
      setCookie("expiry", expiry);

      console.log("redirect", redirect);
      router.push(redirect || "/dashboard");
    }
  }, [data, router]);

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center">
        <Wallet />
      </div>
    </Layout>
  );
};

export default Dashboard;
