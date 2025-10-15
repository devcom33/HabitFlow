import React, { useState } from "react";
import { CheckCircle, Calendar, Plus } from "lucide-react";
import HabitItem from "./HabitItem";
import AddHabitModal from "./AddHabitModal";

const HabitList = ({ habitCompletions, toggleHabit, onAddHabit }) => {
  const [showAddHabit, setShowAddHabit] = useState(false);

  const handleDayClick = (dateKey) => {
    console.log(`Clicked on ${dateKey}`);
  };
  const handleAddHabit = (habitName) => {
    onAddHabit(habitName);
    setShowAddHabit(false);
  };
  return (
    <>
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 sm:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              My Habits
            </h2>
            <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
          <div className="sm:flex-shrink-0 sm:self-auto self-start">
            <button
              onClick={() => setShowAddHabit(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-3 sm:px-4 py-2 text-sm shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition"
              aria-label="Add habit"
            >
              <Plus className="w-4 h-4" />
              <span>Add Habit</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-4">
          {habitCompletions?.map((completion) => (
            <HabitItem
              key={completion.id}
              completion={completion}
              toggleHabit={toggleHabit}
              onDayClick={handleDayClick}
            />
          ))}
        </div>
      </div>
      <AddHabitModal
        isOpen={showAddHabit}
        onClose={() => setShowAddHabit(false)}
        onAddHabit={handleAddHabit}
      />
    </>
  );
};

export default HabitList;
