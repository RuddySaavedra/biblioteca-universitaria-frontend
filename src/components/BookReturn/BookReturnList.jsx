// File: src/components/BookReturn/BookReturnList.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteBookReturn, getAllBookReturns } from "../../services/BookReturnService.js";

const BookReturnList = () => {
    const [returnsList, setReturnsList] = useState([]);
    const navigate = useNavigate();

    const loadReturns = async () => {
        try {
            const res = await getAllBookReturns();
            setReturnsList(res.data || []);
        } catch (error) {
            console.error("Error loading book returns:", error);
            void Swal.fire("Error", "Failed to load book returns.", "error");
        }
    };

    useEffect(() => {
        void loadReturns();
    }, []);

    const performDelete = async (id) => {
        try {
            await deleteBookReturn(id);
            void Swal.fire("Deleted!", "Book return deleted successfully!", "success");
            await loadReturns();
        } catch (error) {
            console.error("Error deleting book return:", error);
            const backendMessage = error.response?.data?.message || error.message;
            void Swal.fire("Error", String(backendMessage), "error");
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This book return will be permanently deleted.",
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

    const renderLoanInfo = (br) => {
        // Soporta distintos shapes del DTO: loanId, loan, loan.bookTitle, etc.
        return (
            br.loanId ||
            br.loan?.id ||
            br.loan?.bookTitle ||
            br.loan?.book?.title ||
            (br.loan ? `#${br.loan.id}` : "-")
        );
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Book Returns</h2>
                <button className="btn btn-primary" onClick={() => navigate("/book-returns/add")}>
                    Add Return
                </button>
            </div>

            <table className="table table-striped align-middle">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Return Date</th>
                    <th>Penalty (Bs)</th>
                    <th>Loan</th>
                    <th style={{ width: "160px" }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {returnsList.length > 0 ? (
                    returnsList.map((br) => (
                        <tr key={br.id}>
                            <td>{br.id}</td>
                            <td>{br.returnDate || "-"}</td>
                            <td>{br.penaltyAmount != null ? br.penaltyAmount : "-"}</td>
                            <td>{renderLoanInfo(br)}</td>
                            <td>
                                <Link to={`/book-returns/edit/${br.id}`} className="btn btn-warning btn-sm me-2">
                                    Edit
                                </Link>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(br.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center text-muted">
                            No book returns found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default BookReturnList;
