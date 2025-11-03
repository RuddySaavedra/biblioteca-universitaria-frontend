import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {addAuthor, getAuthor, updateAuthor} from "../../services/AuthorService.js";
import Swal from "sweetalert2";

const AuthorForm = () => {
    const [author, setAuthor] = useState({
        firstName: "",
        lastName: "",
        address: "",
        type: "",
    });
    const {id} = useParams();
    const navigate = useNavigate();

    const loadAuthor = async () => {
        try {
            const response = await getAuthor(id);
            setAuthor(response.data);
        } catch (error) {
            console.log("Error loading author: ", error);
        }
    };

    useEffect(() => {
        if (id) loadAuthor();
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthor({ ...author, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            id: author.id,
            firstName: author.firstName,
            lastName: author.lastName,
            address: author.address,
            type: author.type,
        }

        try {
            if (id) {
                updateAuthor(id, payload);
                void Swal.fire("Updated", "Author updated successfully", "success");
            } else {
                addAuthor(payload);
                void Swal.fire("Created", "Author created successfully", "success");
            }
            navigate("/authors");
        } catch (error) {
            console.log("Error saving author:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>{id ? "Edit Author" : "Add Author"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={author.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={author.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Address</label>
                    <input
                        type="text"
                        className="form-control"
                        value={author.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Type</label>
                    <input
                        type="text"
                        className="form-control"
                        value={author.type}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success me-2">Save</button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={()=> navigate("/authors")}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default AuthorForm;