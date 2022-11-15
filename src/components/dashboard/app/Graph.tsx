import { useRef } from "react";
import { VictoryBar } from "victory";

const Graph = () =>
  //     {
  //   data,
  // }: {
  //   data: {
  //     labels: string[];
  //     datasets: {
  //       label: string;
  //       data: number[];
  //     }[];
  //   };
  //     }
  {
    // get dates of all days in the last 30 days
    const labels = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toLocaleDateString();
    }).reverse();

    // get random data for the last 30 days in the shape { day: string, subscriptions: number }
    const data = labels.map((day) => ({
      day,
      subscriptions: Math.floor(Math.random() * 100),
    }));

    return (
      <div className="h-full w-full cursor-pointer rounded py-8">
        <VictoryBar
          data={data}
          x="day"
          y="subscriptions"
          padding={0}
          barRatio={1}
          width={550}
        />
      </div>
    );
  };

export default Graph;
