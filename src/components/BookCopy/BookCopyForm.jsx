import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { addBookCopy, getBookCopy, updateBookCopy} from "../../services/BookCopyService.js";

const BookCopyForm = () => {
    const [bookCopy, setBookCopy] = useState({
        title: "",
    });
    const { id } = useParams();
    const navigate = useNavigate();

    const loadBookCopy = async () => {
        try {
            const response = await getBookCopy(id);
            const data = response.data;
            setBookCopy({
                title: data.title || "",
            });
        } catch (e) {
            console.error(e);
            void Swal.fire("Error", "Failed to load bookCopy data", "error");
        }
    };

    useEffect(() => {
        if (id) void loadBookCopy();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookCopy({ ...bookCopy, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title: bookCopy.title,
        };

        try {
            if (id) {
                await updateBookCopy(id, payload);
                void Swal.fire("Updated", "BookCopy updated successfully", "success");
            } else {
                await addBookCopy(payload);
                void Swal.fire("Created", "BookCopy created successfully", "success");
            }
            navigate("/book-copies");
        } catch (error) {
            console.error("Error saving bookCopy:", error);
            const backendMessage = error.response?.data?.message || error.message;
            void Swal.fire("Error", String(backendMessage), "error");
        }
    };

    return (
        <div className="container mt-4">
            <h2>{id ? "Edit BookCopy" : "Add BookCopy"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={bookCopy.title}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-success me-2">Save</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate("/book-copies")}>Cancel</button>
            </form>
        </div>
    );
};

export default BookCopyForm;
