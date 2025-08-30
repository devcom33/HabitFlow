import React from "react";
import { TrendingUp } from "lucide-react";

const Stats = ({ habitCompletions, habitData }) => {
  const today = new Date().toISOString().split("T")[0];
  const completed = habitData[today] || 0;
  const total = habitCompletions.length;
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
    <div className="inline-flex items-center gap-6 px-6 py-3 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-full">
      <div className="text-center">
        <div className="text-2xl font-bold text-green-400">
          {completed}/{total}
        </div>
        <div className="text-xs text-gray-500">Today's Progress</div>
      </div>
      <div className="w-px h-8 bg-gray-600" />
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-400">{percent}</div>
        <div className="text-xs text-gray-500">Completion Rate</div>
      </div>
      <div className="w-px h-8 bg-gray-600" />
      <div className="text-center">
        <div className="text-2xl font-bold text-purple-400">{total}</div>
        <div className="text-xs text-gray-500">Total Habits</div>
      </div>
      {/*<div className="text-center col-span-2">
          <div className="text-3xl font-bold text-purple-400">
            {currentStreak}
          </div>
          <div className="text-gray-400 text-sm">Day Streak</div>
  </div>*/}
    </div>
  );
};

export default Stats;
