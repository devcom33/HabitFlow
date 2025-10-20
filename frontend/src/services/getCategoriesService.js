import axios from "../api/axiosConfig";

export const getCategoriesService = async () => {
  try {
    const response = await axios.get("/api/categories");

    return response.data;
  } catch (error) {
    console.error(
      "Error displaying categories:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
