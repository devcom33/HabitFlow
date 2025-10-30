import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import HabitItem from "./HabitItem";
import AddHabitModal from "./AddHabitModal";
import { getCategoriesService } from "../services/getCategoriesService";
import useFilteredHabits from "../hooks/useFilteredHabits";

const HabitList = ({ onAddHabit }) => {
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    filteredHabits,
    loading,
    totalPages,
    currentPage,
    toggleHabit,
    fetchHabits,
    setCurrentPage,
  } = useFilteredHabits(selectedCategory);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesService();
        setCategories(res.map((c) => c.name));
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleDayClick = (dateKey) => {
    console.log(`Clicked on ${dateKey}`);
  };

  const handleAddHabit = (habitName) => {
    onAddHabit(habitName);
    setShowAddHabit(false);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      fetchHabits(selectedCategory, currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      fetchHabits(selectedCategory, currentPage + 1);
    }
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

          <div className="sm:flex-shrink-0 sm:self-auto self-start flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="">All categories</option>
              {categories.map((category, idx) => (
                <option key={idx} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setShowAddHabit(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-3 sm:px-4 py-2 text-sm shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Habit</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-4">
            {filteredHabits.length > 0 ? (
              filteredHabits.map((habit) => (
                <HabitItem
                  key={habit.id}
                  completion={habit}
                  toggleHabit={toggleHabit}
                  onDayClick={handleDayClick}
                />
              ))
            ) : (
              <p>No habits found for this category.</p>
            )}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex gap-2 mt-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
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
