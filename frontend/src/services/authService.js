import { login as loginApi } from "../api/authApi";

export const login = async (email, password) => {
  try {
    const response = await loginApi(email, password);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
  } catch (e) {
    console.error("login error ", e);
    throw e;
  }
};
