import { useEffect, useState } from "react";
import Layout from "@/components/dashboard/Layout";
import { trpc } from "@/utils/trpc";
import { getCookie } from "cookies-next";
import CreateApp from "@/components/dashboard/CreateApp";
import SkeletalLoader from "@/components/dashboard/SkeletalLoader";
import CreateAppModal from "@/components/dashboard/CreateAppModal";
import { App } from "@/components/dashboard/App";

const Dashboard = () => {
  const [isCreateAppModalOpen, setIsCreateAppModalOpen] = useState(false);

  const { data, mutate } = trpc.apps.getAll.useMutation({
    retry: false,
  });

  useEffect(() => {
    if (!data) {
      const session = getCookie("session") as string;
      mutate({
        session,
      });
    }
  }, [data, mutate]);

  const refresh = () => {
    const session = getCookie("session") as string;
    mutate({
      session,
    });
  };

  const openCreateAppModal = () => {
    setIsCreateAppModalOpen(true);
  };

  const closeCreateAppModal = () => {
    setIsCreateAppModalOpen(false);
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
          <div className="h-full w-full max-w-screen-xl px-8">
            <div className="grid grid-cols-3 gap-8 py-10">
              {!data ? (
                <SkeletalLoader />
              ) : (
                <>
                  {data.map((app, key) => (
                    <App
                      key={key}
                      name={app.data.name}
                      publicKey={app.publicKey.toString()}
                    />
                  ))}
                  <CreateApp openCreateAppModal={openCreateAppModal} />
                </>
              )}
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Dashboard;
