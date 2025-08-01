export interface SendOtpRequest {
  phone: string;
}

export interface VerifyOtpRequest {
  otp: string;
}

export interface OtpResponse {
  success: boolean;
  message: string;
}