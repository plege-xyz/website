import { overpass } from "@/utils/fonts";
import Discord from "./Discord";
import Twitter from "./Twitter";

const index = () => {
  return (
    <div className="absolute top-10 flex gap-x-3">
      <Discord />
      <button
        className={`h-10 rounded-full px-5 pt-0.5 text-xs text-white ${overpass} border-separate border-spacing-1 border border-white`}
      >
        PRIVATE BETA
      </button>
      <Twitter />
    </div>
  );
};

export default index;
