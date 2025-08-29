import { useState, useEffect } from "react";
import { getGridHabitsService } from "../services/getHabitsService";

const useHabitGrid = (HabitId) => {
  const [gridLoading, setGridLoading] = useState(false);
  const [habitData, setHabitData] = useState({});

  const fetchGridData = async (habitId) => {
    try {
      setGridLoading(true);
      const gridData = await getGridHabitsService(habitId);
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
      await Promise.all([fetchGridData(HabitId)]);
    };
    loadData();
  }, [HabitId]);

  const refreshGridData = () => {
    fetchGridData(HabitId);
  };
  return { habitGridData: habitData, gridLoading, refreshGridData };
};

export default useHabitGrid;
