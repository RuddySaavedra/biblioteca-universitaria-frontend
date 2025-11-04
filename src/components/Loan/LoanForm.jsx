// javascript
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { addLoan, getLoan, updateLoan } from "../../services/LoanService.js";
import { getAllBooks } from "../../services/BookService.js";
import { getAllStudents } from "../../services/StudentService.js";

const LoanForm = () => {
    const [loan, setLoan] = useState({
        loanDate: "",
        dueDate: "",
        status: "",
        bookId: "",
        studentId: "",
    });
    const [books, setBooks] = useState([]);
    const [students, setStudents] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const loadBooks = async () => {
        try {
            const res = await getAllBooks();
            setBooks(res.data || []);
        } catch (e) {
            console.error(e);
            void Swal.fire("Error", "Failed to load books", "error");
        }
    };

    const loadStudents = async () => {
        try {
            const res = await getAllStudents();
            setStudents(res.data || []);
        } catch (e) {
            console.error(e);
            void Swal.fire("Error", "Failed to load students", "error");
        }
    };

    const loadLoan = async () => {
        try {
            const res = await getLoan(id);
            const data = res.data;
            setLoan({
                loanDate: data.loanDate || "",
                dueDate: data.dueDate || "",
                status: data.status || "",
                bookId: data.bookId ?? "",
                studentId: data.studentId ?? "",
            });
        } catch (e) {
            console.error(e);
            void Swal.fire("Error", "Failed to load loan data", "error");
        }
    };

    useEffect(() => {
        void loadBooks();
        void loadStudents();
        if (id) void loadLoan();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoan({ ...loan, [name]: value });
    };

    // validateForm: agregar verificación loanDate <= hoy
    function validateForm() {
        if (!loan.loanDate || !loan.dueDate) {
            void Swal.fire("Validation", "Both loan and due dates are required.", "warning");
            return false;
        }

        const loanDate = new Date(loan.loanDate);
        const dueDate = new Date(loan.dueDate);
        const today = new Date();
        // Normalizar hora para comparar solo fecha
        today.setHours(0,0,0,0);

        if (isNaN(loanDate.getTime()) || isNaN(dueDate.getTime())) {
            void Swal.fire("Validation", "Invalid date format.", "warning");
            return false;
        }

        if (loanDate > today) {
            void Swal.fire("Validation", "Loan date cannot be in the future.", "warning");
            return false;
        }

        if (dueDate < loanDate) {
            void Swal.fire("Validation", "Due date cannot be earlier than loan date.", "warning");
            return false;
        }

        if (!loan.bookId) {
            void Swal.fire("Validation", "Please select a book.", "warning");
            return false;
        }

        if (!loan.studentId) {
            void Swal.fire("Validation", "Please select a student.", "warning");
            return false;
        }

        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // No enviar 'status' desde el frontend; backend lo asignará
        const payload = {
            loanDate: loan.loanDate,
            dueDate: loan.dueDate,
            bookId: Number(loan.bookId),
            studentId: Number(loan.studentId),
        };

        try {
            if (id) {
                await updateLoan(id, payload);
                void Swal.fire("Updated", "Loan updated successfully", "success");
            } else {
                await addLoan(payload);
                void Swal.fire("Created", "Loan created successfully", "success");
            }
            navigate("/loans");
        } catch (error) {
            console.error("Error saving loan:", error);
            const backendMessage = error.response?.data?.message || error.message;
            void Swal.fire("Error", String(backendMessage), "error");
        }
    };

    return (
        <div className="container mt-4">
            <h2>{id ? "Edit Loan" : "Add Loan"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Book</label>
                    <select
                        className="form-select"
                        name="bookId"
                        value={loan.bookId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select Book --</option>
                        {books.map((book) => (
                            <option key={book.id} value={book.id}>
                                {book.title} {book.isbn ? `(${book.isbn})` : ""}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Student</label>
                    <select
                        className="form-select"
                        name="studentId"
                        value={loan.studentId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select Student --</option>
                        {students.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Loan Date</label>
                    <input
                        type="date"
                        className="form-control"
                        name="loanDate"
                        value={loan.loanDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Due Date</label>
                    <input
                        type="date"
                        className="form-control"
                        name="dueDate"
                        value={loan.dueDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <div className="form-text">
                        * El estado del préstamo se calcula desde el servidor (dependiente de devoluciones).
                    </div>
                </div>

                <button type="submit" className="btn btn-success me-2">
                    Save
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/loans")}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default LoanForm;
