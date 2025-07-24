import React from "react";
import { Calendar } from "lucide-react";

const HabitGrid = () => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), 0, 1);

  console.log("Today : ", today);
  console.log("startDate : ", startDate);

  const weeks = Array.from({ length: 52 }, (_, weekIndex) => (
    <div key={weekIndex} className="flex flex-col gap-1">
      {Array.from({ length: 7 }, (_, dayIndex) => (
        <div
          key={dayIndex}
          className="w-3 h-3 bg-gray-800 rounded-sm cursor-pointer transition-all hover:scale-110 hover:bg-green-700"
          title="Click to view day details"
        />
      ))}
    </div>
  ));

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" />
          Habit Progress
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-gray-800 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-900 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-700 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
          </div>
          <span>More</span>
        </div>
      </div>
      <div className="flex gap-1 overflow-x-auto pb-2">{weeks}</div>
    </div>
  );
};

export default HabitGrid;
