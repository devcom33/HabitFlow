import React, { useState } from "react";
import NavBar from "../components/NavBar";
import HabitGrid from "../components/HabitGrid";
import HabitList from "../components/HabitList";
import Stats from "../components/Stats";
import useHabitData from "../hooks/useHabitData";

const Dashboard = () => {
  const [habits, toggleHabit, addHabit, habitData] = useHabitData();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <NavBar />

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back!</h1>
          <p className="text-gray-400">
            Track your daily habits and build lasting routines
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <HabitGrid />
          </div>

          <div className="space-y-6">
            <Stats habits={habits} habitData={habitData} />
          </div>
        </div>

        <HabitList
          habits={habits}
          toggleHabit={toggleHabit}
          addHabit={addHabit}
        />
      </div>
    </div>
  );
};

export default Dashboard;
