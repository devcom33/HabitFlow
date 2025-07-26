import axios from "../api/axiosConfig";

export const getHabitsService = async () => {
  try {
    const response = await axios.get("/api/getHabits");

    return response.data;
  } catch (error) {
    console.error(
      "Error displaying habits:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getGridHabitsService = async () => {
  try {
    const response = await axios.get("/api/getHabits");
    const dataGrids = response.data;

    // Process the data to create grid data
    const grids = dataGrids.reduce((acc, habit) => {
      const date = habit.date || habit.createdAt || habit.completedAt;
      if (date) {
        const dateKey = new Date(date).toISOString().split("T")[0];
        acc[dateKey] = (acc[dateKey] || 0) + (habit.completed ? 1 : 0);
      }
      return acc;
    }, {});

    return grids;
  } catch (error) {
    console.error(
      "Error displaying grids:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
