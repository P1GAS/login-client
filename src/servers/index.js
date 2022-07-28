import axios from "axios";
import { axiosJWT, axiosWithCredentials } from "plugins/axios";

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}/api`;

const login = async (email, password) =>
  await axiosWithCredentials.post("/auth/login", { email, password });

const register = async (email, password, name, birthdate, gender) =>
  await axiosWithCredentials.post("/auth/register", {
    email,
    password,
    name,
    birthdate,
    gender,
  });

const getUsers = async () => await axiosJWT.get("/users");

const getCurrentUser = async () => await axiosJWT.get("/users/me");

const updateProfile = async (name, prevPassword, newPassword) =>
  await axiosJWT.patch("/users/update", { name, prevPassword, newPassword });

const updateAvatar = async (avatar) => {
  const formData = new FormData();
  formData.append("avatar", avatar);

  const headers = { "Content-Type": "multipart/form-data" };

  return await axiosJWT.patch("/users/update/avatar", formData, { headers });
};

const getUserById = async (userId) => await axios.get(`/users/${userId}`);

const getNewTokens = async () =>
  await axiosWithCredentials.get("/tokens/refresh");

const logout = async () => await axiosJWT.get("/auth/logout");

export {
  login,
  register,
  getUsers,
  getCurrentUser,
  updateProfile,
  updateAvatar,
  getUserById,
  getNewTokens,
  logout,
};
