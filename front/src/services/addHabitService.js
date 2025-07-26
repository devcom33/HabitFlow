import axios from "../api/axiosConfig";

export const addHabitService = async (name, completed) => {
  try {
    const response = await axios.post("/api/addHabit", { name, completed });
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
