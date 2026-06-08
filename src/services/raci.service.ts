import api from "../configs/api";
import type { ProjectRaci } from "../types/entities";

const token = () => localStorage.getItem("token");

export const raciService = {
  async getByProject(projectId: number): Promise<ProjectRaci[]> {
    const { data } = await api.get<ProjectRaci[]>(
      `/raci/project/${projectId}`,
      {
        headers: { Authorization: `Bearer ${token()}` },
      }
    );
    return data;
  },

  async assign(
    projectId: number,
    assignments: Array<{ userId: number; raciRole: string }>
  ): Promise<ProjectRaci[]> {
    const { data } = await api.post<ProjectRaci[]>(
      `/raci/project/${projectId}/assign`,
      { assignments },
      {
        headers: { Authorization: `Bearer ${token()}` },
      }
    );
    return data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/raci/${id}`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
  },
};
