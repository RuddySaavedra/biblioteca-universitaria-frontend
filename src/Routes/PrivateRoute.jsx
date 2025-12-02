import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

/**
 * PrivateRoute — Protege rutas internas del sistema usando JWT a través de AuthContext.
 */

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // podrías mostrar un spinner o pantalla de carga aquí
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
