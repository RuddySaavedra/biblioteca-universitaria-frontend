import { apiClient } from "./apiClient";

const STORAGE_KEY = "lms_auth"; // almacenará AuthenticationResponse

export const AuthService = {
  /**
   * login(AuthenticationRequest): { email, password } -> AuthenticationResponse
   */
  login: async (email, password) => {
    const res = await apiClient.post("/api/auth/login", { email, password });
    const data = res.data;
    saveAuth(data);
    return data;
  },

  /**
   * register(RegisterRequest): { firstName, lastName, email, password } -> AuthenticationResponse
   */
  register: async ({ firstName, lastName, email, password }) => {
    const res = await apiClient.post("/api/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });
    const data = res.data;
    saveAuth(data);
    return data;
  },

  /**
   * refreshToken(RefreshTokenRequest): { refreshToken } -> AuthenticationResponse
   */
  refreshToken: async () => {
    const current = getAuth();
    if (!current?.refreshToken) return null;

    const res = await apiClient.post("/api/auth/refresh", {
      refreshToken: current.refreshToken,
    });
    const data = res.data;
    saveAuth(data);
    return data;
  },

  /**
   * me(): GET /api/auth/me -> UserResponse
   */
  me: async () => {
    const current = getAuth();
    if (!current?.token) return null;

    try {
      const res = await apiClient.get("/api/auth/me");
      return res.data; // UserResponse
    } catch {
      return null;
    }
  },

  logout: () => {
    clearAuth();
  },

  getAuth,
};

function saveAuth(authResponse) {
  if (!authResponse) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authResponse));
  } catch (e) {
    console.error("Error guardando auth en localStorage", e);
  }
}

function getAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error leyendo auth de localStorage", e);
    return null;
  }
}

function clearAuth() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Error limpiando auth de localStorage", e);
  }
}
