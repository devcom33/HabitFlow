import axios from "../api/axiosConfig";

export const addHabitService = async (name, category) => {
  try {
    const response = await axios.post("/api/addHabit", {
      name,
      category: { name: category },
    });
    console.log("response : ", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Error creating Habit:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const addHabitStatsService = async (habitId) => {
  try {
    const habitCompletionResponse = await axios.post(
      `/api/habits/${habitId}/completions`
    );
    return habitCompletionResponse.data;
  } catch (error) {
    console.error(
      "Error creating Habit Stats:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
