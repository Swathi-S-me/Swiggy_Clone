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
      // Invalidate user query to refresh user data
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
      // Update the user query cache with the new user data
      queryClient.setQueryData(["user", variables.phone], data);
    },
  });
};