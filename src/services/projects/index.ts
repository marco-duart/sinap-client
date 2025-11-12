import { isAxiosError } from "axios";
import api from "../../configs/api";
import type { GetActiveProjects, GetBacklogProjects } from "./DTO";

export const GetActiveProjectsService = async () => {
  try {
    const response = await api.get<GetActiveProjects.Response>(
      `/projects/dashboard/active`
    );
    return {
      success: true,
      message: "Projetos ativos encontrados com sucesso",
      data: response.data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
    return {
      success: false,
      message: "Erro desconhecido ao buscar pedido",
    };
  }
};

export const GetBacklogProjectsService = async () => {
  try {
    const response = await api.get<GetBacklogProjects.Response>(
      `/projects/dashboard/queue`
    );
    return {
      success: true,
      message: "Projetos em backlog encontrados com sucesso",
      data: response.data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
    return {
      success: false,
      message: "Erro desconhecido ao buscar pedido",
    };
  }
};
