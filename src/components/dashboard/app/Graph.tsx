import { overpass, tt, _space } from "@/utils/fonts";
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
    <div className="relative h-full w-full cursor-pointer rounded p-5 py-8">
      <div className="absolute flex h-full w-full items-center justify-center">
        <div className={`${tt} z-50 -mt-10 text-xl uppercase text-gray-300`}>
          coming soon
        </div>
      </div>
      <div className=" blur-sm">
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
                backgroundColor: "#222",
                borderColor: "#222",
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Graph;
