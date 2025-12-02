import "./App.css";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import {ThemeProvider} from "./context/ThemeContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import LoginPage from "./components/Auth/LoginPage.jsx";
import MainLayout from "./Layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import BookPage from "./pages/BookPage.jsx";
import LoanPage from "./pages/LoanPage.jsx";
import InventoryPage from "./pages/InventoryPage.jsx";
import AuthorPage from "./pages/AuthorPage.jsx";
import StudentPage from "./pages/StudentPage.jsx";
import BookReturnPage from "./pages/BookReturnPage.jsx";
import AddressPage from "./pages/AddressPage.jsx";
import BookCopyPage from "./pages/BookCopyPage.jsx";
import RegisterPage from "./components/Auth/RegisterPage.jsx";


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
                            <Route path="/register" element={<RegisterPage />} />

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

                                {/* Books */}
                                <Route
                                    path="books/*"
                                    element={
                                        <PrivateRoute>
                                            <BookPage />
                                        </PrivateRoute>
                                    }
                                />

                                {/* Authors */}
                                <Route
                                    path="authors/*"
                                    element={
                                        <PrivateRoute>
                                            <AuthorPage />
                                        </PrivateRoute>
                                    }
                                />

                                {/* Students */}
                                <Route
                                    path="students/*"
                                    element={
                                        <PrivateRoute>
                                            <StudentPage />
                                        </PrivateRoute>
                                    }
                                />

                                {/* Loans */}
                                <Route
                                    path="loans/*"
                                    element={
                                        <PrivateRoute>
                                            <LoanPage />
                                        </PrivateRoute>
                                    }
                                />

                                {/* Inventories */}
                                <Route
                                    path="inventory/*"
                                    element={
                                        <PrivateRoute>
                                            <InventoryPage />
                                        </PrivateRoute>
                                    }
                                />

                                {/*Book Returns */}
                                <Route
                                    path="book-returns/*"
                                    element={
                                        <PrivateRoute>
                                            <BookReturnPage returnBook={true} />
                                        </PrivateRoute>
                                    }
                                />
                                {/*Addresses */}
                                <Route
                                    path="addresses/*"
                                    element={
                                        <PrivateRoute>
                                            <AddressPage />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="book-copies/*"
                                    element={
                                        <PrivateRoute>
                                            <BookCopyPage />
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
    );
}

export default App;
