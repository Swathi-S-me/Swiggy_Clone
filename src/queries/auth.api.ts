import type { OtpResponse } from "../modules/Auth/auth.types";

export const sendOtp = async (phone: string): Promise<OtpResponse> => {
  const res = await fetch("http://localhost:5000/send-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone }),
  });
  
  if (!res.ok) throw new Error("Failed to send OTP");
  return res.json();
};

export const verifyOtp = async (phone: string, otp: string) => {
  const res = await fetch("http://localhost:5000/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, otp }),
  });
  
  if (!res.ok) throw new Error("Failed to verify OTP");
  return res.json();
};

export const checkUserExists = async (phone: string): Promise<boolean> => {
  const res = await fetch(`http://localhost:5000/users?phone=${phone}`);
  if (!res.ok) throw new Error("Failed to check user existence");
  
  const data = await res.json();
  return data.length > 0;
};

export const signupUser = async ({
  phone,
  name,
  email,
}: {
  phone: string;
  name: string;
  email: string;
}) => {
  const res = await fetch("http://localhost:5000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, name, email }),
  });
  
  if (!res.ok) throw new Error("Signup failed");
  return res.json();
};
