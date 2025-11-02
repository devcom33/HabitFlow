import { useState, useEffect } from "react";
import {
  Target,
  GearSix,
  User,
  Bell,
  CalendarBlank,
  ChartBar,
  List,
  X,
  MagnifyingGlass,
} from "phosphor-react";
import { getUserDetails } from "../services/getUserDetails";

const NavBar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const info = await getUserDetails(); // or getUserInfo()
      setUserInfo(info);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

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
              <Target weight="duotone" className="text-blue-400 w-8 h-8" />
              <h1 className="text-2xl font-bold text-white">HabitFlow</h1>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
              <ChartBar weight="duotone" className="w-4 h-4" /> Dashboard
            </a>
            <a
              href="my-habits"
              className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
              <Target weight="duotone" className="w-4 h-4" /> My Habits
            </a>
            <a
              href="#calendar"
              className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
              <CalendarBlank weight="duotone" className="w-4 h-4" /> Calendar
            </a>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search habits..."
              className="bg-slate-800/50 border border-slate-700 text-white pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-64"
            />
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Notifications */}
            <button className="text-slate-400 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-slate-800/50 relative">
              <Bell weight="duotone" className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center text-white">
                3
              </span>
            </button>

            {/* User Profile with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="text-slate-400 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-slate-800/50 flex items-center gap-2"
              >
                <User weight="duotone" className="w-5 h-5" />
                <span className="hidden xl:inline text-sm">
                  {userInfo?.firstname || "Loading..."}
                </span>
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg">
                  <a
                    href="#profile"
                    className="block px-4 py-2 text-slate-300 hover:bg-slate-700"
                  >
                    Profile
                  </a>
                  <a
                    href="settings"
                    className="block px-4 py-2 text-slate-300 hover:bg-slate-700"
                  >
                    Settings
                  </a>

                  <button
                    onClick={() => alert("Logged out")}
                    className="block w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="sm:hidden text-slate-400 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-slate-800/50"
          >
            {showMobileMenu ? (
              <X weight="bold" className="w-6 h-6" />
            ) : (
              <List weight="bold" className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="sm:hidden mt-4 pb-4 border-t border-slate-700/60">
            {/* Mobile Search */}
            <div className="mt-4 relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
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
                <ChartBar weight="duotone" className="w-5 h-5" /> Dashboard
              </a>
              <a
                href="#habits"
                className="flex items-center gap-3 text-slate-300 hover:text-white p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-200"
              >
                <Target weight="duotone" className="w-5 h-5" /> My Habits
              </a>
              <a
                href="#calendar"
                className="flex items-center gap-3 text-slate-300 hover:text-white p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-200"
              >
                <CalendarBlank weight="duotone" className="w-5 h-5" /> Calendar
              </a>
            </div>

            {/* Mobile Action Buttons */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between pt-2">
                <button className="flex items-center gap-2 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800/50 transition-all duration-200 relative">
                  <Bell weight="duotone" className="w-5 h-5" />
                  <span>Notifications</span>
                  <span className="bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center text-white ml-auto">
                    3
                  </span>
                </button>
              </div>

              <button className="w-full flex items-center gap-3 text-slate-400 hover:text-white p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-200">
                <User weight="duotone" className="w-5 h-5" /> Profile (devcom33)
              </button>

              <button className="w-full flex items-center gap-3 text-slate-400 hover:text-white p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-200">
                <GearSix weight="duotone" className="w-5 h-5" /> Settings
              </button>
            </div>

            {/* Mobile Date/Time */}
            <div className="mt-4 pt-4 border-t border-slate-700/60 text-center text-sm text-slate-400">
              {formatDateTime(currentDateTime)} • {formatTime(currentDateTime)}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
