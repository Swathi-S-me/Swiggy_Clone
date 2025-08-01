import React from "react";
import Input from "../../../components/InputField/Input";
import type { OtpInputProps } from "./auth-input.types";



const OtpInput: React.FC<OtpInputProps> = ({ otp, setOtp }) => {
  return (
    <Input
      type="text"
      placeholder="Enter OTP"
      value={otp}
      onChange={setOtp}
      className="mt-4"
    />
  );
};

export default OtpInput;
