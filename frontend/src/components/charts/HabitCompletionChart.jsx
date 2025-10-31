import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const HabitCompletionChart = ({ last7DaysCompletions }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  console.log("last7DaysCompletions", last7DaysCompletions);

  const days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().slice(0, 10);
  });
  console.log("days :", days);
  const dataPerDay = days.map((day) =>
    last7DaysCompletions
      .filter((h) => h.completionDate?.startsWith(day))
      .reduce((acc, curr) => (curr.count ? curr.count : 0), 0)
  );

  const data = {
    labels: days,
    datasets: [
      {
        label: "Habits Completed",
        data: dataPerDay,
        backgroundColor: "rgba(59,130,246,0.6)", // blue-500
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Last 7 Days Completion
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-600">Completed Habits</span>
        </div>
      </div>
      <div className="w-full">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default HabitCompletionChart;
