import CreateTier from "@/components/dashboard/app/tiers/CreateTier";
import CreateTierModal from "@/components/dashboard/app/tiers/CreateTierModal";
import Tier from "@/components/dashboard/app/tiers/Tier";
import Layout from "@/components/dashboard/Layout";
import Loader from "@/components/Loader";
import { overpass } from "@/utils/fonts";
import { trpc } from "@/utils/trpc";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { BN } from "@project-serum/anchor";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Tiers = () => {
  const { data, mutate, isLoading } = trpc.apps.feed.useMutation();

  const router = useRouter();
  const app = router.query.app as string;

  useEffect(() => {
    if (app) {
      const session = getCookie("session") as string;
      mutate({
        app,
        session,
      });
    }
  }, [app, mutate]);

  console.log(data);

  return (
    <Layout>
      <div className="flex w-full justify-center">
        <div className="h-full w-full max-w-screen-xl">
          {!data ? (
            <div className="flex h-[calc(100vh-7.5rem)] w-full items-center justify-center">
              <Loader className="-mt-24 h-10 w-10 text-white" />
            </div>
          ) : (
            <div className="mt-10">
              <div className="flex flex-col pb-10">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg shadow ring-1 ring-[#333] ring-opacity-5">
                      <table
                        className={`min-w-full divide-y divide-[#222] ${overpass}`}
                      >
                        <thead className="bg-[rgb(10,10,10)]">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-400 sm:pl-6"
                            >
                              Subscriber
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-400"
                            >
                              Tier
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 text-sm text-gray-400"
                            >
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#222] bg-[rgb(10,10,10)]">
                          {data.subscriptions.map(
                            ({ account: subscription }, key) => {
                              return (
                                <tr key={key}>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-100 sm:pl-6">
                                    {subscription.subscriber.toString()}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-100">
                                    {data.tiers.map(
                                      ({ account: tier, publicKey }, key) => {
                                        if (publicKey === subscription.tier) {
                                          return tier.name;
                                        }
                                      }
                                    )}
                                  </td>
                                  <td className="relative flex items-center justify-center py-4 text-sm text-gray-100">
                                    $
                                    {data.tiers.map(
                                      ({ account: tier, publicKey }, key) => {
                                        if (publicKey === subscription.tier) {
                                          return tier.price / 10 ** 6;
                                        }
                                      }
                                    )}
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Tiers;
