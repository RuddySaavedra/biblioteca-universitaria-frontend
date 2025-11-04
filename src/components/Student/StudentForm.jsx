// javascript
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { addStudent, updateStudent, getStudent } from "../../services/StudentService.js";

const StudentForm = () => {
    const [student, setStudent] = useState({
        name: "",
        email: "",
        enrollmentNumber: "",
        career: "",
        semester: "",
        phone: "",
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        if (id) loadStudent();
    }, [id]);

    const loadStudent = async () => {
        try {
            const response = await getStudent(id);
            setStudent(response.data);
        } catch (error) {
            console.error("Error loading Student ", error);
            await Swal.fire("Error", "Failed to load Student data", "error");
        }
    };

    // handleChange simple y genérico
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                id: student.id,
                name: student.name,
                email: student.email,
                enrollmentNumber: student.enrollmentNumber,
                career: student.career,
                semester: Number(student.semester),
                phone: student.phone,
            };

            if (id) {
                await updateStudent(id, payload);
                await Swal.fire("Updated", "Student Updated Successfully!", "success");
            } else {
                await addStudent(payload);
                await Swal.fire("Created", "Student Added Successfully!", "success");
            }
            navigate("/students");
        } catch(error) {
            console.error("Error saving student: ", error);
            await Swal.fire("Error", "Failed to save Student", "error");
        }
    };

    return (
        <div className="container mt-4">
            <h2>{id ? "Edit Student": "Add Student"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={student.name} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={student.email} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Enrollment Number</label>
                    <input type="text" className="form-control" name="enrollmentNumber" value={student.enrollmentNumber} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Career</label>
                    <input type="text" className="form-control" name="career" value={student.career} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Semester</label>
                    <input
                        type="number"
                        className="form-control"
                        name="semester"
                        value={student.semester}
                        onChange={handleChange}
                        min="1"
                        max="10"
                        step="1"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input type="text" className="form-control" name="phone" value={student.phone} onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-success me-2">Save</button>
                <button type="button" className="btn btn-secondary" onClick={()=>navigate("/students")}>Cancel</button>
            </form>
        </div>
    );
};

export default StudentForm;
