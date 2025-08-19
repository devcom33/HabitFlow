import React from "react";
import { Calendar, RefreshCw } from "lucide-react";

const HabitGrid = ({ habitData, onDayClick, loading, onRefresh }) => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), 0, 1);

  console.log("Habit Data : ", habitData);
  const getDayIntensity = (date) => {
    const dateKey = date.toISOString().split("T")[0];
    const count = habitData[dateKey] || 0;
    if (count === 0) return "bg-gray-700";
    if (count <= 2) return "bg-green-900";
    if (count <= 4) return "bg-green-700";
    if (count <= 6) return "bg-green-500";
    return "bg-green-400";
  };

  const weeks = [];
  const currentDate = new Date(startDate);
  currentDate.setDate(currentDate.getDate() - currentDate.getDay());

  for (let week = 0; week < 53; week++) {
    const days = [];
    for (let day = 0; day < 7; day++) {
      const dayKey = new Date(currentDate).toISOString().split("T")[0];
      const isToday = dayKey === today.toISOString().split("T")[0];
      const isPastYear = currentDate.getFullYear() < today.getFullYear();

      if (!isPastYear) {
        days.push(
          <div
            key={`${week}-${day}`}
            className={`w-3 h-3 rounded-sm cursor-pointer transition-all hover:scale-110 ${getDayIntensity(
              currentDate
            )} ${isToday ? "ring-2 ring-blue-400" : ""}`}
            onClick={() => onDayClick && onDayClick(dayKey)}
            title={`${currentDate.toDateString()}: ${
              habitData[dayKey] || 0
            } habits completed`}
          />
        );
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (days.length > 0) {
      weeks.push(
        <div key={week} className="flex flex-col gap-1">
          {days}
        </div>
      );
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" />
          Habit Progress
        </h2>
        <div className="flex items-center gap-4">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-1 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
              title="Refresh grid data"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          )}
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
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-400">Loading grid data...</div>
        </div>
      ) : (
        <div className="flex gap-1 overflow-x-auto pb-2">{weeks}</div>
      )}
    </div>
  );
};

export default HabitGrid;
