import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Users, Building2, Brain, Users2, Award } from "lucide-react";

const Home = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    const modules = [
        {
            title: "Employees",
            description: "Manage employee data, departments, and contact details.",
            icon: <Users size={32} />,
            path: "/employees",
            color: "primary",
        },
        {
            title: "Departments",
            description: "Organize company structure and departmental assignments.",
            icon: <Building2 size={32} />,
            path: "/departments",
            color: "success",
        },
        {
            title: "Skills",
            description: "Maintain a catalog of employee skills and competencies.",
            icon: <Brain size={32} />,
            path: "/skills",
            color: "info",
        },
        {
            title: "Dependents",
            description: "Manage employee family members and benefits coverage.",
            icon: <Users2 size={32} />,
            path: "/dependents",
            color: "warning",
        },
        {
            title: "Employee Skills",
            description: "Assign and manage skill relationships for each employee.",
            icon: <Award size={32} />,
            path: "/employee-skills",
            color: "danger",
        },
    ];

    return (
        <div
            className={`container text-center py-5 theme-transition ${
                theme === "dark" ? "text-light" : "text-dark"
            }`}
        >
            {/* Título */}
            <h1 className="fw-bold mb-3">Welcome to the Enterprise Management System</h1>
            <p className="lead mb-5">
                Streamline employee and department management with efficiency and clarity.
            </p>

            {/* Tarjetas */}
            <div className="row g-4 justify-content-center">
                {modules.map((mod, index) => (
                    <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <div
                            className={`card border-${mod.color} shadow-sm h-100 hover-scale`}
                            style={{
                                cursor: "pointer",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                            }}
                            onClick={() => navigate(mod.path)}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.transform = "scale(1.03)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.transform = "scale(1)")
                            }
                        >
                            <div className={`card-body text-${mod.color}`}>
                                <div className="mb-3">{mod.icon}</div>
                                <h5 className="card-title fw-semibold">{mod.title}</h5>
                                <p className="card-text text-secondary">{mod.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pie inferior */}
            <div className="mt-5">
                <p className="text-muted small">
                    Empowering organizations with efficient employee management tools.
                </p>
            </div>
        </div>
    );
};

export default Home;
