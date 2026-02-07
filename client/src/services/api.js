import axios from "axios";

const API_URL = "http://localhost:5000/api";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const registerUser = (data) =>
  axios.post(`${API_URL}/auth/register`, data);

export const loginUser = (data) =>
  axios.post(`${API_URL}/auth/login`, data);

export const getTasks = () =>
  axios.get(`${API_URL}/tasks`, authHeader());

export const createTask = (data) =>
  axios.post(`${API_URL}/tasks`, data, authHeader());

export const deleteTask = (id) =>
  axios.delete(`${API_URL}/tasks/${id}`, authHeader());

export const updateTask = (id, data) =>
  axios.put(`${API_URL}/tasks/${id}`, data, authHeader());
