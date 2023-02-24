/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Layout from "@/components/dashboard/global/Layout";
import Loader from "@/components/Loader";
import { overpass } from "@/utils/fonts";
import { Plege } from "@/utils/plege";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { Subscription as ISub, Tier } from "plege";
import Subscription from "@/components/dashboard/app/feed/Subscription";
import Table from "@/components/dashboard/app/feed/Table";

const Feed = () => {
  const [subscriptions, setSubscriptions] = useState<ISub[]>();
  const [tiers, setTiers] = useState<Tier[]>();

  const router = useRouter();
  const app = router.query.app as string;

  const wallet = useAnchorWallet();

  useEffect(() => {
    if (app && wallet) {
      const getSubscriptions = async () => {
        const subscriptions = await Plege(wallet).subscription.all({
          app,
        });
        subscriptions.sort((a, b) => {
          return b.start.getTime() - a.start.getTime();
        });
        setSubscriptions(subscriptions);
      };

      const getTiers = async () => {
        setTiers(
          await Plege(wallet).tier.all({
            app,
          })
        );
      };

      getSubscriptions();
      getTiers();
    }
  }, [app, wallet]);

  return (
    <Layout>
      <div className="flex w-full justify-center">
        <div className="h-full w-full max-w-screen-xl">
          {!subscriptions || !tiers ? (
            <div className="flex h-[calc(100vh-7.5rem)] w-full items-center justify-center">
              <Loader className="-mt-24 h-10 w-10 text-white" />
            </div>
          ) : (
            <div className="flex w-full justify-center">
              <div className="mt-14 h-10 w-full max-w-screen-xl">
                <div
                  className={`grid w-full divide-y-2 divide-[#222] ${
                    subscriptions.length > 0 ? "rounded-lg" : "rounded-t-lg"
                  } border-2 border-[#222] bg-[rgb(5,5,5)] ${overpass}`}
                >
                  <Table tiers={tiers} subscriptions={subscriptions} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Feed;
