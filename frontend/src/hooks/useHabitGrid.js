import { useState, useEffect, useCallback } from "react";
import { getGridHabitsService } from "../services/getHabitsService";

const useHabitGrid = (habitId) => {
  const [gridLoading, setGridLoading] = useState(false);
  const [habitData, setHabitData] = useState({});

  const fetchGridData = async (id) => {
    try {
      setGridLoading(true);
      const gridData = await getGridHabitsService(id);
      console.log("Fetched grid data:", gridData);
      setHabitData(gridData);
    } catch (error) {
      console.error("Error fetching grid data:", error);
    } finally {
      setGridLoading(false);
    }
  };

  useEffect(() => {
    if (habitId) {
      fetchGridData(habitId);
    }
  }, [habitId]);

  const refreshGridData = useCallback(() => {
    fetchGridData(habitId);
  }, [habitId]);

  return { habitGridData: habitData, gridLoading, refreshGridData };
};

export default useHabitGrid;
