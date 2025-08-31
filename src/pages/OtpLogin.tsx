import { useState } from "react";

import OtpVerify from "./OtpVerify";
import { sendOtp, checkUserExists, signupUser } from "../Queries/auth.api"
import { useMutation } from "@tanstack/react-query";
import logo from "../assets/swiggy_logo.webp";
import Input from "../components/InputField/Input";
import Button from "../components/Button/Button";

type Mode = "login" | "signup";

const AuthFlow = ({ onClose }: { onClose: () => void }) => {
  const [mode, setMode] = useState<Mode>("login");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const { mutate: triggerOtp, isPending: otpLoading } = useMutation({
    mutationFn: sendOtp,
    onSuccess: () => setOtpSent(true),
    onError: () => alert("Failed to send OTP"),
  });

  const { mutate: signup, isPending: signupLoading } = useMutation({
    mutationFn: signupUser,
    onSuccess: () => triggerOtp(phone),
    onError: () => alert("Signup failed"),
  });

  const handleLogin = async () => {
    if (phone.length !== 10) return alert("Enter valid phone");
    const exists = await checkUserExists(phone);
    if (exists) triggerOtp(phone);
    else alert("Phone not registered. Please create an account.");
  };

  const handleSignup = () => {
    if (!name || !email || phone.length !== 10) {
      alert("Fill all fields correctly");
      return;
    }
    signup({ phone, name, email });
  };

  return (
    <div className="w-full max-w-md p-6 bg-white  mx-auto">
      <div className="flex justify-between items-start">
        <div className="flex-1 space-y-2">
          <h2 className="text-3xl font-bold">
            {mode === "login" ? "Login" : "Sign up"}
          </h2>
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-sm text-orange-600 font-bold"
          >
            {mode === "login"
              ? "or create an account"
              : "or login to your account"}
          </button>
        </div>
        <img
          src={logo}
          alt="wrap"
          className="w-20 h-20 object-contain rounded-full"
        />
      </div>

      {otpSent ? (
        <OtpVerify phone={phone} onSuccess={onClose} />
      ) : (
        <div className="space-y-4 mt-6">
          <Input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={setPhone}
          />

          {mode === "signup" && (
            <>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={setName}
                className="w-full border p-3 rounded outline-none"
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={setEmail}
                className="w-full border p-3 rounded outline-none"
              />
            </>
          )}

          <Button
            onClick={mode === "login" ? handleLogin : handleSignup}
            disabled={otpLoading || signupLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded"
          >
            {mode === "login"
              ? otpLoading
                ? "Sending OTP..."
                : "LOGIN"
              : signupLoading
              ? "Creating..."
              : "CONTINUE"}
          </Button>

          <p className="text-xs text-gray-600">
            By {mode === "login" ? "clicking on Login" : "creating an account"},
            I accept the{" "}
            <span className="font-semibold">Terms & Conditions</span> &{" "}
            <span className="font-semibold">Privacy Policy</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthFlow;
