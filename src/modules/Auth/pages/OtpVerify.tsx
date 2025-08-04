import { useState } from "react";
import OtpInput from "../components/OtpInput";
import Button from "../../../components/Button/Button";
import { verifyOtp } from "../auth.api";
import { useNavigate } from "@tanstack/react-router";
import { useToast } from "../../../components/Toasts/useToast";
import { useAuth } from "../../../context/AuthContext";

type Props = {
  phone: string;
  onSuccess: () => void; 
};





// const OtpVerify = ({ phone }: { phone: string }) => {
const OtpVerify = ({ phone, onSuccess }: Props) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const showToast = useToast();
   const { setUser } = useAuth();




 const handleVerify = async () => {
    const result = await verifyOtp(phone, otp);
    if (result.success) {
      const res = await fetch(`http://localhost:5000/users?phone=${phone}`);
      const [user] = await res.json();
      setUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      showToast("Login successful!", "success");
      onSuccess(); // Close Drawer
       navigate({ to: "/" });
    } else {
      alert("Invalid OTP");
    }
  };


  // const handleVerify = async () => {
  //   const res = await verifyOtp(phone, otp);
  //   if (res.success) {
      
  //     localStorage.setItem(
  //       "currentUser",
  //       JSON.stringify({ name: `User ${phone}`, role: "user" })
  //     );
  //     // alert("Logged in successfully!");

  //     showToast("Login successful!", "success");
  //     onSuccess();

  //     navigate({ to: "/" });
  //   } else {
  //     alert(res.message || "OTP verification failed");
  //   }
  // };



  //  const res = await verifyOtp(phone, otp);

  //   if (res.success) {
  //     const draft = localStorage.getItem("userDraft");
  //     const parsed = draft ? JSON.parse(draft) : { name: "User", email: "" };

  //     const user = {
  //       name: parsed.name,
  //       phone,
  //       email: parsed.email,
  //       role: "user",
  //     };

  //     localStorage.setItem("currentUser", JSON.stringify(user));
  //     setUser(user); // ✅ Set logged in user in global state
  //     showToast("Login successful!", "success");
  //     onSuccess();
  //     navigate({ to: "/" });
  //   } else {
  //     alert(res.message || "OTP verification failed");
  //   }
  // };




  return (
    <div className="space-y-4">
      <OtpInput otp={otp} setOtp={setOtp} />

      <Button
        onClick={handleVerify}
        className="flex flex-row bg-green-600 hover:bg-green-700 text-white px-2 py-2 rounded"
      >
        Verify OTP
      </Button>
    </div>
  );
};

export default OtpVerify;
