import axios from "axios";

// Define separate API URLs for users and todos
const USERS_API_URL = "http://localhost:8000/api/"; // For users
const TODOS_API_URL = "http://localhost:8000/api/todos/"; // For todos

// Existing user-related functions
export const getUsers = async () => {
  const response = await axios.get(USERS_API_URL);
  return response.data;
};

export const addUser = async (user: { name: string; email: string }) => {
  const response = await axios.post(USERS_API_URL, user);
  return response.data;
};

export const updateUser = async (id: number, user: { name: string; email: string }) => {
  const response = await axios.put(`${USERS_API_URL}${id}/`, user);
  return response.data;
};

export const deleteUser = async (id: number) => {
  await axios.delete(`${USERS_API_URL}${id}/`);
};

// New todo-related functions
export const getTodo = async () => {
  const response = await axios.get(TODOS_API_URL);
  return response.data;
};

export const addTodo = async (todo: { description: string; completed?: boolean }) => {
  const response = await axios.post(TODOS_API_URL, {
    description: todo.description,
    completed: todo.completed || false, // Default to false if not provided
  });
  return response.data;
};

export const updateTodo = async (id: number, todo: { description?: string; completed?: boolean }) => {
  const response = await axios.patch(`${TODOS_API_URL}${id}/`, todo); // Use PATCH for partial updates
  return response.data;
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`${TODOS_API_URL}${id}/`);
};