
import { useState } from "react";
import Button from "../components/Button/Button";
import OtpVerify from "./OtpVerify/OtpVerify";

const Signup = () => {
  const [step, setStep] = useState<"form" | "otp">("form");
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    const { phone, name, email } = formData;
    if (phone.length !== 10 || !name || !email) {
      alert("Fill all fields correctly");
      return;
    }

    
    localStorage.setItem("userDraft", JSON.stringify(formData));
    setStep("otp");
  };

  if (step === "otp") {
    return (
      <OtpVerify
        phone={formData.phone}
        onSuccess={() => {
          
          localStorage.removeItem("userDraft");
        }}
      />
    );
  }

  return (
    <div className="max-w-sm mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-semibold">Sign up</h1>
      <input
        name="phone"
        placeholder="Phone number"
        value={formData.phone}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <Button
        onClick={handleContinue}
        className="cursor-pointer bg-orange-500 text-white w-full py-2 rounded"
      >
        CONTINUE
      </Button>
    </div>
  );
};

export default Signup;
