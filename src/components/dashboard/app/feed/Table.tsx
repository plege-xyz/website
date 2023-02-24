import type { Subscription as ISub, Tier } from "plege";
import Subscription from "./Subscription";

const Table = ({
  tiers,
  subscriptions,
}: {
  tiers: Tier[];
  subscriptions: ISub[];
}) => {
  return (
    <>
      <div className="flex h-14 w-full items-center justify-between px-8">
        <div className="flex">
          <div className="w-[28.8rem]">subscriber</div>
          <div>tier</div>
        </div>
        <div className="flex">
          <div className="mr-[5.5rem]">start</div>
          <div className="mr-3">status</div>
        </div>
      </div>
      {subscriptions.map((subscription, key) => (
        <Subscription tiers={tiers} subscription={subscription} key={key} />
      ))}
    </>
  );
};

export default Table;
