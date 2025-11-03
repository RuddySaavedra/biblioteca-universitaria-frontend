import './App.css'
import {AuthProvider} from "./context/AuthContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./components/Auth/LoginPage.jsx";
import MainLayout from "./Layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import BookPage from "./pages/BookPage.jsx";
import {ThemeProvider} from "./context/ThemeContext.jsx";
import AuthorPage from "./pages/AuthorPage.jsx";


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
                                <Route
                                    path="authors/*"
                                    element={
                                        <PrivateRoute>
                                            <AuthorPage />
                                        </PrivateRoute>
                                    }
                                />
                                {/* Redirect unknown paths to home */}
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Route>
                        </Routes>
                    </Router>
                </ErrorBoundary>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App
