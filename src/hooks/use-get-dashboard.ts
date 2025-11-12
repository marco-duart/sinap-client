import { useEffect, useState } from "react";
import type {
  GetActiveProjects,
  GetBacklogProjects,
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

export const useGetDashboard = () => {
  const [dashboard, setDashboard] = useState<Dashboard>(
    INITIAL_DASHBOARD_STATE
  );

  const fetchActiveProjects = async () => {
    setDashboard((prevState) => ({ ...prevState, loading: true }));

    const { message, success, data } = await GetActiveProjectsService();

    if (success && data) {
      setDashboard((prevState) => ({
        ...prevState,
        activeProjects: data,
        loading: false,
      }));
    } else {
      setDashboard((prevState) => ({ ...prevState, loading: false }));
      toast.error(message);
    }
  };

  const fetchBacklogProjects = async () => {
    setDashboard((prevState) => ({ ...prevState, loading: true }));

    const { message, success, data } = await GetBacklogProjectsService();

    if (success && data) {
      setDashboard((prevState) => ({
        ...prevState,
        backlogProjects: data,
        loading: false,
      }));
    } else {
      setDashboard((prevState) => ({ ...prevState, loading: false }));
      toast.error(message);
    }
  };

  useEffect(() => {
    fetchActiveProjects();
    fetchBacklogProjects();
  }, []);

  return {
    dashboard,
    fetchActiveProjects,
    fetchBacklogProjects,
  };
};
