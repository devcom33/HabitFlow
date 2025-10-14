import React, { useState, useEffect } from "react";
import {
  Target,
  Settings,
  Plus,
  User,
  Bell,
  Calendar,
  BarChart3,
  Menu,
  X,
  Search,
} from "lucide-react";
import AddHabitModal from "./AddHabitModal";

const NavBar = ({ onAddHabit }) => {
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleAddHabit = (habitName) => {
    onAddHabit(habitName);
    setShowAddHabit(false);
  };

  const formatDateTime = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/60 px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <a
              href="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
            >
              <Target className="text-blue-400 w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold text-white">HabitFlow</h1>
                <div className="hidden sm:block text-xs text-slate-400">
                  {formatDateTime(currentDateTime)} •{" "}
                  {formatTime(currentDateTime)}
                </div>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </a>
            <a
              href="my-habits"
              className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
              <Target className="w-4 h-4" />
              My Habits
            </a>
            <a
              href="#calendar"
              className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Calendar
            </a>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search habits..."
              className="bg-slate-800/50 border border-slate-700 text-white pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-64"
            />
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => setShowAddHabit(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden lg:inline">Add Habit</span>
            </button>

            {/* Notifications */}
            <button className="text-slate-400 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-slate-800/50 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center text-white">
                3
              </span>
            </button>

            <button className="text-slate-400 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-slate-800/50">
              <Settings className="w-5 h-5" />
            </button>

            {/* User Profile */}
            <div className="relative">
              <button className="text-slate-400 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-slate-800/50 flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="hidden xl:inline text-sm">devcom33</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="sm:hidden text-slate-400 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-slate-800/50"
          >
            {showMobileMenu ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="sm:hidden mt-4 pb-4 border-t border-slate-700/60">
            {/* Mobile Search */}
            <div className="mt-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search habits..."
                className="w-full bg-slate-800/50 border border-slate-700 text-white pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Mobile Navigation Links */}
            <div className="mt-4 space-y-2">
              <a
                href="#dashboard"
                className="flex items-center gap-3 text-slate-300 hover:text-white p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-200"
              >
                <BarChart3 className="w-5 h-5" />
                Dashboard
              </a>
              <a
                href="#habits"
                className="flex items-center gap-3 text-slate-300 hover:text-white p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-200"
              >
                <Target className="w-5 h-5" />
                My Habits
              </a>
              <a
                href="#calendar"
                className="flex items-center gap-3 text-slate-300 hover:text-white p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-200"
              >
                <Calendar className="w-5 h-5" />
                Calendar
              </a>
            </div>

            {/* Mobile Action Buttons */}
            <div className="mt-4 space-y-2">
              <button
                onClick={() => {
                  setShowAddHabit(true);
                  setShowMobileMenu(false);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add Habit
              </button>

              <div className="flex items-center justify-between pt-2">
                <button className="flex items-center gap-2 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800/50 transition-all duration-200 relative">
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                  <span className="bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center text-white ml-auto">
                    3
                  </span>
                </button>
              </div>

              <button className="w-full flex items-center gap-3 text-slate-400 hover:text-white p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-200">
                <Settings className="w-5 h-5" />
                Settings
              </button>

              <button className="w-full flex items-center gap-3 text-slate-400 hover:text-white p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-200">
                <User className="w-5 h-5" />
                Profile (devcom33)
              </button>
            </div>

            {/* Mobile Date/Time */}
            <div className="mt-4 pt-4 border-t border-slate-700/60 text-center text-sm text-slate-400">
              {formatDateTime(currentDateTime)} • {formatTime(currentDateTime)}
            </div>
          </div>
        )}
      </nav>

      <AddHabitModal
        isOpen={showAddHabit}
        onClose={() => setShowAddHabit(false)}
        onAddHabit={handleAddHabit}
      />
    </>
  );
};

export default NavBar;
