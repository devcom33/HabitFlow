import { useState, useEffect } from "react";
import { getHabitsByCategoryService } from "../services/getHabitsService";
import { updateHabitService } from "../services/updateHabitService";

const useFilteredHabits = (category, page = 0, size = 9) => {
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);

  const fetchHabits = async (cat = category, pg = page) => {
    try {
      setLoading(true);
      const result = await getHabitsByCategoryService(cat, pg, size);
      setFilteredHabits(result.content || []);
      setTotalPages(result.totalPages || 0);
      setTotalElements(result.totalElements || 0);
      setCurrentPage(pg);
    } catch (err) {
      console.error("Failed to fetch habits:", err);
      setFilteredHabits([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  };

  const toggleHabit = async (completionId) => {
    setFilteredHabits((prev) =>
      prev.map((habit) =>
        habit.id === completionId
          ? { ...habit, completed: !habit.completed }
          : habit
      )
    );

    try {
      const habit = filteredHabits.find((h) => h.id === completionId);
      await updateHabitService(completionId, !habit.completed);
    } catch (err) {
      console.error("Failed to update habit:", err);
      // rollback if API fails
      setFilteredHabits((prev) =>
        prev.map((habit) =>
          habit.id === completionId
            ? { ...habit, completed: !habit.completed }
            : habit
        )
      );
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [category]);

  return {
    filteredHabits,
    loading,
    totalPages,
    totalElements,
    currentPage,
    fetchHabits,
    setCurrentPage,
    toggleHabit,
  };
};

export default useFilteredHabits;
