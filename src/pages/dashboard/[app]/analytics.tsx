import Layout from "@/components/dashboard/global/Layout";
import { overpass } from "@/utils/fonts";
import { Plege } from "@/utils/plege";
import { useRouter } from "next/router";
import { FakeWallet } from "plege";
import type { Subscription, Tier } from "plege";
import { useEffect, useState } from "react";
import Graph from "@/components/dashboard/app/Graph";
import Loader from "@/components/Loader";
import Stats from "@/components/dashboard/app/analytics/Stats";

const App = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>();
  const [tiers, setTiers] = useState<Tier[]>();

  const router = useRouter();
  const app = router.query.app as string;

  useEffect(() => {
    if (app && !tiers) {
      const getSubscriptions = async () => {
        return setSubscriptions(
          await Plege(FakeWallet).subscription.all({
            app,
          })
        );
      };

      const getTiers = async () => {
        return setTiers(
          await Plege(FakeWallet).tier.all({
            app,
          })
        );
      };

      getSubscriptions();
      getTiers();
    }
  }, [app, tiers]);

  return (
    <Layout>
      <div className="flex h-full w-full justify-center bg-black pb-40">
        <div className="mt-12 flex w-full max-w-screen-xl flex-col">
          <div className="w-full flex-col rounded-xl border-2 border-[#222] bg-[rgb(3,3,3)]">
            <Stats subscriptions={subscriptions} tiers={tiers} />
            <div
              className={`flex h-[30rem] items-center justify-center text-lg ${overpass}`}
            >
              {subscriptions && tiers ? (
                <>
                  <Graph subscriptions={subscriptions} tiers={tiers} />
                </>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Loader className="h-10 w-10" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
