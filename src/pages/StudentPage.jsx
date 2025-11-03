import React from 'react';
import {Route, Routes} from "react-router-dom";
import StudentList from "./components/StudentList";
import StudentForm from "../components/Student/StudentForm.jsx";

const StudentPage = () => {
    return (
        <Routes>
            {/* Lista de estudiantes */}
            <Route path="/" element={<StudentList />} />

            {/* Crear estudiante */}
            <Route path="/add-student" element={<StudentForm />} />

            {/* Editar estudiante */}
            <Route path="/edit-student/:id" element={<StudentForm />} />
        </Routes>
    );
};

export default StudentPage;