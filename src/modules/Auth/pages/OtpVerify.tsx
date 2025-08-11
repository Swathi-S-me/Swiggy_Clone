// import { useState } from "react";
// import OtpInput from "../components/OtpInput";
// import Button from "../../../components/Button/Button";
// import { verifyOtp } from "../auth.api";
// import { useNavigate } from "@tanstack/react-router";
// import { useToast } from "../../../components/Toasts/useToast";
// import { useAuth } from "../../../context/AuthContext";
// import type { Props } from "./otpVerify.types";



// const OtpVerify = ({ phone, onSuccess }: Props) => {
//   const [otp, setOtp] = useState("");
//   const navigate = useNavigate();
//   const showToast = useToast();
//   const { setUser } = useAuth();

//   const handleVerify = async () => {
//     const result = await verifyOtp(phone, otp);
//     if (result.success) {
//       const res = await fetch(`http://localhost:5000/users?phone=${phone}`);
//       const [user] = await res.json();
//       setUser(user);
//       localStorage.setItem("currentUser", JSON.stringify(user));
//       showToast("Login successful!", "success");
//       onSuccess();
//       navigate({ to: "/" });
//     } else {
//       alert("Invalid OTP");
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <OtpInput otp={otp} setOtp={setOtp} />

//       <Button
//         onClick={handleVerify}
//         className="flex flex-row bg-green-600 hover:bg-green-700 text-white px-2 py-2 rounded"
//       >
//         Verify OTP
//       </Button>
//     </div>
//   );
// };

// export default OtpVerify;


import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import OtpInput from "../components/OtpInput";
import Button from "../../../components/Button/Button";
import { verifyOtp } from "../auth.api";
import { useNavigate } from "@tanstack/react-router";
import { useToast } from "../../../components/Toasts/useToast";
import { useAuth } from "../../../context/AuthContext";
import { useUser } from "../../../queries/useUser";
import type { Props } from "./otpVerify.types";

const OtpVerify = ({ phone, onSuccess }: Props) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const showToast = useToast();
  const { setUser } = useAuth();

  // Prefetch user data when component mounts
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
        showToast("Login successful!", "success");
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
      <OtpInput otp={otp} setOtp={setOtp} />

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