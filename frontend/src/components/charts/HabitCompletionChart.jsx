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
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4 text-blue-600">Last 7 Days</h2>
      <Bar data={data} />
    </div>
  );
};

export default HabitCompletionChart;
