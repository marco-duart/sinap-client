import api from "../configs/api";
import type { Priority } from "../types/entities";

const token = () => localStorage.getItem("token");

export const priorityService = {
  async getAll(): Promise<Priority[]> {
    const { data } = await api.get<Priority[]>("/priorities");
    return data;
  },

  async getById(id: number): Promise<Priority> {
    const { data } = await api.get<Priority>(`/priorities/${id}`);
    return data;
  },

  async create(priority: Partial<Priority>): Promise<Priority> {
    const { data } = await api.post<Priority>("/priorities", priority, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return data;
  },

  async update(id: number, priority: Partial<Priority>): Promise<Priority> {
    const { data } = await api.patch<Priority>(`/priorities/${id}`, priority, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/priorities/${id}`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
  },
};
