// frontend/src/domains/auth/types/auth.types.ts
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  isEmailVerified: boolean;
  role: UserRole;
  plan: PlanType;
  subscriptionId?: string;
  stripeCustomerId?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
}

export enum PlanType {
  FREE = "FREE",
  PRO = "PRO",
  BUSINESS = "BUSINESS",
  ENTERPRISE = "ENTERPRISE",
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  confirmPassword?: string;
  acceptTerms?: boolean;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  redirectTo?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  login: (authData: AuthResponse) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}
