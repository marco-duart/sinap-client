import api from "../configs/api";

const token = () => localStorage.getItem("token");

export interface DashboardMetrics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  backlogProjects: number;
  totalTasks: number;
  completedTasks: number;
  taskCompletionRate: number;
  totalEstimatedEffort: number;
  completedEffort: number;
  averageVelocity: number;
  estimationAccuracy: number;
  scheduleAdherence: number;
  urgentProjects: number;
}

export interface ProjectMetrics {
  projectId: number;
  projectTitle: string;
  priority: string;
  currentStep: string;
  urgencyScore: number;
  importanceScore: number;
  totalTasks: number;
  completedTasks: number;
  taskCompletionRate: number;
  totalEstimatedEffort: number;
  completedEffort: number;
  effortCompletion: number;
  overallProgress: number;
  scheduleDeviation: number;
  scheduleAdherence: number;
  tasksWithPokerEstimate: number;
  tasks: any[];
}

export interface ProductivityMetrics {
  weeklyVelocity: number;
  monthlyVelocity: number;
  averageVelocity: number;
  velocityTrend: number;
  weeklyCompletionRate: number;
  monthlyCompletionRate: number;
  completedTasksLastWeek: number;
  createdTasksLastWeek: number;
  pendingEffort: number;
  inProgressEffort: number;
  projectedCompletionDays: number;
}

export interface TeamPerformanceMetrics {
  teamMembers: any[];
  teamAverageVelocity: number;
  teamAveragePerformanceScore: number;
  workloadBalance: number;
  teamScheduleAdherence: number;
}

export interface EstimationAccuracyMetrics {
  taskAccuracies: any[];
  overallAccuracy: number;
  totalTasksAnalyzed: number;
  onTimeOrEarlyTasks: number;
  lateTasks: number;
  averageDayDeviation: number;
  accuracyTrend: number;
  underestimatedRate: number;
  overestimatedRate: number;
  accurateRate: number;
}

export const metricsService = {
  async getDashboard(): Promise<DashboardMetrics> {
    const { data } = await api.get<DashboardMetrics>("/metrics/dashboard", {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return data;
  },

  async getProjectMetrics(projectId: number): Promise<ProjectMetrics> {
    const { data } = await api.get<ProjectMetrics>(
      `/metrics/projects/${projectId}`,
      {
        headers: { Authorization: `Bearer ${token()}` },
      }
    );
    return data;
  },

  async getProductivity(): Promise<ProductivityMetrics> {
    const { data } = await api.get<ProductivityMetrics>("/metrics/productivity", {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return data;
  },

  async getTeamPerformance(): Promise<TeamPerformanceMetrics> {
    const { data } = await api.get<TeamPerformanceMetrics>(
      "/metrics/team-performance",
      {
        headers: { Authorization: `Bearer ${token()}` },
      }
    );
    return data;
  },

  async getEstimationAccuracy(): Promise<EstimationAccuracyMetrics> {
    const { data } = await api.get<EstimationAccuracyMetrics>(
      "/metrics/estimation-accuracy",
      {
        headers: { Authorization: `Bearer ${token()}` },
      }
    );
    return data;
  },
};
