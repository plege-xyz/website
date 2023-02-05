/* eslint-disable @next/next/no-img-element */
import { overpass } from "@/utils/fonts";

const Hero = () => {
  return (
    <>
      <div className="text-8xl">
        recurring payments. <br /> subscriptions. <br /> saas. solana.
      </div>
      <div className={`${overpass} relative mt-20`}>
        <div className="flex h-12 w-max items-center justify-center">
          <div className="absolute -bottom-1.5 right-1.5 h-12 w-[9.5rem] rounded border border-white bg-[#222]"></div>

          <div
            className={`z-50 flex h-12 w-[9.5rem] cursor-pointer items-center justify-center rounded bg-white pt-0.5 text-sm text-black ${overpass} transition-all hover:-translate-x-1.5 hover:translate-y-1.5`}
          >
            EARLY ACCESS
          </div>
        </div>
      </div>
      <div className="relative h-full w-full max-w-screen-xl overflow-hidden">
        <img
          src="/images/home/hero-image.png"
          alt="Dashboard Preview"
          className="mt-24 -mb-6 rounded-xl border-[5px] border-[#fff]"
        />
      </div>
    </>
  );
};

export default Hero;
