import { tt } from "@/utils/fonts";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <div className="flex h-16 w-full items-center justify-between border-b-2 border-[#111] bg-black px-8">
      <button
        className={`${tt} mt-1 text-2xl uppercase`}
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        Plege
      </button>
      <div></div>
    </div>
  );
};

export default Header;
