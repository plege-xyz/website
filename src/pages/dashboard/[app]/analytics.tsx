import Graph from "@/components/dashboard/app/Graph";
import Layout from "@/components/dashboard/Layout";
import { tiers } from "@/server/trpc/router/tiers";
import { overpass, space } from "@/utils/fonts";
import { trpc } from "@/utils/trpc";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const App = () => {
  const router = useRouter();
  const app = router.query.app as string;
  const { data, mutate } = trpc.apps.stats.useMutation();

  useEffect(() => {
    if (app) {
      const session = getCookie("session") as string;
      mutate({
        session,
        app,
      });
    }
  }, [app]);

  let revenue = 0;

  if (data) {
    data.subscriptions.map((sub) => {
      const tier = data.tiers.find(
        (tier) => tier.publicKey === sub.account.tier
      );

      if (tier) {
        revenue += tier.account.price / 10 ** 6;
      }
    });
  }

  return (
    <Layout>
      <div className="flex h-full min-h-screen pb-40 w-full justify-center bg-black">
        <div className="mt-12 flex w-full max-w-screen-xl flex-col items-center justify-center">
          <div className="flex w-full justify-center gap-x-5">
            <div className="h-full w-2/3 rounded-lg border border-[#111] bg-[rgb(3,3,3)]">
              <Graph />
            </div>
            <div className={`grid w-60 grid-cols-1 gap-y-5 ${overpass}`}>
              <div className="flex h-36 w-full flex-col justify-between rounded border border-[#111] bg-[rgb(3,3,3)] p-5 text-lg text-gray-300">
                Subscribers
                {data && data.subscriptions ? (
                  <div className="text-5xl">{data.subscriptions.length}</div>
                ) : (
                  <div className="h-12 w-44 animate-pulse rounded bg-[#111]"></div>
                )}
              </div>
              <div className="flex h-36 w-full flex-col justify-between rounded border border-[#111] bg-[rgb(3,3,3)] p-5 text-lg text-gray-300">
                Revenue
                {data && data.subscriptions ? (
                  <div className="text-5xl">${revenue}</div>
                ) : (
                  <div className="h-12 w-44 animate-pulse rounded bg-[#111]"></div>
                )}
              </div>
              <div className="flex h-36 w-full flex-col justify-between rounded border border-[#111] bg-[rgb(3,3,3)] p-5 text-lg text-gray-300">
                Tiers
                {data && data.subscriptions ? (
                  <div className="text-5xl">{data.tiers.length}</div>
                ) : (
                  <div className="h-12 w-44 animate-pulse rounded bg-[#111]"></div>
                )}
              </div>
            </div>
          </div>
          <div className={`${overpass} w-full px-24 py-5 text-left text-3xl`}>
            Subscriptions By Tier
          </div>
          <div className="grid h-10 w-full grid-cols-4 px-20">
            {data &&
              data.tiers.map((tier, key) => {
                const totalSubscriptions = data.subscriptions.filter(
                  (sub) => sub.account.tier === tier.publicKey
                ).length;

                return (
                  <div
                    key={key}
                    className={`flex h-36 w-full flex-col justify-between rounded border border-[#111] bg-[rgb(3,3,3)] p-5 text-lg text-gray-300 ${overpass}`}
                  >
                    {tier.account.name}

                    <div className="text-5xl">{totalSubscriptions}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
