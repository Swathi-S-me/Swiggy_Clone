// auth.types.ts
export interface OtpResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface User {
  id: string;
  phone: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SignupUserRequest {
  phone: string;
  name: string;
  email: string;
}

export interface SignupUserResponse extends User {
  success?: boolean;
  message?: string;
}