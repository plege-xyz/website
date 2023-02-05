/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Layout from "@/components/dashboard/Layout";
import Loader from "@/components/Loader";
import { overpass } from "@/utils/fonts";
import { Plege } from "@/utils/plege";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { Subscription, Tier } from "plege";

const Feed = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>();
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

  const getTierName = (tier: string) => {
    return tiers!.find((_tier) => {
      return tier === _tier.publicKey;
    })!.name;
  };

  function formatDate(date: Date): string {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${months[monthIndex]}, ${year}`;
  }

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
                  <div className="flex h-14 w-full items-center justify-between px-8">
                    <div className="flex">
                      <div className="w-[28.8rem]">subscriber</div>
                      <div>tier</div>
                    </div>
                    <div className="flex">
                      <div className="mr-[5.5rem]">start</div>
                      <div className="mr-3">status</div>
                    </div>
                  </div>
                  {subscriptions.map((subscription, key) => (
                    <div
                      className="flex h-[4.5rem] w-full items-center justify-between px-8 pl-8"
                      key={key}
                    >
                      <div className="flex">
                        <div className="leading-0 w-[28.8rem]">
                          {subscription.subscriber}
                        </div>
                        <div className="text-gray-400">
                          {getTierName(subscription.tier)}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-10">
                          {formatDate(subscription.start)}
                        </div>
                        <div className="flex h-8 items-center justify-center rounded-full bg-white px-4 text-sm text-black">
                          <div className="pt-1">
                            {subscription.payPeriodExpiration > new Date()
                              ? "ACTIVE"
                              : "EXPIRED"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
