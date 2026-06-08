import api from "../configs/api";
import type { Step } from "../types/entities";

const token = () => localStorage.getItem("token");

export const stepService = {
  async getAll(): Promise<Step[]> {
    const { data } = await api.get<Step[]>("/steps");
    return data;
  },

  async getById(id: number): Promise<Step> {
    const { data } = await api.get<Step>(`/steps/${id}`);
    return data;
  },

  async create(step: Partial<Step>): Promise<Step> {
    const { data } = await api.post<Step>("/steps", step, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return data;
  },

  async update(id: number, step: Partial<Step>): Promise<Step> {
    const { data } = await api.patch<Step>(`/steps/${id}`, step, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/steps/${id}`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
  },
};
