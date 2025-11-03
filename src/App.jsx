import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import LoginPage from "./components/Auth/LoginPage.jsx";
import MainLayout from "./Layouts/MainLayout.jsx";
import EmployeePage from "./components/EmployeePage.jsx";
import DepartmentPage from "./components/DepartmentPage.jsx";
import Home from "./pages/Home.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import BookPage from "./pages/BookPage.jsx";
import {ThemeProvider} from "./context/ThemeContext.jsx";
import StudentPage from "./components/StudentPage.jsx";

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                {/* 🧩 ErrorBoundary captura cualquier fallo en renderizado */}
                <ErrorBoundary>
                    <Router>
                        <Routes>
                            {/* 🔓 Public route (Login) */}
                            <Route path="/login" element={<LoginPage />} />

                            {/* 🔐 Private routes under MainLayout */}
                            <Route element={<MainLayout />}>
                                <Route
                                    path="/"
                                    element={
                                        <PrivateRoute>
                                            <Home />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="books/*"
                                    element={
                                        <PrivateRoute>
                                            <BookPage />
                                        </PrivateRoute>
                                    }
                                />
                                {/* Redirect unknown paths to home */}
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Route>
                        </Routes>
                        <Router>
                            <MainLayout>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/employees/*" element={<EmployeePage />} />
                                    <Route path="/departaments/*" element={<DepartmentPage />} />
                                    {/* Nueva ruta para estudiantes */}
                                    <Route path="/students/*" element={<StudentPage />} />
                                </Routes>
                            </MainLayout>
                        </Router>
                    </Router>
                </ErrorBoundary>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App
