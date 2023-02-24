/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Subscription as ISub, Tier } from "plege";

const Subscription = ({
  tiers,
  subscription,
}: {
  tiers: Tier[];
  subscription: ISub;
}) => {
  const getTierName = (tier: string) => {
    return tiers!.find((_tier) => {
      return tier === _tier.publicKey;
    })!.name;
  };

  function formatDate(date: Date): string {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${months[monthIndex]}, ${year}`;
  }

  return (
    <div className="flex h-[4.5rem] w-full items-center justify-between px-8 pl-8">
      <div className="flex">
        <div className="leading-0 w-[28.8rem]">{subscription.subscriber}</div>
        <div className="text-gray-400">{getTierName(subscription.tier)}</div>
      </div>
      <div className="flex items-center">
        <div className="mr-10">{formatDate(subscription.start)}</div>
        <div className="flex h-8 items-center justify-center rounded-full bg-white px-4 text-sm text-black">
          <div className="pt-1">
            {subscription.payPeriodExpiration > new Date()
              ? "ACTIVE"
              : "EXPIRED"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
