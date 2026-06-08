import React, { createContext, useContext, useState, useEffect } from "react";
import type { User, LoginDto, RegisterDto } from "../types/auth";
import { authService } from "../services/auth.service";
import toast from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restaurar sessão ao iniciar
  useEffect(() => {
    const token = authService.getToken();
    const storedUser = authService.getUser();

    if (token && storedUser) {
      setUser(storedUser);
    }

    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginDto) => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);
      authService.setToken(response.token);
      authService.setUser(response.user);
      setUser(response.user);
      toast.success("Login realizado com sucesso!");
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao fazer login";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterDto) => {
    try {
      setIsLoading(true);
      await authService.register(data);
      toast.success("Usuário criado com sucesso! Faça login agora.");
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao registrar";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    toast.success("Logout realizado");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
