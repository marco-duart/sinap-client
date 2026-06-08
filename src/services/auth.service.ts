import api from "../configs/api";
import type { LoginDto, RegisterDto, AuthResponse, User } from "../types/auth";

export const authService = {
  async login(credentials: LoginDto): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/login", credentials);
    return data;
  },

  async register(payload: RegisterDto): Promise<User> {
    const { data } = await api.post<User>("/auth/register", payload);
    return data;
  },

  async getMe(): Promise<User> {
    const { data } = await api.get<User>("/auth/me");
    return data;
  },

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  setToken(token: string): void {
    localStorage.setItem("token", token);
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  setUser(user: User): void {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  },

  getUser(): User | null {
    const user = localStorage.getItem("user");
    if (!user || user === "undefined") {
      return null;
    }
    try {
      return JSON.parse(user);
    } catch (error) {
      console.error("Erro ao fazer parse do usuário:", error);
      return null;
    }
  },
};
