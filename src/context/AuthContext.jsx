import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthService } from "../services/AuthService";
import { AuthContext } from "./AuthContextBase";

/**
 * AuthProvider — Proveedor del contexto de autenticación global.
 */

function AuthProviderComponent({ children }) {
  const [auth, setAuth] = useState(() => AuthService.getAuth()); // AuthenticationResponse o null
  const [user, setUser] = useState(null); // UserResponse
  const [loading, setLoading] = useState(true);

  // Cargar usuario autenticado al montar la app
  useEffect(() => {
    // envolver la lógica async para no retornar directamente una promesa
    const init = () => {
      (async () => {
        const current = AuthService.getAuth();
        if (!current?.token) {
          setLoading(false);
          return;
        }

        try {
          const me = await AuthService.me();
          if (me) {
            setUser(me);
            setAuth(current);
          } else {
            // si /me falla, podría intentarse un refresh de token
            try {
              const refreshed = await AuthService.refreshToken();
              if (refreshed?.token) {
                const me2 = await AuthService.me();
                setUser(me2 || null);
                setAuth(AuthService.getAuth());
              } else {
                handleLogout();
              }
            } catch (e) {
              console.error("Error refrescando token", e);
              handleLogout();
            }
          }
        } catch (e) {
          console.error("Error inicializando autenticación", e);
          handleLogout();
        } finally {
          setLoading(false);
        }
      })();
    };

    init();
  }, []);

  const handleLogin = async (email, password) => {
    await AuthService.login(email, password); // AuthenticationRequest
    setAuth(AuthService.getAuth());

    try {
      const me = await AuthService.me(); // UserResponse
      setUser(me || null);
    } catch (e) {
      console.error("Error obteniendo usuario autenticado tras login", e);
    }

    return true;
  };

  const handleRegister = async (payload) => {
    // payload: { firstName, lastName, email, password } (RegisterRequest)
    await AuthService.register(payload);
    setAuth(AuthService.getAuth());

    try {
      const me = await AuthService.me();
      setUser(me || null);
    } catch (e) {
      console.error("Error obteniendo usuario autenticado tras registro", e);
    }

    return true;
  };

  const handleLogout = () => {
    AuthService.logout();
    setAuth(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      auth, // AuthenticationResponse: { token, refreshToken, userId, email, firstName, lastName, role }
      user, // UserResponse: { id, username, email, role }
      isAuthenticated: !!auth?.token,
      loading,
      login: handleLogin,
      register: handleRegister,
      logout: handleLogout,
    }),
    [auth, user, loading]
  );

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export function AuthProvider(props) {
  return <AuthProviderComponent {...props} />;
}
