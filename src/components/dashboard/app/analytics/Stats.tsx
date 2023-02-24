import tiers from "@/pages/dashboard/[app]/tiers";
import { overpass, tt } from "@/utils/fonts";
import type { Subscription, Tier } from "plege";

const Stats = ({
  subscriptions,
  tiers,
}: {
  subscriptions?: Subscription[];
  tiers?: Tier[];
}) => {
  const getMRR = () => {
    if (!subscriptions || !tiers) return;

    // Get the current date
    const currentDate = new Date();

    let mrr = 0;
    subscriptions.forEach((subscription) => {
      // Check if the subscription is still active
      if (subscription.payPeriodExpiration > currentDate) {
        // Find the tier for the subscription
        const tier = tiers.find((t) => t.publicKey === subscription.tier);
        if (tier) {
          // Calculate the monthly amount for the subscription
          let monthlyAmount = tier.price;
          if (tier.interval === "YEARLY") {
            monthlyAmount /= 12;
          }
          // Add the monthly amount to the MRR
          mrr += monthlyAmount;
        }
      }
    });
    // Return the MRR as a string in the desired format
    return "$" + mrr.toLocaleString();
  };

  const getARR = () => {
    if (!subscriptions || !tiers) return;

    // Get the current date
    const currentDate = new Date();

    let arr = 0;
    subscriptions.forEach((subscription) => {
      // Check if the subscription is still active
      if (subscription.payPeriodExpiration > currentDate) {
        // Find the tier for the subscription
        const tier = tiers.find((t) => t.publicKey === subscription.tier);
        if (tier) {
          // Calculate the annual amount for the subscription
          let annualAmount = tier.price;
          if (tier.interval === "MONTHLY") {
            annualAmount *= 12;
          }
          // Add the annual amount to the ARR
          arr += annualAmount;
        }
      }
    });
    // Return the ARR as a string in the desired format
    return "$" + arr.toLocaleString();
  };

  const getSubscribers = () => {
    if (!subscriptions) return;

    return subscriptions
      .filter((subscription) => {
        return subscription.payPeriodExpiration > new Date();
      })
      .length.toString();
  };

  const getChurn = () => {
    if (!subscriptions) return;

    // Get the current date
    const currentDate = new Date();

    let expiredCount = 0;
    let startCount = 0;
    subscriptions.forEach((subscription) => {
      // Check if the subscription expired in the previous month
      let prevMonth = currentDate.getMonth() - 1;
      let prevYear = currentDate.getFullYear();
      if (prevMonth < 0) {
        prevMonth += 12;
        prevYear--;
      }
      if (
        subscription.payPeriodExpiration.getMonth() === prevMonth &&
        subscription.payPeriodExpiration.getFullYear() === prevYear
      ) {
        expiredCount++;
      }
      // Check if the subscription was active at the start of the previous month
      if (
        subscription.payPeriodStart < currentDate &&
        subscription.payPeriodExpiration > currentDate
      ) {
        startCount++;
      }
    });
    // Return 0% if the number of expired subscriptions is 0 or the number of subscriptions at the start of the previous month is 0
    if (expiredCount === 0 || startCount === 0) {
      return "0%";
    }
    // Calculate the churn rate as a percentage and round to two decimal places
    const churnRate = ((expiredCount / startCount) * 100).toFixed(2);

    // Return the churn rate as a string with a percentage sign
    return churnRate + "%";
  };

  const stats: {
    label: string;
    value?: string;
  }[] = [
    {
      label: "MRR",
      value: getMRR(),
    },
    {
      label: "ARR",
      value: getARR(),
    },
    {
      label: "SUBSCRIBERS",
      value: getSubscribers(),
    },
    {
      label: "CHURN",
      value: getChurn(),
    },
  ];

  return (
    <div className="grid h-28 grid-cols-4 divide-x-2 divide-[#222] border-b-2 border-[#222]">
      {stats.map((stat, key) => (
        <div className="flex flex-col justify-between pb-4 pl-6 pt-5" key={key}>
          <div className={`${overpass} text-lg text-gray-400`}>
            {stat.label}
          </div>
          {stat.value ? (
            <div className={`${tt} text-4xl`}>{stat.value}</div>
          ) : (
            <div className="h-10 w-36 animate-pulse rounded bg-[#111]"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stats;
