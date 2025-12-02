import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(form); // RegisterRequest { firstName, lastName, email, password }

      Swal.fire({
        title: "Cuenta creada",
        text: "Te hemos autenticado correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      console.error("Error en registro", error);

      const backendMessage =
        error?.response?.data?.message ||
        (typeof error?.response?.data === "string" ? error.response.data : null);

      const friendlyMessage =
        backendMessage || "No se pudo crear la cuenta. Verifica los datos e inténtalo de nuevo.";

      Swal.fire({
        title: "Error en el registro",
        text: friendlyMessage,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ width: "420px" }}>
        <h3 className="text-center mb-3 text-primary fw-bold">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={form.firstName}
              onChange={handleChange}
              required
              placeholder="First name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={form.lastName}
              onChange={handleChange}
              required
              placeholder="Last name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Enlace para ir a iniciar sesión */}
        <div className="mt-3 text-center">
          <span className="text-muted me-1">¿Ya tienes cuenta?</span>
          <Link to="/login" className="text-primary text-decoration-none">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
