import { space_bold } from "@/utils/fonts";
import { useRouter } from "next/router";

export const App = ({
  name,
  publicKey,
}: {
  name: string;
  publicKey: string;
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/dashboard/${publicKey}/tiers`);
      }}
      className="h-48 w-96 cursor-pointer rounded-lg border-2 border-[#111] bg-black p-6 px-8 transition-all hover:border-[#333]"
    >
      <div className={`${space_bold} text-xl font-bold antialiased`}>
        {name}
      </div>
    </div>
  );
};
