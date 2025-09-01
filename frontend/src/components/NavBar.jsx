import React from "react";
import { Target, Settings, Plus } from "lucide-react";

const NavBar = () => {
  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <Target className="text-blue-400 w-8 h-8" />
          <h1 className="text-2xl font-bold text-white">HabitFlow</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-101 shadow-lg font-medium">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Habit</span>
          </button>
          <button className="text-gray-400 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-gray-800/50">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
