import axios from "./axiosConfig";

export const login = (username, password) => {
  return axios.post("/api/v1/auth/authenticate", {
    email: username,
    password: password,
  });
};
