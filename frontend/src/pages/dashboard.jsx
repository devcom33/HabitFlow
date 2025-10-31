import NavBar from "../components/NavBar";
import Stats from "../components/Stats";
import useHabitData from "../hooks/useHabitData";
import HabitCompletionChart from "../components/charts/HabitCompletionChart";
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

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Welcome back Champion!
          </h1>
          <p className="text-gray-600">
            Track your daily habits and build lasting routines
          </p>
        </div>

        <HabitCompletionChart last7DaysCompletions={last7DaysCompletions} />

        <div className="text-center mb-12">
          <div className="relative">
            <Stats habitCompletions={habitCompletions} habitData={habitData} />
          </div>
        </div>
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
