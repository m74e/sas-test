import { z } from "zod";
import { api } from "@/lib/axios";
import { setToken, setRefreshToken } from "@/lib/cookies";

export const loginRequestSchema = z.object({
  email_or_phone_number: z.string().min(1, "Email or phone number is required"),
  password: z.string().min(1, "Password is required"),
});

export const loginResponseSchema = z.object({
  email_or_phone_number: z.string(),
  token: z.object({
    refresh: z.string(),
    access: z.string(),
  }),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;

const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; 

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const body = loginRequestSchema.parse(credentials);
  const { data } = await api.post<LoginResponse>("/user/login/", body);
  const parsed = loginResponseSchema.parse(data);

  setToken(parsed.token.access, TOKEN_MAX_AGE);
  setRefreshToken(parsed.token.refresh, TOKEN_MAX_AGE);

  return parsed;
}
