import axios from "axios";

const rawBaseUrl =
  (import.meta.env.VITE_API_URL ?? "").trim() ||
  "https://alivic-admisiones-api.desarrollo-software.xyz";

export const baseURL =
  rawBaseUrl.startsWith("http://") || rawBaseUrl.startsWith("https://")
    ? rawBaseUrl.replace(/\/$/, "")
    : `https://${rawBaseUrl.replace(/\/$/, "")}`;

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // No redirigir al login si el error 401 viene del endpoint de login
    const isLoginRequest = String(error?.config?.url || "").includes("auth/login");

    if (error?.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
