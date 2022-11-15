import { useEffect, useState } from "react";
import Layout from "@/components/dashboard/Layout";
import { App, Skeleton } from "@/components/dashboard/App";
import { PlusIcon } from "@heroicons/react/20/solid";

const Dashboard = () => {
  const [data, setData] = useState<string>();

  useEffect(() => {
    setTimeout(() => {
      setData("a");
    }, 1000);
  }, []);

  return (
    <Layout>
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-full max-w-screen-xl">
          <div className="mt-5 flex h-10 w-full items-center justify-between">
            <div></div>
            {/* <button className="flex h-full w-12 items-center justify-center rounded bg-white">
              <PlusIcon className="h-6 w-6 text-black" />
            </button> */}
          </div>
          <div className="grid grid-cols-3 gap-5 pb-10">
            {!data ? (
              <>
                {Array(9)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} />
                  ))}
              </>
            ) : (
              <>
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <App key={i} />
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
