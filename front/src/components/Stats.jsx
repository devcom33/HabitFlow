import React, { useState } from "react";
import { TrendingUp } from "lucide-react";

const Stats = ({ habits, habitData }) => {
  const today = new Date().toISOString().split("T")[0];
  const completed = habitData[today] || 0;
  const total = habits.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  const calculateStreak = () => {
    let streak = 0;
    const currentDate = new Date();

    while (true) {
      const dateKey = currentDate.toISOString().split("T")[0];
      if ((habitData[dateKey] || 0) > 0) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const currentStreak = calculateStreak();

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-purple-400" />
        Statistics
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-400">
            {completed}/{total}
          </div>
          <div className="text-gray-400 text-sm">Today's Progress</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-400">{percent}</div>
          <div className="text-gray-400 text-sm">Completion Rate</div>
        </div>
        <div className="text-center col-span-2">
          <div className="text-3xl font-bold text-purple-400">
            {currentStreak}
          </div>
          <div className="text-gray-400 text-sm">Day Streak</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
