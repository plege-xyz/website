/* eslint-disable @typescript-eslint/ban-ts-comment */
import CreateTier from "@/components/dashboard/app/tiers/CreateTier";
import CreateTierModal from "@/components/dashboard/app/tiers/CreateTierModal";
import Layout from "@/components/dashboard/Layout";
import Loader from "@/components/Loader";
import { overpass, tt } from "@/utils/fonts";
import { Plege } from "@/utils/plege";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { Tier } from "../../plege";

const Tiers = () => {
  const [isTierCreateModalOpen, setIsTierCreateModalOpen] = useState(false);
  const [tiers, setTiers] = useState<Tier[]>();

  const router = useRouter();
  const app = router.query.app as string;

  const wallet = useAnchorWallet();

  useEffect(() => {
    if (!tiers && wallet) {
      const getTiers = async () => {
        setTiers(
          await Plege(wallet).tier.all({
            app,
          })
        );
      };

      getTiers();
    }
  }, [tiers, app, wallet]);

  const refresh = () => {
    setTiers(undefined);
  };

  const closeCreateTierModal = () => {
    setIsTierCreateModalOpen(false);
  };

  return (
    <Layout>
      <div className="flex w-full justify-center">
        <div className="h-full w-full max-w-screen-xl">
          {!tiers ? (
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
              <div className="my-8 flex items-center justify-between">
                <div className={`${tt} mt-1 ml-2 text-3xl`}>TIERS</div>
                <CreateTier
                  setIsTierCreateModalOpen={setIsTierCreateModalOpen}
                />
              </div>
              <div>
                <div
                  className={`grid w-full divide-y-2 divide-[#222] ${
                    tiers.length > 0 ? "rounded-lg" : "rounded-t-lg"
                  } border-2 border-[#222] bg-[rgb(5,5,5)] ${overpass}`}
                >
                  <div className="flex h-14 w-full items-center justify-between px-8">
                    <div className="flex">
                      <div className="w-[28.8rem]">name</div>
                    </div>
                    <div className="flex">
                      <div className="mr-[3.3rem]">price</div>
                      <div className="mr-10">interval</div>
                      <div className="mr-3">link</div>
                    </div>
                  </div>
                  {tiers.map((tier, key) => (
                    <div
                      className="flex h-[4.5rem] w-full items-center justify-between px-8 pl-8"
                      key={key}
                    >
                      <div className="flex">
                        <div className="leading-0 w-[28.8rem]">{tier.name}</div>
                        <div className="text-gray-400">
                          {/* {getTierName(subscription.tier)} */}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-10 flex w-14 justify-center">
                          ${tier.price}
                        </div>
                        <div className="mr-[2rem] flex w-24 justify-center">
                          <div className="flex h-8 items-center justify-center rounded-full bg-white px-4 pt-0.5 text-black">
                            {tier.interval}
                          </div>
                        </div>
                        <button className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-white p-2.5 text-sm text-black">
                          <ArrowTopRightOnSquareIcon />
                        </button>
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

export default Tiers;
