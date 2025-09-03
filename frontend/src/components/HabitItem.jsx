import React from "react";
import { CheckCircle } from "lucide-react";
import HabitMiniGrid from "./HabitMiniGrid";
import useHabitGrid from "../hooks/useHabitGrid";

const HabitItem = ({ completion, toggleHabit, onDayClick }) => {
  const { habitGridData, refreshGridData, gridLoading } = useHabitGrid(
    completion.habit.id
  );

  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/20">
      <div
        className={`absolute top-0 left-0 w-full h-1 ${
          completion.completed
            ? "bg-gradient-to-r from-green-400 to-emerald-500"
            : "bg-gray-600"
        }`}
      />

      <div className="p-3 sm:p-4 lg:p-5 space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0 mr-3 sm:mr-4">
            <h3
              className={`font-medium text-base sm:text-lg transition-all duration-200 ${
                completion.completed
                  ? "text-green-300 opacity-75"
                  : "text-white group-hover:text-gray-100"
              }`}
            >
              {completion.habit.name}
            </h3>
            <div
              className={`text-xs sm:text-sm mt-1 ${
                completion.completed ? "text-green-400/70" : "text-gray-400"
              }`}
            >
              {completion.completed ? "Completed today" : "Not completed"}
            </div>
          </div>

          <button
            onClick={() => toggleHabit(completion.id)}
            className={`relative flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg border-2 flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95 ${
              completion.completed
                ? "bg-gradient-to-br from-green-500 to-emerald-600 border-green-500 shadow-lg shadow-green-500/25"
                : "border-gray-500 hover:border-green-400 hover:shadow-lg hover:shadow-green-400/20 bg-gray-800/50 backdrop-blur-sm"
            }`}
          >
            {completion.completed && (
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-sm flex items-center justify-center">
                <svg
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            {!completion.completed && (
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-sm bg-gray-500 group-hover:bg-green-400 transition-colors duration-200" />
            )}
          </button>
        </div>

        <div className="relative">
          <div className="bg-gray-800/30 rounded-lg p-2 sm:p-3 lg:p-4 border border-gray-700/50 backdrop-blur-sm">
            <HabitMiniGrid
              habitData={habitGridData}
              onDayClick={onDayClick}
              loading={gridLoading}
              onRefresh={refreshGridData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitItem;
