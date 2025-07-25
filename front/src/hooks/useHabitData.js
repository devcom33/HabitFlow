import { useState, useEffect } from "react";

const useHabitData = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: "Drink 8 glasses of water", completed: false },
    { id: 2, name: "Exercise for 30 minutes", completed: true },
    { id: 3, name: "Read for 20 minutes", completed: false },
    { id: 4, name: "Meditate for 10 minutes", completed: false },
  ]);

  const [habitData, setHabitData] = useState({});

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
      id: new Date(),
      name: habitName,
      completed: false,
    };
    setHabits((prevHabits) => [...prevHabits, newHabit]);
  };

  return [habits, toggleHabit, addHabit];
};

export default useHabitData;
