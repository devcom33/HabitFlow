import React, { useState, useEffect } from "react";
import { CheckCircle, Plus } from "lucide-react";

const HabitList = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: "Drink 8 glasses of water", completed: false },
    { id: 2, name: "Exercise for 30 minutes", completed: true },
    { id: 3, name: "Read for 20 minutes", completed: false },
    { id: 4, name: "Meditate for 10 minutes", completed: false },
  ]);

  const [habitData, setHabitData] = useState({});

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const completedCount = habits.filter((h) => h.completed).length;

    setHabitData((prev) => ({
      ...prev,
      [today]: completedCount,
    }));
  }, [habits]);

  const toggleHabit = (habitId) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const addHabit = (habitName) => {
    const newHabit = {
      id: new Date(),
      name: habitName,
      completed: false,
    };
    setHabits((prevHabits) => [...prevHabits, newHabit]);
  };

  const handleDayClick = (dateKey) => {
    console.log(`Clicked on ${dateKey}`);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-green-400" />
        Today's Habits
      </h2>

      <div className="space-y-3 mb-4">
        {/* Example habit items - replace with your dynamic list */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700">
          <span className="text-white">Drink 8 glasses of water</span>
          <button className="w-6 h-6 rounded-full border-2 border-gray-400 hover:border-green-400 transition-colors"></button>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-green-900">
          <span className="text-green-200 line-through">
            Exercise for 30 minutes
          </span>
          <button className="w-6 h-6 rounded-full border-2 bg-green-500 border-green-500 flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700">
          <span className="text-white">Read for 20 minutes</span>
          <button className="w-6 h-6 rounded-full border-2 border-gray-400 hover:border-green-400 transition-colors"></button>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700">
          <span className="text-white">Meditate for 10 minutes</span>
          <button className="w-6 h-6 rounded-full border-2 border-gray-400 hover:border-green-400 transition-colors"></button>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a new habit..."
          className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>
    </div>
  );
};

export default HabitList;
