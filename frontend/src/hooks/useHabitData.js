import { useState, useEffect } from "react";
import {
  getHabitsService,
  getGridHabitsService,
} from "../services/getHabitsService";
import { updateHabitService } from "../services/updateHabitService";
import { getHabitsCompletionsTodayStatus } from "../services/getHabitsCompletionsService";

const useHabitData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [habits, setHabits] = useState([]);
  const [habitCompletions, setHabitCompletions] = useState([]);
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

  const fetchHabitsCompletionsTodayStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getHabitsCompletionsTodayStatus();
      console.log("Fetched Completion habits Status:", result);
      setHabitCompletions(result || []);
    } catch (error) {
      console.error("Error fetching habit Completions:", error);
      setError(error.message || "Failed to fetch habit Completions");
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
      await Promise.all([
        fetchHabits(),
        fetchGridData(),
        fetchHabitsCompletionsTodayStatus(),
      ]);
    };
    loadData();
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const completedCount = habitCompletions.filter((h) => h?.completed).length;
    setHabitData((prev) => ({
      ...prev,
      [today]: completedCount,
    }));
  }, [habitCompletions]);

  const toggleHabit = async (completionId) => {
    setHabitCompletions((prevCompletions) =>
      prevCompletions.map((completion) => {
        if (completion.id === completionId) {
          const updated = { ...completion, completed: !completion.completed };

          // Calling the API to update habit completed status
          updateHabitService(completionId, updated.completed).catch((error) => {
            console.error("Failed to update habit:", error);
            // rollback
            setHabitCompletions((prev) =>
              prev.map((c) =>
                c.id === completionId
                  ? { ...c, completed: !updated.completed }
                  : c
              )
            );
          });
          console.log("Updated Habit : ", updated);
          return updated;
        }
        return completion;
      })
    );
  };

  const addCompletionHabit = (completion) => {
    setHabitCompletions((prev) => [...prev, completion]);
  };

  const refreshGridData = () => {
    fetchGridData();
  };

  return {
    habits,
    habitCompletions,
    toggleHabit,
    addCompletionHabit,
    habitData,
    loading,
    error,
    gridLoading,
    refetch: fetchHabits,
    refreshGridData,
  };
};

export default useHabitData;
