import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

/**
 * LoginPage — Pantalla de inicio de sesión real basada en email/password contra el backend JWT
 */

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(email, password);

            Swal.fire({
                title: "Welcome!",
                text: "You have successfully logged in.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });
            navigate("/");
        } catch (error) {
            console.error("Error en login", error);

            // Intentar leer mensaje del backend (por ejemplo IllegalArgumentException)
            const backendMessage =
                error?.response?.data?.message ||
                // a veces el backend devuelve string plano
                (typeof error?.response?.data === "string" ? error.response.data : null);

            const friendlyMessage =
                backendMessage || "Credenciales inválidas. Verifica tu email y contraseña.";

            Swal.fire({
                title: "Access Denied",
                text: friendlyMessage,
                icon: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-sm p-4" style={{ width: "380px" }}>
                <h3 className="text-center mb-3 text-primary fw-bold">
                    LMS — Login
                </h3>
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Password con ojito */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-semibold">
                            Password
                        </label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword((prev) => !prev)}
                                tabIndex={-1}
                            >
                                {showPassword ? "Ocultar" : "Ver"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Enlace para crear cuenta */}
                <div className="mt-3 text-center">
                    <span className="text-muted me-1">¿No tienes cuenta?</span>
                    <Link
                        to="/register"
                        className="text-primary text-decoration-none"
                    >
                        Crear cuenta
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
