import api from "../configs/api";
import type { Artifact } from "../types/entities";

const token = () => localStorage.getItem("token");

export const artifactService = {
  async getAll(): Promise<Artifact[]> {
    const { data } = await api.get<Artifact[]>("/artifacts", {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return data;
  },

  async getById(id: number): Promise<Artifact> {
    const { data } = await api.get<Artifact>(`/artifacts/${id}`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return data;
  },

  async getByProject(projectId: number): Promise<Artifact[]> {
    const { data } = await api.get<Artifact[]>(
      `/artifacts/project/${projectId}`,
      {
        headers: { Authorization: `Bearer ${token()}` },
      }
    );
    return data;
  },

  async create(artifact: Partial<Artifact> | FormData): Promise<Artifact> {
    const headers: any = { Authorization: `Bearer ${token()}` };
    
    // Se for FormData, não setamos Content-Type para deixar o navegador fazer
    if (artifact instanceof FormData) {
      delete headers["Content-Type"];
    }

    const { data } = await api.post<Artifact>("/artifacts", artifact, {
      headers,
    });
    return data;
  },

  async update(id: number, artifact: Partial<Artifact>): Promise<Artifact> {
    const { data } = await api.patch<Artifact>(`/artifacts/${id}`, artifact, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/artifacts/${id}`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
  },
};
