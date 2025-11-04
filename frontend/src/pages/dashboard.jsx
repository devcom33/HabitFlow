import NavBar from "../components/NavBar";
import Stats from "../components/charts/Stats";
import useHabitData from "../hooks/useHabitData";
import HabitCompletionChart from "../components/charts/HabitCompletionChart";
import CircleChart from "../components/charts/CircleChart";
import { getLast7DaysCompletions } from "../services/dashboardService";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { habitCompletions, habitData } = useHabitData();
  const [last7DaysCompletions, setLast7DaysCompletions] = useState([]);

  useEffect(() => {
    const fetchCompletions = async () => {
      const result = await getLast7DaysCompletions();
      setLast7DaysCompletions(result);
    };

    fetchCompletions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <NavBar />

      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <Stats habitCompletions={habitCompletions} habitData={habitData} />

        <HabitCompletionChart last7DaysCompletions={last7DaysCompletions} />
        <CircleChart />
      </div>

      <div className="text-center py-8 border-t border-gray-200">
        <p className="text-gray-500 text-sm">
          "Success is the sum of small efforts repeated day in and day out." -
          Robert Collier
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
