import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { addBookReturn, getBookReturn, updateBookReturn } from "../../services/BookReturnService.js";
import { getAllLoans } from "../../services/LoanService.js";

const BookReturnForm = () => {
    const [bookReturn, setBookReturn] = useState({
        returnDate: "",
        penaltyAmount: 0,
        loanId: "",
    });
    const [loans, setLoans] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const loadLoans = async () => {
        try {
            const response = await getAllLoans();
            setLoans(response.data || []);
        } catch (error) {
            console.error("Error loading loans:", error);
            void Swal.fire("Error", "Failed to load loans", "error");
        }
    };

    const loadBookReturn = async () => {
        try {
            const res = await getBookReturn(id);
            const data = res.data;
            setBookReturn({
                returnDate: data.returnDate || "",
                penaltyAmount: data.penaltyAmount ?? 0,
                loanId: data.loanId ?? "",
            });
        } catch (error) {
            console.error("Error loading book return:", error);
            void Swal.fire("Error", "Failed to load book return data", "error");
        }
    };

    useEffect(() => {
        void loadLoans();
        if (id) void loadBookReturn();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookReturn({ ...bookReturn, [name]: value });
    };

    // validateForm: returnDate must be >= loan.loanDate and <= today
    function validateForm() {
        if (!bookReturn.loanId) {
            void Swal.fire("Validation", "Please select a loan.", "warning");
            return false;
        }
        if (!bookReturn.returnDate) {
            void Swal.fire("Validation", "Return date is required.", "warning");
            return false;
        }

        const selectedLoan = loans.find((l) => Number(l.id) === Number(bookReturn.loanId));
        if (!selectedLoan) {
            void Swal.fire("Validation", "Selected loan not found.", "warning");
            return false;
        }

        const rDate = new Date(bookReturn.returnDate);
        const loanDate = new Date(selectedLoan.loanDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // comparar solo fecha

        if (isNaN(rDate.getTime()) || isNaN(loanDate.getTime())) {
            void Swal.fire("Validation", "Invalid date format.", "warning");
            return false;
        }

        // No permitir fecha de devolución anterior a la fecha del préstamo
        if (rDate < loanDate) {
            void Swal.fire(
                "Validation",
                `Return date cannot be before the loan date (${selectedLoan.loanDate}).`,
                "warning"
            );
            return false;
        }

        // No permitir fecha en el futuro
        if (rDate > today) {
            void Swal.fire("Validation", "Return date cannot be in the future.", "warning");
            return false;
        }

        // penaltyAmount sanity check
        if (Number(bookReturn.penaltyAmount) < 0) {
            void Swal.fire("Validation", "Penalty amount cannot be negative.", "warning");
            return false;
        }

        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const payload = {
            returnDate: bookReturn.returnDate,
            penaltyAmount: Number(bookReturn.penaltyAmount),
            loanId: Number(bookReturn.loanId),
        };

        try {
            if (id) {
                await updateBookReturn(id, payload);
                void Swal.fire("Updated", "Book return updated successfully", "success");
            } else {
                await addBookReturn(payload);
                void Swal.fire("Created", "Book return created successfully", "success");
            }
            navigate("/book-returns");
        } catch (error) {
            console.error("Error saving book return:", error);
            const backendMessage = error.response?.data?.message || error.message;
            void Swal.fire("Error", String(backendMessage), "error");
        }
    };

    // Filtrar loans para seleccionar: mostrar todos (la lógica de evitar loans ya devueltos puede estar en el backend o ser añadida aquí)
    const selectableLoans = loans.filter((l) => {
        if (!l.returnId) return true;
        if (id && Number(l.returnId) === Number(id)) return true;
        return false;
    });

    return (
        <div className="container mt-4">
            <h2>{id ? "Edit Book Return" : "Add Book Return"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Loan</label>
                    <select
                        className="form-select"
                        name="loanId"
                        value={bookReturn.loanId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select Loan --</option>
                        {selectableLoans.map((loan) => (
                            <option key={loan.id} value={loan.id}>
                                {loan.id} - {loan.bookTitle || `Book #${loan.bookId}`} / {loan.studentName || `Student #${loan.studentId}`} (Loan: {loan.loanDate} - Due: {loan.dueDate})
                            </option>
                        ))}
                    </select>
                    <div className="form-text">
                        * La fecha de devolución debe estar entre la fecha del préstamo y hoy.
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Return Date</label>
                    <input
                        type="date"
                        className="form-control"
                        name="returnDate"
                        value={bookReturn.returnDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Penalty Amount</label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        className="form-control"
                        name="penaltyAmount"
                        value={bookReturn.penaltyAmount}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success me-2">
                    Save
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/book-returns")}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default BookReturnForm;
