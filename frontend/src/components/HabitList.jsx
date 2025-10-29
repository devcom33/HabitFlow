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
import { getHabitsByCategoryService } from "../services/getHabitsService";
import { getCategoriesService } from "../services/getCategoriesService";

const HabitList = ({ habitCompletions, toggleHabit, onAddHabit }) => {
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const pageSize = 9;
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await getCategoriesService();
      const categoryNames = res.map((category) => category.name);
      setCategories(categoryNames);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDayClick = (dateKey) => {
    console.log(`Clicked on ${dateKey}`);
  };

  const handleAddHabit = (habitName) => {
    onAddHabit(habitName);
    setShowAddHabit(false);
  };

  const getHabitsByCategory = async (category, page = 0) => {
    try {
      setLoading(true);
      const result = await getHabitsByCategoryService(category, page, pageSize);
      console.log("Filtered habits:", result);
      setFilteredHabits(Array.isArray(result.content) ? result.content : []);
      setTotalPages(result.totalPages || 0);
      setTotalElements(result.totalElements || 0);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching habits:", error);
      setFilteredHabits([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHabitsByCategory(selectedCategory, 0);
    console.log("selected habits : ", selectedCategory);
  }, [selectedCategory]);

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
            <select
              className="white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All categories</option>
              {categories.length > 0 &&
                categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
            </select>
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
        {loading ? (
          <div className="text-center">Loading...</div> // Loading indicator
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-4">
            {filteredHabits?.map((habit) => (
              <HabitItem
                key={habit.id}
                completion={habit}
                toggleHabit={toggleHabit}
                onDayClick={handleDayClick}
              />
            ))}
            {filteredHabits.length === 0 && (
              <p>No habits found for this category.</p>
            )}
          </div>
        )}
        {totalPages > 1 && (
          <div>
            <button
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              onClick={() =>
                getHabitsByCategory(selectedCategory, currentPage - 1)
              }
              disabled={currentPage === 0}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              onClick={() =>
                getHabitsByCategory(selectedCategory, currentPage + 1)
              }
              disabled={currentPage >= totalPages - 1}
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
