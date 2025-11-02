import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import {addBook, getBook, updateBook} from "../../services/BookService.js";
import {getAllAuthors} from "../../services/AuthorService.js";

const BookForm = () => {
    const [book, setBook] = useState({
        title: "",
        subject: "",
        isbn: "",
        publicationYear: "",
        authorId: "",
    });
    const [authors, setAuthors] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();

    const loadBook = async () => {
        try {
            const response = await getBook(id);
            const data = response.data;
            setBook( {
                title: data.title,
                subject: data.subject,
                isbn: data.isbn,
                publicationYear: data.publicationYear,
                authorId: data.authorId,
            });
        } catch (error) {
            console.log("Error loading book:", error);
            void Swal.fire("Error", "Failed to load book data", "error");
        }
    }

    const loadAuthors = async () => {
        try {
            const response = await getAllAuthors();
            setAuthors(response.data);
        } catch (error) {
            console.log("Error loading authors:", error);
            void Swal.fire("Error", "Failed to load authors", "error");
        }
    }

    // Load all dropdown data (authors)
    useEffect(() => {
        void loadAuthors();
        if (id) void loadBook();
    }, [id]);

    // Handle text imputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({...book, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title: book.title,
            subject: book.subject,
            isbn: book.isbn,
            publicationYear: Number(book.publicationYear),
            authorId: Number(book.authorId),
        }

        try {
            if (id) {
                await updateBook(id, payload);
                void Swal.fire("Updated", "Book updated successfully", "success");
            } else {
                await addBook(payload);
                void Swal.fire("Created", "Book created successfully", "success");
            }
            navigate("/books");
        } catch (error) {
            console.log("Error saving book:", error);
            void Swal.fire("Error", "Failed to load book data", "error");
        }
    };

    return (
        <div className="container mt-4">
            <h2>{id ? "Edit Book" : "Add Book"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Subject</label>
                    <input
                        type="text"
                        className="form-control"
                        name="subject"
                        value={book.subject}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">ISBN</label>
                    <input
                        type="text"
                        className="form-control"
                        name="isbn"
                        value={book.isbn}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Publication Year</label>
                    <input
                        type="number"
                        className="form-control"
                        name="publicationYear"
                        value={book.publicationYear}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <select
                        className="form-select"
                        name="authorId"
                        value={book.authorId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select Author --</option>
                        {authors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.firstName} {author.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-success me-2">
                    Save
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={()=>navigate("/books")}
                >
                    Cancel
                </button>
            </form>
        </div>
    )
}

export default BookForm;