import axios from 'axios';
import { Task } from '../types/Task';

const API_BASE_URL = 'http://localhost:8081/api';

export const api = {
    getAllTasks: async () => {
        const response = await axios.get<Task[]>(`${API_BASE_URL}/tasks`);
        return response.data;
    },

    getTasksByStatus: async (completed: boolean) => {
        const response = await axios.get<Task[]>(`${API_BASE_URL}/tasks/status?completed=${completed}`);
        return response.data;
    },

    createTask: async (task: Omit<Task, 'id'>) => {
        const response = await axios.post<Task>(`${API_BASE_URL}/tasks`, task);
        return response.data;
    },

    updateTask: async (id: number, task: Task) => {
        const response = await axios.put<Task>(`${API_BASE_URL}/tasks/${id}`, task);
        return response.data;
    },

    deleteTask: async (id: number) => {
        await axios.delete(`${API_BASE_URL}/tasks/${id}`);
    },

    toggleTaskStatus: async (id: number) => {
        const response = await axios.patch<Task>(`${API_BASE_URL}/tasks/${id}/toggle`);
        return response.data;
    }
}; 