import React from "react";
import { Target, Settings } from "lucide-react";

const NavBar = () => {
  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <Target className="text-blue-400 w-8 h-8" />
          <h1 className="text-2xl font-bold text-white">HabitKit</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-300 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
