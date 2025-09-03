import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import {
  addHabitService,
  addHabitStatsService,
} from "../services/addHabitService";

const AddHabitModal = ({ isOpen, onClose, onAddHabit }) => {
  const [habitName, setHabitName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (habitName.trim()) {
      const habit = await addHabitService(newHabit.trim());
      const Completion = await addHabitStatsService(habit.id);
      onAddHabit(Completion.trim());
      setHabitName("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="flex items-center justify-center">
              <Plus className="w-4 h-4 text-white" />
            </div>
            Add Habit
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Habit Name
              </label>
              <input
                type="text"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                placeholder="e.g., Drink 8 glasses of water"
                className="w-full bg-gray-700/50 text-white px-4 py-3 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                autoFocus
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-400 hover:text-white border border-gray-600 rounded-xl hover:border-gray-500 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-4 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed font-medium"
                disabled={!habitName.trim()}
              >
                Add Habit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHabitModal;
