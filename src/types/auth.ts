export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  roleName: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  passwordDigest: string;
  roleLevel?: number;
}
