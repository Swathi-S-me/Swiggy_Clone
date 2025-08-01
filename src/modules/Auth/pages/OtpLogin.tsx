import { useState } from "react";
import PhoneInput from "../components/PhoneInput";
import OtpVerify from "./OtpVerify";
import { useMutation } from "@tanstack/react-query";
import { sendOtp } from "../auth.api";
import Button from "../../../components/Button/Button";

const OtpLogin = () => {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false); 

  const { mutate: triggerOtp, isPending } = useMutation({
    mutationFn: sendOtp,
    onSuccess: () => {
      setOtpSent(true); 
    },
    onError: (error) => {
      console.error("OTP sending failed", error);
    },
  });

  const handleSendOtp = () => {
    if (phone.trim().length === 10) {
      triggerOtp(phone);
    } else {
      alert("Enter valid 10-digit number");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 space-y-4">
      {otpSent ? (
        <OtpVerify phone={phone} />
      ) : (
        <>
        <h1>Login</h1>
          <PhoneInput phone={phone} setPhone={setPhone} />
          <Button onClick={handleSendOtp} disabled={isPending} className="flex flex-row bg-green-600 hover:bg-green-700 text-white px-2 py-2 rounded">
            {isPending ? "Sending otp..." : "Login"}
          </Button>
          <p>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</p>
        </>
      )}
    </div>
  );
};

export default OtpLogin;
