import { overpass, space_bold } from "@/utils/fonts";

const Tier = () => {
  return (
    <div className="flex h-48 w-96 cursor-pointer flex-col justify-between rounded-lg border-2 border-[#111] bg-black p-6 px-8 transition-all hover:border-[#333]">
      <div className={`${overpass} text-xl font-bold antialiased`}>plege</div>
      <div>
        <div className={`${space_bold} text-3xl text-gray-300`}>$5</div>
      </div>
    </div>
  );
};

export default Tier;
