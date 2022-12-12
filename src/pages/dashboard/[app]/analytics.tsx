import Graph from "@/components/dashboard/app/Graph";
import Layout from "@/components/dashboard/Layout";
import { space } from "@/utils/fonts";
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

  console.log(data?.subscriptions);

  return (
    <Layout>
      <div className="flex w-full justify-center">
        <div className="mt-12 flex w-full max-w-screen-xl justify-center gap-x-5">
          <div className="h-full w-2/3 rounded-lg border border-[#111] bg-[rgb(3,3,3)]">
            <Graph />
          </div>
          <div className="grid w-60 grid-cols-1 gap-y-5">
            <div className="h-36 w-full rounded border border-[#111] bg-[rgb(3,3,3)]"></div>
            <div className="h-36 w-full rounded border border-[#111] bg-[rgb(3,3,3)]"></div>
            <div className="h-36 w-full rounded border border-[#111] bg-[rgb(3,3,3)]"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
