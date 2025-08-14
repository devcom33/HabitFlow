import axios from "../api/axiosConfig";

export const updateHabitService = async (id, completed) => {
  try {
    const response = await axios.patch(`/api/updateHabit/${id}`, { completed });

    return response.data;
  } catch (error) {
    console.error("Update failed");
    throw error;
  }
};
