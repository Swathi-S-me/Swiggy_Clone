import { useMutation } from "@tanstack/react-query";
import { sendOtp } from "./auth.api";



export const useSendOtp = () => {
  return useMutation({
    mutationFn: sendOtp,
  });
};
