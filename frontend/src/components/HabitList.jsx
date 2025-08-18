import React, { useState } from "react";
import { CheckCircle, Plus } from "lucide-react";
import {
  addHabitService,
  addHabitStatsService,
} from "../services/addHabitService";

const HabitList = ({ habitCompletions, toggleHabit, addHabit }) => {
  const [newHabit, setNewHabit] = useState("");

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
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-green-400" />
        Today's Habits
      </h2>

      <div className="space-y-3 mb-4">
        {console.log("dispaly Habit Completion : ", habitCompletions)}
        {habitCompletions?.map((completion) => (
          <div
            key={completion.id}
            className={`flex items-center justify-between p-3 rounded-lg ${
              completion.completed ? "bg-green-900" : "bg-gray-700"
            }`}
          >
            <span
              className={`${
                completion.completed
                  ? "text-green-200 line-through"
                  : "text-white"
              }`}
            >
              {completion.habit.name}
            </span>
            <button
              onClick={() => toggleHabit(completion.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                completion.completed
                  ? "bg-green-500 border-green-500"
                  : "border-gray-400 hover:border-green-400"
              }`}
            >
              {console.log("toggle : ", completion)}
              {completion.completed && (
                <CheckCircle className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
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
