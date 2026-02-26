import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { clearToken, getToken } from "./cookies";
import { toast } from "sonner";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "";

export const api = axios.create({
  baseURL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        clearToken();
      }
    }

    if (typeof window !== "undefined") {
      const message =
        (error.response?.data as { detail?: string; message?: string } | undefined)
          ?.detail ??
        (error.response?.data as { detail?: string; message?: string } | undefined)
          ?.message ??
        error.message ??
        "Something went wrong. Please try again.";

      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;

