import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Button from "../../components/Button/Button";

import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

import type { OtpVerifyProps } from "./otpVerify.types";
import Input from "../../components/InputField/Input";
import { useUser } from "../../Queries/useUser";
import { verifyOtp } from "../../Queries/auth.api";

const OtpVerify = ({ phone, onSuccess }: OtpVerifyProps) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const { data: userData } = useUser(phone);

  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      const result = await verifyOtp(phone, otp);
      if (!result.success) {
        throw new Error("Invalid OTP");
      }
      return result;
    },
    onSuccess: () => {
      if (userData) {
        setUser(userData);
        localStorage.setItem("currentUser", JSON.stringify(userData));
         toast.success("Login Successfull");
        onSuccess();
        navigate({ to: "/" });
      }
    },
    onError: () => {
      alert("Invalid OTP");
    },
  });

  const handleVerify = () => {
    verifyOtpMutation.mutate();
  };

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={setOtp}
        className="mt-4"
      />

      <Button
        onClick={handleVerify}
        disabled={verifyOtpMutation.isPending}
        className="flex flex-row bg-green-600 hover:bg-green-700 text-white px-2 py-2 rounded disabled:opacity-50"
      >
        {verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
      </Button>
    </div>
  );
};

export default OtpVerify;
