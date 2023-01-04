import Layout from "@/components/dashboard/Layout";
import { tiers } from "@/server/trpc/router/tiers";
import { overpass, space, tt } from "@/utils/fonts";
import { useRouter } from "next/router";

const App = () => {
  const router = useRouter();
  const app = router.query.app as string;

  const stats: {
    label: string;
    value: string;
  }[] = [
    {
      label: "MRR",
      value: "$1,234",
    },
    {
      label: "ARR",
      value: "$12,234",
    },
    {
      label: "SUBSCRIBERS",
      value: "425",
    },
    {
      label: "CHURN",
      value: "4.2%",
    },
  ];

  return (
    <Layout>
      <div className="flex h-full min-h-screen w-full justify-center bg-black pb-40">
        <div className="mt-12 flex w-full max-w-screen-xl flex-col">
          <div className="w-full flex-col rounded-xl border-2 border-[#222] bg-[rgb(3,3,3)]">
            <div className="grid h-28 grid-cols-4 divide-x-2 divide-[#222] border-b-2 border-[#222]">
              {stats.map((stat, key) => (
                <div
                  className="flex flex-col justify-between pb-4 pl-6 pt-5"
                  key={key}
                >
                  <div className={`${overpass} text-lg text-gray-400`}>
                    {stat.label}
                  </div>
                  <div className={`${tt} text-4xl`}>{stat.value}</div>
                </div>
              ))}
            </div>
            <div
              className={`flex h-96 items-center justify-center text-lg ${overpass}`}
            >
              soonTM
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
