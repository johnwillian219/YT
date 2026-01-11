import { SubscriptionPlan } from "./billing.types.js";

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  plan: SubscriptionPlan;

  // Profile
  avatarUrl?: string;
  timezone?: string;
  language?: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  emailVerified: boolean;
}

export interface CreateUserDto {
  email: string;
  password: string;
  name?: string;
  timezone?: string;
  language?: string;
}

export interface UpdateUserDto {
  name?: string;
  avatarUrl?: string;
  timezone?: string;
  language?: string;
}

export interface UserSession {
  id: string;
  userId: string;
  token: string;
  ipAddress?: string;
  userAgent?: string;
  expiresAt: Date;
  createdAt: Date;
}

export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN";

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  theme: "light" | "dark" | "cyberpunk";
  language: "pt-BR" | "en-US" | "es-ES";
  timezone: string;
}

export interface UserStats {
  totalChannels: number;
  totalVideos: number;
  totalViews: number;
  totalSubscribers: number;
  lastSyncAt?: Date;
}

// Auth related types
export interface LoginDto {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
