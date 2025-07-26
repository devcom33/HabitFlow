import { useState, useEffect } from "react";
import {
  getHabitsService,
  getGridHabitsService,
} from "../services/getHabitsService";
import { updateHabitService } from "../services/updateHabitService";

const useHabitData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [habits, setHabits] = useState([]);
  const [habitData, setHabitData] = useState({});
  const [gridLoading, setGridLoading] = useState(false);

  const fetchHabits = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getHabitsService();
      console.log("Fetched habits:", result);
      setHabits(result.habits || result || []);
    } catch (error) {
      console.error("Error fetching habits:", error);
      setError(error.message || "Failed to fetch habits");
    } finally {
      setLoading(false);
    }
  };

  const fetchGridData = async () => {
    try {
      setGridLoading(true);
      const gridData = await getGridHabitsService();
      console.log("Fetched grid data:", gridData);
      setHabitData(gridData);
    } catch (error) {
      console.error("Error fetching grid data:", error);
    } finally {
      setGridLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchHabits(), fetchGridData()]);
    };
    loadData();
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const completedCount = habits.filter((h) => h.completed).length;
    setHabitData((prev) => ({
      ...prev,
      [today]: completedCount,
    }));
  }, [habits]);

  const toggleHabit = async (habitId) => {
    console.log("habit id:", habitId);

    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id === habitId) {
          const updatedHabit = { ...habit, completed: !habit.completed };
          console.log("habit-completed:", updatedHabit.completed);

          // Call API to update habit
          updateHabitService(habitId, updatedHabit.completed).catch((error) => {
            console.error("Failed to update habit:", error);
            setHabits((prevHabits) =>
              prevHabits.map((h) =>
                h.id === habitId
                  ? { ...h, completed: !updatedHabit.completed }
                  : h
              )
            );
          });

          return updatedHabit;
        }
        return habit;
      })
    );
  };

  const addHabit = (habitName) => {
    const newHabit = {
      id: Date.now(),
      name: habitName,
      completed: false,
    };

    setHabits((prevHabits) => [...prevHabits, newHabit]);
  };

  const refreshGridData = () => {
    fetchGridData();
  };

  return {
    habits,
    toggleHabit,
    addHabit,
    habitData,
    loading,
    error,
    gridLoading,
    refetch: fetchHabits,
    refreshGridData,
  };
};

export default useHabitData;
