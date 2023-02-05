/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from "react";
import Layout from "@/components/dashboard/Layout";
import CreateApp from "@/components/dashboard/CreateApp";
import SkeletalLoader from "@/components/dashboard/SkeletalLoader";
import CreateAppModal from "@/components/dashboard/CreateAppModal";
import { App } from "@/components/dashboard/App";
import { Plege } from "@/utils/plege";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import type { App as AppType } from "plege";
import { overpass } from "@/utils/fonts";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const [isCreateAppModalOpen, setIsCreateAppModalOpen] = useState(false);
  const [apps, setApps] = useState<AppType[]>();
  const [unauthorized, setunauthorized] = useState<boolean>(false);

  const wallet = useAnchorWallet();

  useEffect(() => {
    const getApps = async () => {
      try {
        setApps(await Plege(wallet!).app.all());
      } catch {
        setunauthorized(true);
      }
    };

    if (!apps && wallet) {
      getApps();
    }
  }, [apps, wallet]);

  const refresh = () => {
    setApps(undefined);
  };

  const openCreateAppModal = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setIsCreateAppModalOpen(true);
  };

  const closeCreateAppModal = () => {
    setIsCreateAppModalOpen(false);
  };

  const createAccount = async () => {
    await Plege(wallet!)
      .user.create()
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occoured");
      });
  };

  return (
    <Layout>
      <>
        {isCreateAppModalOpen && (
          <CreateAppModal
            refresh={refresh}
            closeCreateAppModal={closeCreateAppModal}
          />
        )}
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex h-full w-full max-w-screen-xl flex-col px-8">
            {unauthorized ? (
              <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center">
                <button
                  className={`${overpass} mt-14 h-12 rounded bg-white px-6 text-center text-black`}
                  onClick={createAccount}
                >
                  Create Account
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-8 py-10">
                {!apps ? (
                  <SkeletalLoader />
                ) : (
                  <>
                    {apps.map((app, key) => (
                      <App
                        key={key}
                        name={app.name}
                        publicKey={app.publicKey}
                      />
                    ))}
                    <CreateApp openCreateAppModal={openCreateAppModal} />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Dashboard;
