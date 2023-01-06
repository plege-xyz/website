import { overpass, _overpass } from "@/utils/fonts";
import { Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import { Chart as ChartJS, registerables } from "chart.js";
import type { Subscription, Tier } from "plege";
ChartJS.register(...registerables);

const Graph = ({
  subscriptions,
  tiers,
}: {
  subscriptions: Subscription[];
  tiers: Tier[];
}) => {
  function getLast30Days() {
    const today = new Date();
    const dates = [];

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date);
    }

    return dates.reverse();
  }

  const dates = getLast30Days();
  const formattedDates = dates.map((date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  );

  const data: ChartData<"bar"> = {
    labels: formattedDates,
    datasets: tiers
      .sort((a, b) => {
        return a.price - b.price;
      })
      .map((tier, i) => {
        const tierSubscriptions = subscriptions.filter(
          (subscription) => subscription.tier === tier.publicKey
        );

        return {
          label: tier.name,
          data: dates.map((date) => {
            const subscriptionsOnDate = tierSubscriptions.filter(
              (subscription) => {
                const startDate = subscription.start;
                const payPeriodStartDate = subscription.payPeriodStart;
                return (
                  (startDate.getDay() === date.getDay() &&
                    startDate.getMonth() === date.getMonth() &&
                    startDate.getFullYear() === date.getFullYear()) ||
                  (payPeriodStartDate.getDay() === date.getDay() &&
                    payPeriodStartDate.getMonth() === date.getMonth() &&
                    payPeriodStartDate.getFullYear() === date.getFullYear())
                );
              }
            );
            return subscriptionsOnDate.length;
          }),
          borderColor: "#000000",
          backgroundColor: "#fff",
          borderSkipped: false,
        };
      }),
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        titleFont: {
          family: _overpass.style.fontFamily,
          size: 18,
        },
        bodyFont: {
          family: _overpass.style.fontFamily,
          lineHeight: 0,
        },
        titleMarginBottom: 10,
        borderColor: "#fff",
        borderWidth: 1,
        padding: 15,
        boxPadding: 5,
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 8,
          maxRotation: 0,
          font: {
            family: _overpass.style.fontFamily,
          },
        },
        stacked: true,
      },
      y: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 5,
          maxRotation: 0,
          font: {
            family: _overpass.style.fontFamily,
          },
        },
      },
    },
  };

  return (
    <div className="relative h-full w-full cursor-pointer rounded pl-5 pt-5 pr-5 pb-3">
      <div className="h-full w-full">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default Graph;
