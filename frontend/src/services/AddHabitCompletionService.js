import { axios } from "../api/axiosConfig";

export const addHabitCompletionService = async () => {
  try {
    const response = await axios.post("/api/addCompletionStatus");
    console.log("response : ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating HabitCompletion:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
