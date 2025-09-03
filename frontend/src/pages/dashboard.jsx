import React, { useState } from "react";
import NavBar from "../components/NavBar";
import HabitGrid from "../components/HabitGrid";
import HabitList from "../components/HabitList";
import Stats from "../components/Stats";
import useHabitData from "../hooks/useHabitData";
import useHabitGrid from "../hooks/useHabitGrid";

const Dashboard = () => {
  const {
    habits,
    habitCompletions,
    toggleHabit,
    addCompletionHabit,
    habitData,
    loading,
    error,
    //gridLoading,
  } = useHabitData();
  const { habitGridData, refreshGridData, gridLoading } = useHabitGrid(1);

  const handleDayClick = (dateKey) => {
    console.log(`Clicked on ${dateKey}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <NavBar onAddHabit={false} />

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back!</h1>
          <p className="text-gray-400">
            Track your daily habits and build lasting routines
          </p>
        </div>

        <div className="text-center mb-12 ">
          <div className="relative">
            <Stats habitCompletions={habitCompletions} habitData={habitData} />
          </div>
        </div>
        <HabitList
          habitCompletions={habitCompletions}
          toggleHabit={toggleHabit}
          addHabit={addCompletionHabit}
        />
      </div>

      <div className="text-center py-8 border-t border-gray-800/50">
        <p className="text-gray-500 text-sm">
          "Success is the sum of small efforts repeated day in and day out." -
          Robert Collier
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
