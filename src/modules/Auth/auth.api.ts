import type { OtpResponse } from "./auth.types";

export const sendOtp = async (phone: string): Promise<OtpResponse> => {
  const res = await fetch("http://localhost:5000/send-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone }),
  });
  return res.json();
};

export const verifyOtp = async (phone: string, otp: string) => {
  const res = await fetch("http://localhost:5000/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, otp }),
  });
  return res.json();
};

