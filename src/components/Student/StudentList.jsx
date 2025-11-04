import React, {useEffect, useState} from 'react';
import{getAllStudents,deleteStudent} from"../../services/studentService";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    const loadStudents = async() => {
        try{
            const response = await getAllStudents();
            setStudents(response.data);
        } catch(error){
            console.error("Error loading students: ", error);
            await Swal.fire("Error", "Failed to load students", "error");
        }
    };

    function addStudent() {
        navigate("/students/add");
    }

    function editStudent(id) {
        navigate(`/students/edit/${id}`);
    }

    const performDelete = async (id) => {
        try {
            await deleteStudent(id);
            await Swal.fire("Deleted!", "Student deleted successfully.", "success");
            await loadStudents(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting the student: ", error);
            await Swal.fire("Error", "Failed to delete the student", "error");
        }
    }

    const handleDelete = async(id) => {
        const result = await Swal.fire({
            title: 'Delete Student and associated Loans?',
            text: "This will delete the student permanently.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel!",
        });

        if (result.isConfirmed) {
            await performDelete(id);
        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Student List</h2>
            <button className="btn btn-primary mb-3" onClick={()=>addStudent()}>Add Students</button>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Enrollment</th>
                    <th>Career</th>
                    <th>Semester</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {students.length > 0 ? (
                    students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.career}</td>
                            <td>{student.enrollmentNumber}</td>
                            <td>{student.semester}</td>
                            <td>{student.phone}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2" onClick={()=>editStudent(student.id)}>Edit</button>
                                <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8" className="text-center">No Students Found.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;