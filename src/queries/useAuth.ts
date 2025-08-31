import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sendOtp, verifyOtp, checkUserExists, signupUser } from "./auth.api";

export const useSendOtp = () => {
  return useMutation({
    mutationFn: sendOtp,
  });
};

export const useVerifyOtp = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ phone, otp }: { phone: string; otp: string }) => 
      verifyOtp(phone, otp),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user", variables.phone] });
    },
  });
};

export const useCheckUserExists = (phone: string) => {
  return useQuery({
    queryKey: ["userExists", phone],
    queryFn: () => checkUserExists(phone),
    enabled: !!phone,
  });
};

export const useSignupUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: signupUser,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["user", variables.phone], data);
    },
  });
};