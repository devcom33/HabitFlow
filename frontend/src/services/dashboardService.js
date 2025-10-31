import axios from "../api/axiosConfig";

export const getLast7DaysCompletions = async () => {
  try {
    const response = await axios.get("/api/dashboard/last-7-days-completions");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};
