/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { overpass } from "@/utils/fonts";
import Loader from "@/components/Loader";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useWallet } from "@solana/wallet-adapter-react";

const CreateWebhookModal = ({ closeModal }: { closeModal: () => void }) => {
  const [url, setUrl] = useState<string>();

  const { mutate, isLoading } = trpc.webhooks.create.useMutation({
    onSuccess: closeModal,
  });

  const router = useRouter();
  const app = router.query.app as string;

  const { publicKey } = useWallet();

  const createWebhook = async () => {
    if (!url) return toast.error("Enter a webhook url");

    const regex = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragment locator
      "i"
    );

    if (!regex.test(url)) return toast.error("Invalid URL");

    await mutate({
      app,
      url,
      publicKey: publicKey!.toBase58(),
    });
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  return (
    <div className="absolute inset-0 z-50 flex h-screen w-full items-center justify-center overflow-hidden bg-[rgba(0,0,0,0.7)]">
      <div className="w-full max-w-sm">
        <div className="w-full rounded-lg border border-[#111] bg-[rgba(5,5,5)] p-5">
          <input
            type="text"
            placeholder="url"
            className={`mb-5 h-10 w-full rounded bg-[#222] px-3 outline-none ${overpass}`}
            onChange={handleUrlChange}
          />

          <button
            className={`h-10 w-full rounded bg-white ${overpass} flex items-center justify-center pt-1 text-sm text-black`}
            onClick={createWebhook}
          >
            {!isLoading ? (
              "Create Webhook"
            ) : (
              <Loader className="-mt-1 h-5 w-5 text-black" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateWebhookModal;
