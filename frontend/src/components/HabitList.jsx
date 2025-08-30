import React, { useState } from "react";
import { CheckCircle, Plus, Calendar } from "lucide-react";
import {
  addHabitService,
  addHabitStatsService,
} from "../services/addHabitService";
import HabitItem from "./HabitItem";

const HabitList = ({ habitCompletions, toggleHabit, addHabit }) => {
  const [newHabit, setNewHabit] = useState("");

  const handleDayClick = (dateKey) => {
    console.log(`Clicked on ${dateKey}`);
  };

  const handleAddHabit = async () => {
    if (newHabit.trim()) {
      const habit = await addHabitService(newHabit.trim());
      const Completion = await addHabitStatsService(habit.id);
      addHabit(Completion);
      setNewHabit("");
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-400" />
          Today's Habits
        </h2>

        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Calendar className="w-4 h-4" />
          <span>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-3 gap-6 mb-4">
        {habitCompletions?.map((completion) => (
          <HabitItem
            key={completion.id}
            completion={completion}
            toggleHabit={toggleHabit}
            onDayClick={handleDayClick}
          />
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddHabit()}
          type="text"
          placeholder="Add a new habit..."
          className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddHabit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>
    </div>
  );
};

export default HabitList;
