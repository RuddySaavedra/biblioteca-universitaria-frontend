import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteLoan, getAllLoans } from "../../services/LoanService.js";

const LoanList = () => {
    const [loans, setLoans] = useState([]);
    const navigate = useNavigate();

    const loadLoans = async () => {
        try {
            const res = await getAllLoans();
            setLoans(res.data || []);
        } catch (error) {
            console.error("Error loading loans:", error);
            void Swal.fire("Error", "Failed to load loans.", "error");
        }
    };

    const addLoan = () => navigate("/loans/add");

    const performDelete = async (id) => {
        try {
            await deleteLoan(id);
            void Swal.fire("Deleted!", "Loan deleted successfully!", "success");
            await loadLoans();
        } catch (error) {
            console.error("Error deleting loan:", error);
            void Swal.fire("Error", "Failed to delete the loan.", "error");
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This loan will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            await performDelete(id);
        }
    };

    useEffect(() => {
        void loadLoans();
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Loan List</h2>
                <button className="btn btn-primary" onClick={addLoan}>
                    Add Loan
                </button>
            </div>

            <table className="table table-striped align-middle">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Book</th>
                    <th>Student</th>
                    <th>Loan Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th style={{ width: "160px" }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {loans.length > 0 ? (
                    loans.map((loan) => (
                        <tr key={loan.id}>
                            <td>{loan.id}</td>
                            <td>
                                {/* Intenta mostrar título; soporta DTOs distintos */}
                                {loan.bookTitle ||
                                    loan.book?.title ||
                                    (loan.book ? `#${loan.book.id}` : "-")}
                            </td>
                            <td>
                                {loan.studentName ||
                                    loan.student?.name ||
                                    (loan.student ? `#${loan.student.id}` : "-")}
                            </td>
                            <td>{loan.loanDate || "-"}</td>
                            <td>{loan.dueDate || "-"}</td>
                            <td>{loan.status || "-"}</td>
                            <td>
                                <Link
                                    to={`/loans/edit/${loan.id}`}
                                    className="btn btn-warning btn-sm me-2"
                                >
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(loan.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="text-center text-muted">
                            No loans found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default LoanList;
