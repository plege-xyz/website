import Layout from "@/components/dashboard/Layout";
import { overpass, tt } from "@/utils/fonts";
import { DocumentDuplicateIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";

const Developer = () => {
  const router = useRouter();
  const app = router.query.app as string;

  const copy = () => {
    navigator.clipboard.writeText(app);
  };

  return (
    <Layout>
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

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <div className={`${tt} ml-2 text-3xl`}>WEBHOOKS</div>
              <button className="h-10 rounded bg-white px-5 pt-1 text-sm text-black">
                CREATE
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Developer;
