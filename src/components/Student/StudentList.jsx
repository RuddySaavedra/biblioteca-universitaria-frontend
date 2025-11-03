import React, {useEffect, useState} from 'react';
import{getAllStudents,deleteStudent} from"../../services/studentService";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async() => {
        try{
            const res = await getAllStudents();
            setStudents(res.data);
        } catch(error){
            console.error("Error loading students: ", error);
            Swal.fire("Error", "Failed to load students", "error");
        }
    };

    const handleDelete = async(id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "This will delete the student permanently.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel!",
        });

        if (confirm.isConfirmed) {
            try {
                await deleteStudent(id);
                Swal.fire("Deleted!", "Student deleted successfully.", "success");
                loadStudents();
            } catch (error) {
                console.error("Error deleting the student: ", error);
                Swal.fire("Error", "Failed to delete the student", "error");
            }
        }
    };
    return (
        <div className="container mt-4">
            <h2>Student List</h2>
            <button
                className="btn btn-primary mb-3"
                onClick={()=>navigate("/add-students")}
                >
                Add Students
            </button>

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
                {students.length > 0?(
                    students.map((s) => (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.name}</td>
                            <td>{s.email}</td>
                            <td>{s.career}</td>
                            <td>{s.enrollmentNumber}</td>
                            <td>{s.semester}</td>
                            <td>{s.phone}</td>
                            <td>
                                <button
                                    className="btn btn-sm me-2"
                                    onClick={()=>handleDelete(s.id)}
                                    >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8" className="text-center">
                            No Students Found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;