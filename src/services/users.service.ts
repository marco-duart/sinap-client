import api from "../configs/api";
import type { User } from "../types/auth";

const token = () => localStorage.getItem("token");

export const userService = {
  async getAll(): Promise<User[]> {
    const { data } = await api.get<User[]>("/users", {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return data;
  },

  async getById(id: number): Promise<User> {
    const { data } = await api.get<User>(`/users/${id}`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/users/${id}`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
  },
};
