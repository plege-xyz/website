import { tt, _space } from "@/utils/fonts";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

const Graph = () => {
  const labels = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return `${date.toLocaleString("default", {
      month: "short",
    })} ${date.getDate()}`;
  }).reverse();

  const data = labels.map(() => {
    // random number between 0 and 50
    return Math.floor(Math.random() * 50);
  });

  const options = {};

  return (
    <div className="h-full w-full cursor-pointer rounded p-5 py-8">
      <Bar
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 5,
                maxRotation: 0,
                font: {
                  family: _space.style.fontFamily,
                },
                color: "#c5c5c5",
              },
            },
            y: {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 5,
                maxRotation: 0,
                font: {
                  family: _space.style.fontFamily,
                },
                color: "#c5c5c5",
              },
            },
          },
        }}
        data={{
          labels: labels,
          datasets: [
            {
              label: "Subscriptions",
              data,
              backgroundColor: "#1E40AF",
              borderColor: "#1E40AF",
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
};

export default Graph;
