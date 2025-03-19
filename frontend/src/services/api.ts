import axios from "axios";
import { Todo } from "../types/todo";

const API_URL = "http://localhost:5001/api";

export const api = {
  getTodos: async (): Promise<Todo[]> => {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
  },

  createTodo: async (title: string): Promise<Todo> => {
    const response = await axios.post(`${API_URL}/todos`, { title });
    return response.data;
  },

  toggleTodo: async (id: string): Promise<Todo> => {
    const response = await axios.patch(`${API_URL}/todos/${id}`);
    return response.data;
  },

  deleteTodo: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/todos/${id}`);
  },
};
