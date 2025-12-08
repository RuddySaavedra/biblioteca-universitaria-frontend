import axios from "axios";
import { AuthService } from "./AuthService";

// Base URL del backend (ajusta si es distinto)
const BASE_URL = "http://localhost:8080";
// Instancia principal de axios para toda la app
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de request: adjuntar Authorization si hay token
apiClient.interceptors.request.use(
  (config) => {
    const auth = AuthService.getAuth();
    if (auth?.token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response: intentar refresh si obtenemos 401
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si no es 401 o ya intentamos refrescar, rechazamos directo
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // en cola hasta que termine el refresh en curso
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Refrescar el token usando AuthService
      await AuthService.refreshToken();
      const newAuth = AuthService.getAuth();
      const newToken = newAuth?.token;

      processQueue(null, newToken);
      isRefreshing = false;

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      }

      return Promise.reject(error);
    } catch (refreshError) {
      processQueue(refreshError, null);
      isRefreshing = false;
      AuthService.logout();
      return Promise.reject(refreshError);
    }
  }
);
