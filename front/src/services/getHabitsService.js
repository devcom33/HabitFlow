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
