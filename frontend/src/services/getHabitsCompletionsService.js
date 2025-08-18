import axios from "../api/axiosConfig";

export const getHabitsCompletionsTodayStatus = async () => {
  try {
    const response = await axios.get("/api/HabitsCompletion/today");

    return response.data;
  } catch (error) {
    console.error(
      "Error displaying habits Status:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
