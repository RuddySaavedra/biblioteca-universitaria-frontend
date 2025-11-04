import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteAuthor, getAllAuthors} from "../../services/AuthorService.js";
import Swal from "sweetalert2";

const AuthorList = () => {
    const [authors, setAuthors] = useState([]);
    const navigate = useNavigate();

    const loadAuthors = async () => {
        try {
            const response = await getAllAuthors();
            setAuthors(response.data);
        } catch (error) {
            console.error("Error loading authors: ", error);
            await Swal.fire("Error", "Failed to load authors.", "error");
        }
    };

    function addAuthor() {
        navigate("/authors/add");
    }

    function editAuthor(id) {
        navigate(`/authors/edit/${id}`);
    }

    const performDelete = async (id) => {
        try {
            await deleteAuthor(id);
            await Swal.fire("Deleted!", "Author removed successfully", "success");
            await loadAuthors(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting authors: ", error);
            await Swal.fire("Error", "Failed to delete the author.", "error");
        }
    }

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Delete Author?",
            text: "This action cannot be undone",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "No, cancel",
        });

        if (result.isConfirmed) {
            await performDelete(id);
        }
    }

    useEffect(() => {
        void loadAuthors();
    }, []);

    return (
        <div className="container">
            <h2>Author List</h2>
            <button className="btn btn-primary" onClick={()=>addAuthor()}>Add Author</button>

            <table className="table table-striped mt-3">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Address</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {authors.length > 0 ? (
                    authors.map((author) => (
                        <tr key={author.id}>
                            <td>{author.id}</td>
                            <td>{author.firstName}</td>
                            <td>{author.lastName}</td>
                            <td>{author.address}</td>
                            <td>{author.type}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2" onClick={()=> editAuthor(author.id)}>Edit</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(author.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center">No authors found.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default AuthorList;