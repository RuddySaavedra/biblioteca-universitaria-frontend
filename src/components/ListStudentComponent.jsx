// src/components/ListStudentComponent.jsx
import { useEffect, useState } from "react";
import { getAllStudents, deleteStudent } from "../services/StudentService.js";
import { useNavigate } from "react-router-dom";

const ListStudentComponent = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    function listAllStudents() {
        getAllStudents()
            .then((response) => {
                setStudents(response.data); // tu backend devuelve lista simple
            })
            .catch((error) => console.log(error));
    }

    function addStudentNav() {
        navigate("/add-student");
    }

    function updateStudentNav(id) {
        navigate(`/edit-student/${id}`);
    }

    function removeStudent(id) {
        deleteStudent(id)
            .then(() => listAllStudents())
            .catch((e) => console.log(e));
    }

    useEffect(() => {
        listAllStudents();
    }, []); // <-- MUY IMPORTANTE: sin dependencias para evitar loop

    return (
        <div className="container">
            <h2 className="text-center">Listado de Estudiantes</h2>
            <button className="btn btn-primary mb-2" onClick={addStudentNav}>
                Add Student
            </button>

            <table className="table table-striped table-dark table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Enrollment #</th>
                    <th>Career</th>
                    <th>Semester</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>
                {students.map((s) => (
                    <tr key={s.id}>
                        <td>{s.id}</td>
                        <td>{s.name}</td>
                        <td>{s.email}</td>
                        <td>{s.enrollmentNumber}</td>
                        <td>{s.career}</td>
                        <td>{s.semester}</td>
                        <td>{s.phone}</td>
                        <td>
                            <button className="btn btn-info" onClick={() => updateStudentNav(s.id)}>
                                Update
                            </button>
                            <button className="btn btn-danger ms-3" onClick={() => removeStudent(s.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                {students.length === 0 && (
                    <tr>
                        <td colSpan="8" className="text-center">Sin registros</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ListStudentComponent;
