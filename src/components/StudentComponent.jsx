// src/components/StudentComponent.jsx
import { useEffect, useState } from "react";
import { addStudent, getStudent, updateStudent } from "../services/StudentService.js";
import { useNavigate, useParams } from "react-router-dom";

const StudentComponent = () => {
    // Campos del backend: name, email, enrollmentNumber, career, semester
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [enrollmentNumber, setEnrollmentNumber] = useState("");
    const [career, setCareer] = useState("");
    const [semester, setSemester] = useState("");

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        enrollmentNumber: "",
        semester: ""
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getStudent(id).then((res) => {
                const s = res.data;
                setName(s.name ?? "");
                setEmail(s.email ?? "");
                setEnrollmentNumber(s.enrollmentNumber ?? "");
                setCareer(s.career ?? "");
                setSemester(String(s.semester ?? ""));
            });
        }
    }, [id]);

    function validateForm() {
        let valid = true;
        const copy = { ...errors };

        // name
        if (name.trim()) copy.name = ""; else { copy.name = "Name required"; valid = false; }

        // email (simple)
        if (email.trim() && /^\S+@\S+\.\S+$/.test(email)) copy.email = "";
        else { copy.email = "Valid email required"; valid = false; }

        // enrollmentNumber
        if (enrollmentNumber.trim()) copy.enrollmentNumber = "";
        else { copy.enrollmentNumber = "Enrollment # required"; valid = false; }

        // semester (1..20 por ejemplo)
        if (semester.trim() && Number.isInteger(Number(semester)) && Number(semester) >= 1 && Number(semester) <= 20) {
            copy.semester = "";
        } else {
            copy.semester = "Semester must be an integer (1-20)";
            valid = false;
        }

        setErrors(copy);
        return valid;
    }

    function saveOrUpdateStudent(e) {
        e.preventDefault();
        if (!validateForm()) return;

        const student = {
            name,
            email,
            enrollmentNumber,
            career,
            semester: Number(semester)
        };

        if (id) {
            updateStudent(id, student)
                .then(() => navigate("/students"))
                .catch((e) => console.log(e));
        } else {
            addStudent(student)
                .then(() => navigate("/students"))
                .catch((e) => console.log(e));
        }
    }

    const pageTitle = () =>
        id ? <h2 className="text-center">Update Student</h2>
            : <h2 className="text-center">Add Student</h2>;

    return (
        <div className="container">
            <br/>
            <div className="card col-md-6 offset-md-3">
                {pageTitle()}
                <div className="card-body">
                    <form>
                        <div className="form-group mb-2">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                placeholder="Enter name"
                                className={`form-control ${errors.name ? 'is-invalid' : ""}`}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>

                        <div className="form-group mb-2">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Enter email"
                                className={`form-control ${errors.email ? 'is-invalid' : ""}`}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        <div className="form-group mb-2">
                            <label className="form-label">Enrollment Number</label>
                            <input
                                type="text"
                                name="enrollmentNumber"
                                value={enrollmentNumber}
                                placeholder="Enter enrollment #"
                                className={`form-control ${errors.enrollmentNumber ? 'is-invalid' : ""}`}
                                onChange={(e) => setEnrollmentNumber(e.target.value)}
                            />
                            {errors.enrollmentNumber && <div className="invalid-feedback">{errors.enrollmentNumber}</div>}
                        </div>

                        <div className="form-group mb-2">
                            <label className="form-label">Career</label>
                            <input
                                type="text"
                                name="career"
                                value={career}
                                placeholder="Enter career"
                                className="form-control"
                                onChange={(e) => setCareer(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <label className="form-label">Semester</label>
                            <input
                                type="number"
                                name="semester"
                                value={semester}
                                placeholder="Enter semester (1-20)"
                                className={`form-control ${errors.semester ? 'is-invalid' : ""}`}
                                onChange={(e) => setSemester(e.target.value)}
                            />
                            {errors.semester && <div className="invalid-feedback">{errors.semester}</div>}
                        </div>

                        <button type="submit" className="btn btn-success" onClick={saveOrUpdateStudent}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentComponent;
