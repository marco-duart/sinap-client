import { useEffect, useState, useCallback } from "react";
import type {
  GetActiveProjects,
  GetBacklogProjects,
  Project,
} from "../services/projects/DTO";
import {
  GetActiveProjectsService,
  GetBacklogProjectsService,
} from "../services/projects";
import toast from "react-hot-toast";

interface Dashboard {
  activeProjects: GetActiveProjects.Response;
  backlogProjects: GetBacklogProjects.Response;
  loading: boolean;
}

const INITIAL_DASHBOARD_STATE: Dashboard = {
  activeProjects: [],
  backlogProjects: [],
  loading: false,
};

const STEP_NAME_MAP: { [key: string]: string } = {
  BackLog: "Na fila",
  "Design e Requisitos": "Planejamento",
  "Testes Automatizados": "Testes",
  "Code Review": "Avaliação pela equipe",
  Deploy: "Implantação",
};

const mapProjectStepNames = (projects: Project.ProjectWithRelations[]) => {
  return projects.map((project) => {
    const originalName = project.step.name;
    const newName = STEP_NAME_MAP[originalName] || originalName;

    return {
      ...project,
      step: {
        ...project.step,
        name: newName,
      },
    };
  }) as Project.ProjectWithRelations[];
};

export const useGetDashboard = () => {
  const [dashboard, setDashboard] = useState<Dashboard>(
    INITIAL_DASHBOARD_STATE
  );

  const fetchActiveProjects = useCallback(async () => {
    const isFirstLoad =
      dashboard.activeProjects.length === 0 &&
      dashboard.backlogProjects.length === 0;
    if (isFirstLoad) {
      setDashboard((prevState) => ({ ...prevState, loading: true }));
    }

    const { message, success, data } = await GetActiveProjectsService();

    if (success && data) {
      const mappedData = mapProjectStepNames(data);

      setDashboard((prevState) => ({
        ...prevState,
        activeProjects: mappedData,
        loading: isFirstLoad ? false : prevState.loading,
      }));
    } else {
      setDashboard((prevState) => ({
        ...prevState,
        loading: isFirstLoad ? false : prevState.loading,
      }));
      toast.error(message);
    }
  }, [dashboard.activeProjects.length, dashboard.backlogProjects.length]);

  const fetchBacklogProjects = useCallback(async () => {
    const isFirstLoad =
      dashboard.activeProjects.length === 0 &&
      dashboard.backlogProjects.length === 0;
    if (isFirstLoad) {
      setDashboard((prevState) => ({ ...prevState, loading: true }));
    }

    const { message, success, data } = await GetBacklogProjectsService();

    if (success && data) {
      const mappedData = mapProjectStepNames(
        data as Project.ProjectWithRelations[]
      );

      setDashboard((prevState) => ({
        ...prevState,
        backlogProjects: mappedData as GetBacklogProjects.Response,
        loading: isFirstLoad ? false : prevState.loading,
      }));
    } else {
      setDashboard((prevState) => ({
        ...prevState,
        loading: isFirstLoad ? false : prevState.loading,
      }));
      toast.error(message);
    }
  }, [dashboard.activeProjects.length, dashboard.backlogProjects.length]);

  useEffect(() => {
    fetchActiveProjects();
    fetchBacklogProjects();
  }, [fetchActiveProjects, fetchBacklogProjects]);

  return {
    dashboard,
    fetchActiveProjects,
    fetchBacklogProjects,
  };
};
