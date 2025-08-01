import React from "react";
import Input from "../../../components/InputField/Input";
import type { PhoneInputProps } from "./auth-input.types";




const PhoneInput: React.FC<PhoneInputProps> = ({ phone, setPhone }) => {
  return (
    <Input
      type="tel"
      placeholder="Enter phone number"
      value={phone}
      onChange={setPhone}
    />
  );
};

export default PhoneInput;
