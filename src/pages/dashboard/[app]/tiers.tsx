/* eslint-disable @typescript-eslint/ban-ts-comment */
import CreateTier from "@/components/dashboard/app/tiers/CreateTier";
import CreateTierModal from "@/components/dashboard/app/tiers/CreateTierModal";
import Tier from "@/components/dashboard/app/tiers/Tier";
import Layout from "@/components/dashboard/global/Layout";
import Loader from "@/components/Loader";
import { overpass, tt } from "@/utils/fonts";
import { Plege } from "@/utils/plege";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { Tier as ITier } from "plege"

const Tiers = () => {
  const [isTierCreateModalOpen, setIsTierCreateModalOpen] = useState(false);
  const [tiers, setTiers] = useState<ITier[]>();

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
                    <Tier tier={tier} key={key} />
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
