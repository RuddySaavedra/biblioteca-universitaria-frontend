import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {deleteBook, getAllBooks} from "../../services/BookService.js";
import Swal from "sweetalert2";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    const loadBooks = async () => {
        try {
            const response = await getAllBooks();
            setBooks(response.data);
        } catch (error) {
            console.error("Error loading books:", error);
            void Swal.fire("Error", "Failed to load books.", "error");
        }
    }

    function addBook() {
        navigate('/books/add');
    }

    // Realiza la eliminación
    const performDelete = async (id) => {
        try {
            await deleteBook(id);
            void Swal.fire("Deleted!", "Book removed successfully!", "success");
            await loadBooks();
        } catch (error) {
            console.log("Error deleting the book:", error);
            void Swal.fire("Error", "Failed to delete the book.", "error");
        }
    }

    // Muestra el diálogo de confirmación
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This book will be permanently deleted.",
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
        void loadBooks();
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Book List</h2>
                <button className="btn btn-primary" onClick={()=>addBook()}>Add Book</button>
            </div>

            <table className="table table-striped align-middle">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Subject</th>
                    <th>ISBN</th>
                    <th>Publication Year</th>
                    <th>Author</th>
                    <th style={{width: "160px"}}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.length > 0 ? (
                    books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.subject}</td>
                            <td>{book.isbn}</td>
                            <td>{book.publicationYear}</td>
                            <td>{book.authorFullName || "-"}</td>
                            <td>
                                <Link to={`/books/edit/${book.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(book.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="text-center text-muted">No books found.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;