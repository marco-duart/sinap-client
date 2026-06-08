import api from "../configs/api";
import type { EstimationSession, EstimationTopic } from "../types/entities";

const token = () => localStorage.getItem("token");

export const planningPokerService = {
  async createSession(projectId?: number): Promise<EstimationSession> {
    const { data } = await api.post<EstimationSession>(
      "/planning-poker/sessions",
      { projectId },
      {
        headers: { Authorization: `Bearer ${token()}` },
      }
    );
    return data;
  },

  async createTopic(
    sessionId: number,
    taskId?: number,
    referenceTitle?: string
  ): Promise<EstimationTopic> {
    const { data } = await api.post<EstimationTopic>(
      "/planning-poker/topics",
      { sessionId, taskId, referenceTitle },
      {
        headers: { Authorization: `Bearer ${token()}` },
      }
    );
    return data;
  },

  async getSession(id: number): Promise<EstimationSession> {
    const { data } = await api.get<EstimationSession>(
      `/planning-poker/sessions/${id}`,
      {
        headers: { Authorization: `Bearer ${token()}` },
      }
    );
    return data;
  },
};
