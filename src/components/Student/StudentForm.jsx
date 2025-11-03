import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import Swal from 'sweetalert2';
import{addStudent,updateStudent,getStudent} from "../../services/StudentService.js";

const StudentForm = () => {
    const[student, setStudent] = useState({
        name: "",
        email: "",
        enrollmentNumber: "",
        career:"",
        semester:"",
        phoneNumber: "",
    });
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        if (id) loadStudent();
    }, [id]);

    const loadStudent = async () => {
        try {
            const response = await getStudent(id);
            setStudent(response.data);
        } catch (err) {
            console.error("Error loading Student ", err);
            Swal.fire("Error", "Failed to load Student data", "error");
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({...student, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateStudent(id, student);
                Swal.fire("Student Updated Successfully!", "success");
            } else {
                await addStudent(student);
                Swal.fire("Student Updated Successfully!", "success");
            }
            navigate("/students");
        }catch(err){
            console.error("Error saving Student", err);
            Swal.fire("Error", "Failed to load Student", "error");
            }
        };
    return (
        <div className="container mt-4">
            <h2>{id ? "Edit Student": "Add Student"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={student.name}
                        onChange={handleChange}
                        required
                        />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={student.email}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Enrollment Number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="enrollmentNumber"
                        value={student.enrollmentNumber}
                        onChange={handleChange}
                        required
                        />
                </div>

                <div className="mb-3">
                    <label className="form-label">Career</label>
                    <input
                        type="text"
                        className="form-control"
                        name="career"
                        value={student.career}
                        onChange={handleChange}
                        />
                </div>

                <div className="mb-3">
                    <label className="form-label">Semester</label>
                    <input
                    type="text"
                    className="form-control"
                    name="semester"
                    value={student.semester}
                    onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                    value={student.phoneNumber}
                    onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-success me-2">
                    Save
                </button>
                <button type="button" className="btn btn-secondary" onClick={()=>navigate("/students") }>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default StudentForm;