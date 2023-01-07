import CreateWebhookModal from "@/components/dashboard/app/developer/CreateWebhookModal";
import Layout from "@/components/dashboard/Layout";
import { overpass, tt } from "@/utils/fonts";
import { trpc } from "@/utils/trpc";
import { DocumentDuplicateIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";

const Developer = () => {
  const [isCreateWebhookModalOpen, setIsCreateWebhookModalOpen] =
    useState<boolean>(false);

  const router = useRouter();
  const app = router.query.app as string;

  const copy = () => {
    navigator.clipboard.writeText(app);
  };

  const openModal = () => {
    setIsCreateWebhookModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateWebhookModalOpen(false);
  };

  const { isLoading, mutate, data } = trpc.webhooks.get.useMutation();
  const webhooks = data?.webhook;

  useEffect(() => {
    if (app) {
      mutate({
        app,
      });
    }
  }, [app, mutate]);

  return (
    <Layout>
      {isCreateWebhookModalOpen && (
        <CreateWebhookModal closeModal={closeModal} />
      )}
      <div className={`flex w-full justify-center ${overpass}`}>
        <div className="mt-12 h-10 w-full max-w-screen-xl">
          <div className="flex h-16 w-full items-center justify-between rounded-lg border-2 border-[#111] bg-[rgb(3,3,3)] px-5">
            APP ID:
            <div className="flex">
              {app}
              <button onClick={copy}>
                <DocumentDuplicateIcon className="ml-3 h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          <div className="relative mt-8 h-full">
            <div className="flex items-center justify-between">
              <div className={`${tt} ml-2 text-3xl`}>WEBHOOKS</div>
              <button
                className="h-10 rounded bg-white px-5 pt-1 text-sm text-black"
                onClick={openModal}
              >
                CREATE
              </button>
            </div>

            {!webhooks ? (
              <div className="flex h-96 w-full items-center justify-center">
                <Loader className="mt-32 h-10 w-10 text-white" />
              </div>
            ) : (
              <div className="flex w-full justify-center">
                <div className="mt-8 h-10 w-full max-w-screen-xl">
                  <div
                    className={`grid w-full divide-y-2 divide-[#111] ${
                      webhooks.length > 0 ? "rounded-lg" : "rounded-t-lg"
                    } border-2 border-[#111] bg-[rgb(3,3,3)] ${overpass}`}
                  >
                    <div className="flex h-14 w-full items-center justify-between px-8">
                      <div className="flex">
                        <div className="w-[28.8rem]">url</div>
                        {/* <div className="">tier</div> */}
                      </div>
                      <div className="flex">
                        {/* <div className="mr-[5.5rem]">start</div>
                        <div className="mr-3">status</div> */}
                      </div>
                    </div>
                    {webhooks.map((webhook, key) => (
                      <div
                        className="flex h-[4.5rem] w-full items-center justify-between px-8 pl-8"
                        key={key}
                      >
                        <div className="flex">
                          <div className="leading-0">{webhook.url}</div>
                          <div className="text-gray-400">
                            {/* {getTierName(subscription.tier)} */}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-10">
                            {/* {formatDate(subscription.start)} */}
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
      </div>
    </Layout>
  );
};

export default Developer;
