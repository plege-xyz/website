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
  const [isTierCreateModalOpen, setIsTierCreateModalOpen] = useState(false);

  const { isLoading, data, mutate } = trpc.apps.getTiers.useMutation({
    retry: false,
  });

  const router = useRouter();
  const app = router.query.app as string;

  useEffect(() => {
    if (!data && app) {
      const session = getCookie("session") as string;
      mutate({
        app,
        session,
      });
    }
  }, [data, app]);

  const refresh = () => {
    const session = getCookie("session") as string;
    mutate({
      app,
      session,
    });
  };

  const closeCreateTierModal = () => {
    setIsTierCreateModalOpen(false);
  };

  return (
    <Layout>
      <div className="flex w-full justify-center">
        <div className="h-full w-full max-w-screen-xl">
          {!data ? (
            <div className="flex h-[calc(100vh-7.5rem)] w-full items-center justify-center">
              <Loader className="-mt-24 h-10 w-10 text-white" />
            </div>
          ) : (
            <div className="">
              {isTierCreateModalOpen && (
                <CreateTierModal
                  refresh={refresh}
                  closeCreateTierModal={closeCreateTierModal}
                />
              )}
              <div className="flex items-center justify-between">
                <div className={`${overpass} mt-1 ml-2 text-3xl`}>Tiers</div>
                <CreateTier
                  setIsTierCreateModalOpen={setIsTierCreateModalOpen}
                />
              </div>
              <div className="flex flex-col pb-10">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-[#333] ring-opacity-5 md:rounded-lg">
                      <table
                        className={`min-w-full divide-y divide-[#222] ${overpass}`}
                      >
                        <thead className="bg-[rgb(10,10,10)]">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-400 sm:pl-6"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-400"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-400"
                            >
                              Interval
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 text-sm text-gray-400"
                            >
                              Link
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#222] bg-[rgb(10,10,10)]">
                          {data.map(({ tier, publicKey }, key) => {
                            return (
                              <tr key={key}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-100 sm:pl-6">
                                  {tier.name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-100">
                                  ${tier.price}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-100">
                                  monthly
                                </td>
                                <td className="relative flex justify-center whitespace-nowrap py-4 pl-3 text-right text-sm font-medium">
                                  <a
                                    href={`/subscribe/${publicKey}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-indigo-700 hover:text-indigo-900"
                                  >
                                    <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
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
