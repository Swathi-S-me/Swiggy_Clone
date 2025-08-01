



import { useState } from "react";
import OtpInput from "../components/OtpInput";
import Button from "../../../components/Button/Button";
import { verifyOtp } from "../auth.api";

const OtpVerify = ({ phone }: { phone: string }) => {
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
  const res = await verifyOtp(phone, otp);
  if (res.success) {
    localStorage.setItem("currentUser", JSON.stringify({ name: `User ${phone}`, role: "user" }));
    alert("Logged in successfully!");
    window.location.reload();
  } else {
    alert(res.message || "OTP verification failed");
  }
};



  return (
    <div className="space-y-4">
      <OtpInput otp={otp} setOtp={setOtp} />

      <Button onClick={handleVerify}  className="flex flex-row bg-green-600 hover:bg-green-700 text-white px-2 py-2 rounded">
        Verify OTP
      </Button>
    </div>
  );
};

export default OtpVerify;
