import axios from "../api/axiosConfig";

export const getUserDetails = async () => {
  try {
    const response = await axios.get(`/api/v1/user/settings`);
    console.log("info : ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error displaying User details:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const updateUserSettings = async (userInfo) => {
  try {
    const response = await axios.patch(
      `/api/v1/user/settings/update`,
      userInfo,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("info : ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error displaying User details:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
