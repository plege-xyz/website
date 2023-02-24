import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { Tier } from "plege";

const Tier = ({ tier }: { tier: Tier }) => {
  return (
    <div className="flex h-[4.5rem] w-full items-center justify-between px-8 pl-8">
      <div className="flex">
        <div className="leading-0 w-[28.8rem]">{tier.name}</div>
        <div className="text-gray-400"></div>
      </div>
      <div className="flex items-center">
        <div className="mr-10 flex w-14 justify-center">${tier.price}</div>
        <div className="mr-[2rem] flex w-24 justify-center">
          <div className="flex h-8 items-center justify-center rounded-full bg-white px-4 pt-0.5 text-black">
            {tier.interval}
          </div>
        </div>
        <a
          href={`/subscribe/${tier.publicKey}`}
          target="_blank"
          rel="noreferrer"
        >
          <button className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-white p-2.5 text-sm text-black">
            <ArrowTopRightOnSquareIcon />
          </button>
        </a>
      </div>
    </div>
  );
};

export default Tier;
