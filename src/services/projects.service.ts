import api from "../configs/api";
import type { Project } from "../types/entities";

const token = () => localStorage.getItem("token") || localStorage.getItem("@Sinap:token");

export const projectService = {
  async getActiveProjects(): Promise<Project[]> {
    const { data } = await api.get<Project[]>("/projects/dashboard/active");
    return data;
  },

  async getBacklogQueue(limit?: number): Promise<Project[]> {
    const params = limit ? { limit } : undefined;
    const { data } = await api.get<Project[]>("/projects/dashboard/queue", {
      params,
    });
    return data;
  },

  async getAll(): Promise<Project[]> {
    const { data } = await api.get<Project[]>("/projects", {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return data;
  },

  async getById(id: number): Promise<Project> {
    if (!id || isNaN(id)) throw new Error("ID de projeto inválido");
    const { data } = await api.get<Project>(`/projects/${id}`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return data;
  },

  async create(project: Partial<Project>): Promise<Project> {
    const { data } = await api.post<Project>("/projects", project, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return data;
  },

  async update(id: number, project: Partial<Project>): Promise<Project> {
    if (!id || isNaN(id)) throw new Error("ID de projeto inválido");
    const { data } = await api.patch<Project>(`/projects/${id}`, project, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return data;
  },

  async delete(id: number): Promise<void> {
    if (!id || isNaN(id)) throw new Error("ID de projeto inválido");
    await api.delete(`/projects/${id}`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
  },

  async getGanttData(projectId: number): Promise<any[]> {
    if (!projectId || isNaN(projectId)) throw new Error("ID de projeto inválido");
    const { data } = await api.get(`/projects/${projectId}/gantt`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return data;
  },
};
