import { useContext } from "react";
import { AuthContext } from "./AuthContextBase";

// Hook personalizado separado para cumplir con react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
