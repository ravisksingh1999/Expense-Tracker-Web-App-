import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const register = (userData) =>
  axios.post(`${API_URL}/auth/register`, userData);
export const login = (userData) =>
  axios.post(`${API_URL}/auth/login`, userData);
export const getProfile = (token) =>
  axios.get(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addExpense = (data, token) =>
  axios.post(`${API_URL}/expenses/add`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getExpenses = (token) => {
  console.log("🔹 Fetching expenses with token:", token); // ✅ Debugging
  return axios.get(`${API_URL}/expenses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const deleteExpense = (id, token) =>
  axios.delete(`${API_URL}/expenses/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
