// export interface User {
//   id: string;
//   phone: string;
//   name: string;
//   email: string;
//   createdAt?: string;
//   updatedAt?: string;
// }
// export interface OtpResponse {
//   success: boolean;
//   message?: string;
//   error?: string;
// }

// export interface VerifyOtpResponse extends OtpResponse {}

// export type SignupUserRequest = Pick<User , "phone"| "name" | "email">;

// export interface SignupUserResponse extends User,Pick<OtpResponse, "success" | "message"> {}