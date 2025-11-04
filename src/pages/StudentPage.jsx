import React from 'react';
import {Route, Routes} from "react-router-dom";
import StudentList from "../components/Student/StudentList.jsx";
import StudentForm from "../components/Student/StudentForm.jsx";

const StudentPage = () => {
    return (
        <Routes>
            {/* Lista de estudiantes */}
            <Route index element={<StudentList />} />
            {/* Crear estudiante */}
            <Route path="add" element={<StudentForm />} />
            {/* Editar estudiante */}
            <Route path="edit/:id" element={<StudentForm />} />
        </Routes>
    );
};

export default StudentPage;