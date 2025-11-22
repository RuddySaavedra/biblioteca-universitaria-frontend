import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteBookCopy, getAllBookCopies } from "../../services/BookCopyService.js";

const BookCopyList = () => {
    const [bookCopies, setBookCopies] = useState([]);
    const navigate = useNavigate();

    const loadBookCopies = async () => {
        try {
            const res = await getAllBookCopies();
            setBookCopies(res.data || []);
        } catch (error) {
            console.error("Error loading bookCopies:", error);
            void Swal.fire("Error", "Failed to load bookCopies.", "error");
        }
    };

    useEffect(() => {
        void loadBookCopies();
    }, []);

    const performDelete = async (id) => {
        try {
            await deleteBookCopy(id);
            void Swal.fire("Deleted!", "BookCopy deleted successfully!", "success");
            await loadBookCopies();
        } catch (error) {
            console.error("Error deleting bookCopy:", error);
            const backendMessage = error.response?.data?.message || error.message;
            void Swal.fire("Error", String(backendMessage), "error");
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This bookCopy will be permanently deleted.",
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

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>BookCopy List</h2>
                <button className="btn btn-primary" onClick={() => navigate("/book-copies/add")}>Add BookCopy</button>
            </div>

            <table className="table table-striped align-middle">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th style={{ width: "160px" }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {bookCopies.length > 0 ? (
                    bookCopies.map((bookCopy) => (
                        <tr key={bookCopy.id}>
                            <td>{bookCopy.id}</td>
                            <td>{bookCopy.title || "-"}</td>
                            <td>
                                <Link to={`/book-copies/edit/${bookCopy.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(bookCopy.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="text-center text-muted">No bookCopies found.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default BookCopyList;
