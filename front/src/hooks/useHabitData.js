import { useState, useEffect } from "react";
import { getHabitsService } from "../services/getHabitsService";

const useHabitData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [habits, setHabits] = useState([]);
  const [habitData, setHabitData] = useState({});

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
  useEffect(() => {
    fetchHabits();
  }, []);

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
      id: Date.now(),
      name: habitName,
      completed: false,
    };

    setHabits((prevHabits) => [...prevHabits, newHabit]);
  };

  return [habits, toggleHabit, addHabit, habitData];
};

export default useHabitData;
