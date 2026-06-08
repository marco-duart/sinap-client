import api from "../configs/api";
import type { Task } from "../types/entities";

const token = () => localStorage.getItem("token");

export const taskService = {
  async getAll(): Promise<Task[]> {
    const { data } = await api.get<Task[]>("/tasks", {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return data;
  },

  async getById(id: number): Promise<Task> {
    const { data } = await api.get<Task>(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return data;
  },

  async getByProject(projectId: number): Promise<Task[]> {
    const { data } = await api.get<Task[]>(`/tasks/project/${projectId}`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return data;
  },

  async create(task: Partial<Task>): Promise<Task> {
    const { data } = await api.post<Task>("/tasks", task, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return data;
  },

  async update(id: number, task: Partial<Task>): Promise<Task> {
    const { data } = await api.patch<Task>(`/tasks/${id}`, task, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
  },
};
